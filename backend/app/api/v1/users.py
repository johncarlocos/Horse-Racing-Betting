from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, require_admin, require_admin_or_subadmin
from app.core.security import hash_password
from app.models.user import User, UserRole
from app.schemas.auth import CreateUserRequest, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    body: CreateUserRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin_or_subadmin),
):
    # Subadmin can only create members
    if current_user.role == UserRole.subadmin and body.role != UserRole.member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Subadmins can only create member accounts",
        )

    result = await db.execute(select(User).where(User.email == body.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
        role=body.role,
        privacy_policy_accepted=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.get("", response_model=list[UserResponse])
async def list_users(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin_or_subadmin),
):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    # Subadmin only sees members
    if current_user.role == UserRole.subadmin:
        users = [u for u in users if u.role == UserRole.member]
    return users
