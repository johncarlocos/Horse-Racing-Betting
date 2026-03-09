"use client";

import { useEffect, useState } from "react";

type UserRow = { id: string; email: string; role: string; is_active: boolean };
type FieldErrors = { email?: string; password?: string };

export default function SubadminDashboard() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    if (res.ok) setUsers(await res.json());
  };

  useEffect(() => { fetchUsers(); }, []);

  const validate = () => {
    const errors: FieldErrors = {};
    const trimmed = email.trim();

    if (!trimmed) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must include an uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must include a number.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearField = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) setFieldErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!validate()) return;

    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password, role: "member" }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error ?? "Failed to create user"); return; }

    setSuccess(`Member ${data.email} created successfully.`);
    setEmail(""); setPassword(""); setFieldErrors({});
    fetchUsers();
  };

  const inputClass = (hasError?: string) =>
    `bg-[#1A1F2E] border rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-[#28E88E]/50 ${
      hasError ? "border-red-400" : "border-white/10"
    }`;

  return (
    <div className="min-h-screen bg-[#020308] text-white p-6 sm:p-10">
      <h1 className="text-2xl font-semibold mb-8">Subadmin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Member */}
        <div className="bg-[#0D1117] rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-6">Add Member</h2>
          <form className="flex flex-col gap-4" onSubmit={handleCreate}>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#B3B3B3]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearField("email"); }}
                disabled={loading}
                className={inputClass(fieldErrors.email)}
              />
              {fieldErrors.email && <p className="text-red-400 text-xs mt-0.5">{fieldErrors.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#B3B3B3]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearField("password"); }}
                disabled={loading}
                className={inputClass(fieldErrors.password)}
              />
              {fieldErrors.password && <p className="text-red-400 text-xs mt-0.5">{fieldErrors.password}</p>}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-[#28E88E] text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#28E88E] text-[#020308] font-semibold rounded-lg py-2.5 text-sm hover:bg-[#28E88E]/90 disabled:opacity-50"
            >
              {loading ? "Creating…" : "Add Member"}
            </button>
          </form>
        </div>

        {/* Member List */}
        <div className="bg-[#0D1117] rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-6">Members</h2>
          {users.length === 0 ? (
            <p className="text-[#B3B3B3] text-sm">No members yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#B3B3B3] border-b border-white/10">
                    <th className="text-left py-2 pr-4">Email</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5">
                      <td className="py-2 pr-4 text-white">{u.email}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${u.is_active ? "text-[#28E88E]" : "text-red-400"}`}>
                          {u.is_active ? "Active" : "Disabled"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
