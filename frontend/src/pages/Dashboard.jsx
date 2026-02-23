import { useEffect, useState } from "react";
import api from "../api/client";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [apps, setApps] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ company: "", role: "", status: "Applied" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function load() {
    setErr("");
    try {
      const [meRes, appsRes, sumRes] = await Promise.all([
        api.get("/auth/me"),
        api.get("/applications"),
        api.get("/analytics/summary"),
      ]);
      setMe(meRes.data);
      setApps(appsRes.data);
      setSummary(sumRes.data);
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to load dashboard");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addApp(e) {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/applications", form);
      setForm({ company: "", role: "", status: "Applied" });
      await load();
    } catch (e) {
      setErr(e?.response?.data?.detail || "Failed to create application");
    }
  }

  
  function onLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {me && <p className="text-gray-600">Welcome, {me.name}</p>}
          </div>
          <button
            onClick={onLogout}
            className="border rounded-xl px-4 py-2 bg-white hover:bg-gray-100"
          >
            Logout
          </button>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4">
            {err}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total" value={summary?.total ?? "-"} />
          <StatCard title="Interview rate" value={summary ? `${(summary.rates.interview_rate * 100).toFixed(1)}%` : "-"} />
          <StatCard title="Offer rate" value={summary ? `${(summary.rates.offer_rate * 100).toFixed(1)}%` : "-"} />
        </div>

        {/* Charts */}
<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div className="bg-white rounded-2xl shadow p-4">
    <h2 className="text-lg font-semibold">Applications by Status (Pie)</h2>
    <div className="h-72 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={toChartData(summary?.by_status)}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {toChartData(summary?.by_status).map((_, idx) => (
              <Cell key={idx} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow p-4">
    <h2 className="text-lg font-semibold">Applications by Status (Bar)</h2>
    <div className="h-72 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={toChartData(summary?.by_status)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

        {/* Create */}
        <div className="mt-6 bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold">Add Application</h2>
          <form onSubmit={addApp} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              className="border rounded-xl p-3"
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              required
            />
            <input
              className="border rounded-xl p-3"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              required
            />
            <select
              className="border rounded-xl p-3"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <button className="bg-black text-white rounded-xl p-3 hover:opacity-90">
              Add
            </button>
          </form>
        </div>

        {/* List */}
        <div className="mt-6 bg-white rounded-2xl shadow">
  <div className="p-4 border-b flex items-center justify-between">
    <h2 className="text-lg font-semibold">Applications</h2>
    <span className="text-sm text-gray-500">{apps.length} items</span>
  </div>

  <div className="divide-y">
    {apps.map((a) => (
      <ApplicationRow
        key={a.id}
        appItem={a}
        onUpdated={load}
        onError={setErr}
      />
    ))}

    {apps.length === 0 && (
      <div className="p-4 text-gray-600">No applications yet.</div>
    )}
  </div>
</div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="text-gray-600 text-sm">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function ApplicationRow({ appItem, onUpdated, onError }) {
  const [status, setStatus] = useState(appItem.status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function updateStatus(newStatus) {
    setStatus(newStatus);
    setSaving(true);
    onError("");
    try {
      await api.patch(`/applications/${appItem.id}`, { status: newStatus });
      await onUpdated();
    } catch (e) {
      onError("Failed to update status");
      setStatus(appItem.status);
    } finally {
      setSaving(false);
    }
  }

  async function deleteApp() {
    const ok = window.confirm(`Delete ${appItem.company}?`);
    if (!ok) return;

    setDeleting(true);
    onError("");
    try {
      await api.delete(`/applications/${appItem.id}`);
      await onUpdated();
    } catch (e) {
      onError("Failed to delete application");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <div className="font-medium">{appItem.company}</div>
        <div className="text-sm text-gray-600">{appItem.role}</div>
      </div>

      <div className="flex items-center gap-2">
        <select
          className="border rounded-xl px-3 py-2 bg-white"
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={saving || deleting}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={deleteApp}
          disabled={saving || deleting}
          className="border rounded-xl px-3 py-2 bg-white hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function toChartData(byStatus) {
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];
  return statuses.map((name) => ({
    name,
    value: byStatus?.[name] ?? 0,
  }));
}

