"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";

type UserRow = {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  referral_source: string | null;
  vip_expiry_date: string | null;
  age_range: string | null;
  price: number | null;
  created_at: string;
};

type EditForm = {
  email: string;
  password: string;
  age_range: string;
  price: string;
  vip_expiry_date: string;
};

type AddMemberForm = {
  email: string;
  password: string;
  referral_source: string;
};

const REFERRAL_OPTIONS = ["FACEBOOK", "INSTAGRAM", "THREADS"] as const;
const ROWS_PER_PAGE = 10;

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays =
    locale === "zh-TW"
      ? ["日", "一", "二", "三", "四", "五", "六"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const wd = weekdays[d.getDay()];

  if (locale === "zh-TW") {
    return `${year}年${month}月${day}日(週${wd})`;
  }
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${day}, ${year} (${wd})`;
}

function daysUntil(iso: string): number | null {
  const now = new Date();
  const target = new Date(iso);
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-[#0D1117] border border-white/10 rounded-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function MembersPage() {
  const { t, locale } = useLanguage();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<AddMemberForm>({ email: "", password: "", referral_source: "" });
  const [editingMember, setEditingMember] = useState<UserRow | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ email: "", password: "", age_range: "", price: "", vip_expiry_date: "" });
  const [deletingUser, setDeletingUser] = useState<UserRow | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    const res = await fetch("/api/users");
    if (res.ok) setUsers(await res.json());
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const members = useMemo(() => users.filter((u) => u.role === "member"), [users]);

  const filtered = useMemo(() => {
    if (!search.trim()) return members;
    const q = search.toLowerCase();
    return members.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        (u.referral_source && u.referral_source.toLowerCase().includes(q))
    );
  }, [members, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const inputClass =
    "w-full bg-[#1A1F2E] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#28E88E]/50";

  const handleAdd = async () => {
    setError("");
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: addForm.email.trim(),
        password: addForm.password,
        role: "member",
        referral_source: addForm.referral_source || undefined,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed");
      return;
    }
    setShowAdd(false);
    setAddForm({ email: "", password: "", referral_source: "" });
    fetchUsers();
  };

  const openEdit = (u: UserRow) => {
    setEditingMember(u);
    setEditForm({
      email: u.email,
      password: "",
      age_range: u.age_range ?? "",
      price: u.price != null ? String(u.price) : "",
      vip_expiry_date: u.vip_expiry_date ? u.vip_expiry_date.slice(0, 10) : "",
    });
    setError("");
  };

  const handleSaveEdit = async () => {
    if (!editingMember) return;
    setError("");
    setLoading(true);

    const body: Record<string, unknown> = {};
    if (editForm.email && editForm.email !== editingMember.email) body.email = editForm.email;
    if (editForm.password) body.password = editForm.password;
    if (editForm.age_range !== (editingMember.age_range ?? "")) body.age_range = editForm.age_range || null;
    if (editForm.price !== (editingMember.price != null ? String(editingMember.price) : ""))
      body.price = editForm.price ? Number(editForm.price) : null;
    if (editForm.vip_expiry_date !== (editingMember.vip_expiry_date ? editingMember.vip_expiry_date.slice(0, 10) : ""))
      body.vip_expiry_date = editForm.vip_expiry_date || null;

    const res = await fetch(`/api/users/${editingMember.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed");
      return;
    }
    setEditingMember(null);
    fetchUsers();
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    setLoading(true);
    await fetch(`/api/users/${deletingUser.id}`, { method: "DELETE" });
    setLoading(false);
    setDeletingUser(null);
    fetchUsers();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#28E88E]">{t.admin.members}</h2>
        <button
          onClick={() => { setShowAdd(true); setError(""); }}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1A1F2E] border border-white/10 text-white hover:border-white/20 text-lg"
        >
          +
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B3B3B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t.admin.searchPlaceholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[#1A1F2E] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-[#666] outline-none focus:border-[#28E88E]/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#B3B3B3] border-b border-white/10">
              <th className="text-left py-3 pr-4 font-medium">{t.admin.email}</th>
              <th className="text-left py-3 pr-4 font-medium">{t.admin.vipExpiry}</th>
              <th className="text-left py-3 pr-4 font-medium">{t.admin.referralSource}</th>
              <th className="text-left py-3 pr-4 font-medium">{t.admin.createdAt}</th>
              <th className="text-left py-3 font-medium">{t.admin.actions}</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[#B3B3B3]">
                  {t.admin.noMembers}
                </td>
              </tr>
            ) : (
              paged.map((u) => {
                const days = u.vip_expiry_date ? daysUntil(u.vip_expiry_date) : null;
                return (
                  <tr key={u.id} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white">{u.email}</td>
                    <td className="py-3 pr-4">
                      {days != null ? (
                        <span className="inline-block bg-[#28E88E] text-[#020308] text-xs font-bold px-2.5 py-1 rounded-md">
                          {days}{t.admin.daysLeft}
                        </span>
                      ) : null}
                    </td>
                    <td className="py-3 pr-4 text-white">{u.referral_source ?? ""}</td>
                    <td className="py-3 pr-4 text-[#B3B3B3]">{formatDate(u.created_at, locale)}</td>
                    <td className="py-3 flex items-center gap-3">
                      <button onClick={() => openEdit(u)} className="text-[#B3B3B3] hover:text-white" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button onClick={() => setDeletingUser(u)} className="text-[#B3B3B3] hover:text-red-400" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg bg-[#1A1F2E] border border-white/10 text-white disabled:opacity-30 hover:border-white/20"
        >
          {t.admin.previous}
        </button>
        <span className="text-[#B3B3B3]">{t.admin.page} {page}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded-lg bg-[#1A1F2E] border border-white/10 text-white disabled:opacity-30 hover:border-white/20"
        >
          {t.admin.next}
        </button>
      </div>

      {/* Add Member Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)}>
        <h3 className="text-lg font-semibold mb-4">{t.admin.add}</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.email}</label>
            <input type="email" value={addForm.email} onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.password}</label>
            <input type="password" value={addForm.password} onChange={(e) => setAddForm((f) => ({ ...f, password: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.referralSource}</label>
            <select value={addForm.referral_source} onChange={(e) => setAddForm((f) => ({ ...f, referral_source: e.target.value }))} className={inputClass}>
              <option value="">{t.admin.referralSource}</option>
              {REFERRAL_OPTIONS.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 mt-2">
            <button onClick={() => setShowAdd(false)} className="text-sm text-[#B3B3B3] hover:text-white">{t.admin.cancel}</button>
            <button onClick={handleAdd} disabled={loading} className="text-sm text-[#28E88E] font-medium hover:opacity-80 disabled:opacity-50">{t.admin.save}</button>
          </div>
        </div>
      </Modal>

      {/* Edit Member Modal */}
      <Modal open={!!editingMember} onClose={() => setEditingMember(null)}>
        <h3 className="text-lg font-semibold mb-4">{t.admin.edit}</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.email}</label>
            <input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.password}</label>
            <input type="password" value={editForm.password} onChange={(e) => setEditForm((f) => ({ ...f, password: e.target.value }))} placeholder="••••••••" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.ageRange}</label>
            <select value={editForm.age_range} onChange={(e) => setEditForm((f) => ({ ...f, age_range: e.target.value }))} className={inputClass}>
              <option value="">{t.admin.ageRange}</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-55">46-55</option>
              <option value="56+">56+</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.price}</label>
            <input type="number" value={editForm.price} onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#B3B3B3]">{t.admin.date}</label>
            <input type="date" value={editForm.vip_expiry_date} onChange={(e) => setEditForm((f) => ({ ...f, vip_expiry_date: e.target.value }))} className={inputClass} />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 mt-2">
            <button onClick={() => setEditingMember(null)} className="text-sm text-[#B3B3B3] hover:text-white">{t.admin.cancel}</button>
            <button onClick={handleSaveEdit} disabled={loading} className="text-sm text-[#28E88E] font-medium hover:opacity-80 disabled:opacity-50">{t.admin.save}</button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deletingUser} onClose={() => setDeletingUser(null)}>
        <h3 className="text-lg font-semibold mb-4">{t.admin.delete}</h3>
        <p className="text-[#B3B3B3] text-sm mb-6">{t.admin.confirmDelete}</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeletingUser(null)} className="text-sm text-[#B3B3B3] hover:text-white">{t.admin.cancel}</button>
          <button onClick={handleDelete} disabled={loading} className="text-sm text-red-400 font-medium hover:opacity-80 disabled:opacity-50">{t.admin.delete}</button>
        </div>
      </Modal>
    </div>
  );
}
