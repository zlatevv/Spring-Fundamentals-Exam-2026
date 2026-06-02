import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_SESSIONS, CITIES, MUSCLE_GROUPS, AvatarCircle, GLOBAL_STYLES, GYM_BG_URL } from "./shared";

export default function FindSpotter() {
  const navigate = useNavigate();
  const [city, setCity] = useState("Los Angeles");
  const [muscle, setMuscle] = useState("Chest Day");

  return (
    <div style={{ minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" }}>
      <style>{GLOBAL_STYLES}</style>

      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.88) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `url('${GYM_BG_URL}') center/cover`,
          filter: "brightness(0.4)",
        }} />
        <div style={{ position: "relative", zIndex: 2, padding: "56px 36px 0" }}>
          <h1 style={{
            margin: 0, fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 64, fontWeight: 800, color: "#fff",
            letterSpacing: 3, textTransform: "uppercase", lineHeight: 1,
          }}>
            Find Your Spotter
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 28px 40px", background: "#111" }}>

        {/* Search Bar */}
        <div style={{
          display: "flex", gap: 12, alignItems: "center",
          background: "#1a1a1a", border: "1px solid #2a2a2a",
          borderRadius: 14, padding: "10px 18px", margin: "22px 0 28px",
        }}>
          <svg width="18" height="18" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <span style={{ color: "#555", fontSize: 15, marginRight: 4 }}>City</span>
          <select value={city} onChange={e => setCity(e.target.value)} style={selectStyle}>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>

          <div style={{ width: 1, height: 24, background: "#2a2a2a", margin: "0 6px" }} />

          <svg width="18" height="18" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6.5 2h11a1 1 0 0 1 .8 1.6L14 9v11l-4-3V9L5.7 3.6A1 1 0 0 1 6.5 2Z" />
          </svg>
          <select value={muscle} onChange={e => setMuscle(e.target.value)} style={selectStyle}>
            {MUSCLE_GROUPS.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>

        {/* Card Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {MOCK_SESSIONS.map(s => (
            <SessionCard
              key={s.id}
              session={s}
              onSelect={() => navigate(`/session/${s.id}`, { state: { session: s } })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SessionCard({ session: s, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: "#181818", border: "1px solid #252525",
        borderRadius: 16, padding: 16, cursor: "pointer",
        transition: "border-color 0.2s, transform 0.15s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#3a7bd5";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#252525";
        e.currentTarget.style.transform = "";
      }}
    >
      <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 13, color: "#e0e0e0" }}>
        Upcoming Workout Session
      </p>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <AvatarCircle initials={s.avatar} size={40} />
        <div>
          <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
            <span style={{ color: "#4a9eff", fontWeight: 600 }}>Gym</span>{" "}{s.gym}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
            <span style={{ color: "#4a9eff", fontWeight: 600 }}>Time</span>{" "}{s.time}
          </p>
        </div>
      </div>
      <button
        style={{
          width: "100%", padding: "9px 0", borderRadius: 10,
          background: "#2563eb", border: "none", color: "#fff",
          fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
        onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
        onClick={ev => { ev.stopPropagation(); onSelect(); }}
      >
        Join
      </button>
    </div>
  );
}

const selectStyle = {
  background: "#252525", border: "1px solid #333", color: "#e0e0e0",
  borderRadius: 8, padding: "6px 12px", fontSize: 14, cursor: "pointer",
};

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 60, background: "#0a0a0a",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <span
        onClick={() => navigate("/")}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, cursor: "pointer" }}
      >
        <span style={{ color: "#2563eb" }}>Spot</span>
        <span style={{ color: "#f97316" }}>Me</span>
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => navigate("/create")} style={navBtn}>Create Session</button>
        <button onClick={() => navigate("/profile")} style={navBtn}>My Profile</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ background: "none", border: "none", color: "#ccc", fontSize: 14, cursor: "pointer", padding: "6px 14px" }}>
          Log in
        </button>
        <button style={{
          background: "#f97316", border: "none", color: "#fff",
          fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "8px 18px",
        }}>
          Sign up
        </button>
      </div>
    </nav>
  );
}

const navBtn = {
  background: "none", border: "1px solid #2a2a2a", color: "#999",
  borderRadius: 8, padding: "6px 14px", fontSize: 14,
  cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
};
