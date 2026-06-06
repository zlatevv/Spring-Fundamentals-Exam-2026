import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { AvatarCircle, Tag, StatusBadge, GLOBAL_STYLES, GYM_BG_URL, MUSCLE_GROUPS, CITIES } from "../shared/shared";

export default function FindSpotter() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // Filters
  const [filterCity,   setFilterCity]   = useState("");
  const [filterMuscle, setFilterMuscle] = useState("");
  const [filterStatus, setFilterStatus] = useState("ACTIVE");

  useEffect(() => {
    fetchSessions();
  }, [filterCity, filterMuscle, filterStatus]);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterCity)   params.city        = filterCity;
      if (filterMuscle) params.muscleGroup = filterMuscle;
      if (filterStatus) params.status      = filterStatus;
      const res = await axios.get("/api/sessions", { params, withCredentials: true });
      console.log("API Response:", res.data);
      setSessions(res.data);
    } catch (err) {
      setError("Could not load sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilterCity("");
    setFilterMuscle("");
    setFilterStatus("ACTIVE");
  };

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.72)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `url('${GYM_BG_URL}') center/cover`, filter: "brightness(0.28)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "40px 36px 0" }}>
          <h1 style={{
            margin: "0 0 8px", fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 56, fontWeight: 800, color: "#fff", letterSpacing: 1,
          }}>
            Find a Spotter
          </h1>
          <p style={{ margin: 0, color: "#aaa", fontSize: 15 }}>
            Browse open workout sessions near you and join one.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", padding: "14px 36px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select value={filterCity} onChange={e => setFilterCity(e.target.value)} style={selectStyle}>
          <option value="">All Cities</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={filterMuscle} onChange={e => setFilterMuscle(e.target.value)} style={selectStyle}>
          <option value="">All Muscle Groups</option>
          {MUSCLE_GROUPS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {(filterCity || filterMuscle || filterStatus !== "ACTIVE") && (
          <button onClick={clearFilters} style={clearBtn}>✕ Clear</button>
        )}

        <span style={{ marginLeft: "auto", fontSize: 13, color: "#555" }}>
          {loading ? "Loading…" : `${sessions.length} session${sessions.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 36px 60px", background: "#111" }}>
        {error && (
          <div style={{ background: "#3d1a1a", border: "1px solid #6b2d2d", color: "#e07070", borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", color: "#555", padding: "80px 0", fontSize: 15 }}>
            Loading sessions…
          </div>
        ) : sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 48, margin: "0 0 16px" }}>🏋️</p>
            <p style={{ color: "#555", fontSize: 16, margin: "0 0 8px" }}>No sessions found.</p>
            <p style={{ color: "#444", fontSize: 14, margin: "0 0 24px" }}>
              Try changing your filters, or be the first to post one!
            </p>
            {user && (
              <button onClick={() => navigate("/create")} style={createBtn}>
                Create a Session
              </button>
            )}
            {!user && (
              <button onClick={() => navigate("/auth")} style={createBtn}>
                Sign up to post
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
            {sessions.map(s => (
              <SessionCard key={s.id} session={s} onClick={() => navigate(`/session/${s.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionCard({ session: s, onClick }) {
  const initials = s.hostUsername?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div
      onClick={onClick}
      style={{
        background: "#181818", border: "1px solid #252525",
        borderRadius: 16, padding: "20px 22px", cursor: "pointer",
        transition: "border-color 0.15s, transform 0.1s",
        display: "flex", flexDirection: "column", gap: 14,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#3a7bd5"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#e0e0e0", lineHeight: 1.3 }}>
          {s.title}
        </p>
        <StatusBadge status={s.sessionStatus} />
      </div>

      {/* Host */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <AvatarCircle initials={initials} size={32} />
        <span style={{ fontSize: 13, color: "#888" }}>{s.hostUsername}</span>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ margin: 0, fontSize: 13, color: "#4a9eff" }}>
          📅 {new Date(s.scheduledAt).toLocaleString()}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
          📍 {s.gymName} · {s.cityName}
        </p>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #252525" }}>
        <Tag label={s.muscleGroup} />
        <span style={{ fontSize: 12, color: "#555" }}>
          {s.participantCount}/{s.maxPartners} joined
        </span>
      </div>
    </div>
  );
}

const pageWrap  = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const selectStyle = {
  background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8,
  color: "#ccc", fontSize: 13, padding: "7px 12px", cursor: "pointer",
  outline: "none", fontFamily: "'DM Sans', sans-serif",
};
const clearBtn = {
  background: "none", border: "1px solid #333", color: "#888",
  borderRadius: 8, padding: "7px 14px", fontSize: 13,
  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
};
const createBtn = {
  background: "#2563eb", border: "none", color: "#fff",
  borderRadius: 10, padding: "12px 28px", fontSize: 14,
  fontWeight: 700, cursor: "pointer",
};
