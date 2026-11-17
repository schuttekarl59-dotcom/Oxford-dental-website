import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";

export interface AdminAppointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  status: "pending" | "upcoming" | "completed" | "cancelled" | "emergency";
}

export const seedAppointments: AdminAppointment[] = [
  {
    id: "APT-1042",
    patientName: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+44 7700 900077",
    treatment: "New Patient Consultation",
    date: "2026-11-20",
    status: "upcoming",
  },
  {
    id: "APT-1043",
    patientName: "David Miller",
    email: "david.m@example.com",
    phone: "+44 7700 900188",
    treatment: "Dental Emergency",
    date: "2026-11-17",
    status: "emergency",
  },
  {
    id: "APT-1044",
    patientName: "Elena Vance",
    email: "elena.v@example.com",
    phone: "+44 7700 900299",
    treatment: "Hygiene Appointment",
    date: "2026-11-18",
    status: "pending",
  },
  {
    id: "APT-1045",
    patientName: "Marcus Thorne",
    email: "marcus.t@example.com",
    phone: "+44 7700 900311",
    treatment: "Routine Examination",
    date: "2026-11-15",
    status: "completed",
  },
];

export function AdminLogin({
  onBack,
  onLogin,
}: {
  onBack: () => void;
  onLogin: () => void;
}) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const normalizedUsername = username.trim();
    const normalizedPassword = password.trim();

    if (normalizedUsername.toLowerCase() === "admin" && normalizedPassword === "admin") {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f2] flex items-center justify-center px-5">
      <div className="w-full max-w-md admin-card">
        <div className="text-center mb-8">
          <p className="admin-kicker">Oxford Dental Centre</p>
          <h2 className="admin-title">Staff Portal Login</h2>
        </div>
        {error && (
          <div className="mb-6 bg-[#ffe0dc] text-[#9c3025] p-3 text-xs font-semibold text-center">
            Invalid credentials. Please use admin / admin.
          </div>
        )}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="admin-field-label" htmlFor="user">Username</label>
            <input
              className="admin-field"
              id="user"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
            />
          </div>
          <div>
            <label className="admin-field-label" htmlFor="pass">Password</label>
            <input
              type="password"
              className="admin-field"
              id="pass"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />
          </div>
          <div className="pt-2 flex gap-3">
            <button className="button-primary w-full" type="submit">
              Sign In to Admin
            </button>
            <button className="button-secondary px-4" type="button" onClick={onBack}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminPortal({
  appointments,
  onLogout,
  onWebsite,
  setAppointments,
}: {
  appointments: AdminAppointment[];
  onLogout: () => void;
  onWebsite: () => void;
  setAppointments: Dispatch<SetStateAction<AdminAppointment[]>>;
}) {
  const [filter, setFilter] = useState<string>("all");

  const updateStatus = (id: string, status: AdminAppointment["status"]) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#172c32]">
      <header className="bg-[#14383d] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#9bc8bf]">Staff Admin Portal</p>
          <h1 className="font-serif text-2xl">Oxford Dental Centre</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="button-light text-xs py-2 px-3" onClick={onWebsite}>
            View Website
          </button>
          <button className="button-secondary text-xs py-2 px-3 text-white border-white/30 hover:bg-white/10" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Appointments Dashboard</p>
            <h2 className="font-serif text-3xl mt-1">Patient Bookings &amp; Enquiries</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "upcoming", "emergency", "completed", "cancelled"].map((st) => (
              <button
                key={st}
                className={`text-xs uppercase font-semibold px-3 py-1.5 border transition ${
                  filter === st
                    ? "bg-[#14383d] text-white border-[#14383d]"
                    : "bg-white text-[#14383d] border-[#14383d]/20 hover:border-[#14383d]"
                }`}
                onClick={() => setFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-card overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#14383d]/15 text-xs tracking-wider uppercase text-[#536d72]">
                <th className="pb-4 font-semibold">ID / Date</th>
                <th className="pb-4 font-semibold">Patient</th>
                <th className="pb-4 font-semibold">Contact</th>
                <th className="pb-4 font-semibold">Treatment</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14383d]/10">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td className="py-8 text-center text-sm text-[#536d72]" colSpan={6}>
                    No appointments found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="text-sm">
                    <td className="py-4 pr-4">
                      <span className="font-bold text-xs block text-[#14383d]">{apt.id}</span>
                      <span className="text-xs text-[#536d72]">{apt.date}</span>
                    </td>
                    <td className="py-4 pr-4 font-medium">{apt.patientName}</td>
                    <td className="py-4 pr-4 text-xs text-[#536d72]">
                      <div>{apt.email}</div>
                      <div>{apt.phone}</div>
                    </td>
                    <td className="py-4 pr-4">{apt.treatment}</td>
                    <td className="py-4 pr-4">
                      <span className={`admin-status ${apt.status}`}>{apt.status}</span>
                    </td>
                    <td className="py-4 text-right">
                      <select
                        aria-label={`Update status for ${apt.patientName}`}
                        className="text-xs border border-[#14383d]/20 bg-white p-1.5 rounded-none"
                        value={apt.status}
                        onChange={(e) =>
                          updateStatus(
                            apt.id,
                            e.target.value as AdminAppointment["status"]
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="emergency">Emergency</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}