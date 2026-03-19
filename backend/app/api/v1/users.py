import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, require_admin, require_admin_or_subadmin
from app.core.security import hash_password
from app.models.user import User, UserRole
from app.schemas.auth import CreateUserRequest, UpdateUserRequest, UserResponse

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
        referral_source=body.referral_source,
        vip_expiry_date=body.vip_expiry_date,
        age_range=body.age_range,
        price=body.price,
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


@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: uuid.UUID,
    body: UpdateUserRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin_or_subadmin),
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Subadmin can only update members
    if current_user.role == UserRole.subadmin and user.role != UserRole.member:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Subadmins can only update member accounts",
        )

    update_data = body.model_dump(exclude_unset=True)

    if "password" in update_data:
        pw = update_data.pop("password")
        if pw is not None:
            user.hashed_password = hash_password(pw)

    if "email" in update_data and update_data["email"] != user.email:
        existing = await db.execute(
            select(User).where(User.email == update_data["email"])
        )
        if existing.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
            )

    for key, value in update_data.items():
        setattr(user, key, value)

    await db.commit()
    await db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Cannot delete yourself
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot delete yourself"
        )

    await db.delete(user)
    await db.commit()
