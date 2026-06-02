import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MY_SESSIONS, AvatarCircle, StatusBadge, GLOBAL_STYLES, GYM_BG_URL } from "./shared";

export default function Profile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("My Sessions");

  const sessions = tab === "My Sessions" ? MY_SESSIONS : MY_SESSIONS.slice().reverse();

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.92) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `url('${GYM_BG_URL}') center/cover`,
          filter: "brightness(0.28)",
        }} />
        <div style={{
          position: "relative", zIndex: 2, padding: "32px 36px 0",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <button onClick={() => navigate("/")} style={backBtn}>← Back</button>
            <h1 style={{
              margin: "10px 0 0", fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: 1,
            }}>
              Profile / My Sessions
            </h1>
          </div>
          <button style={editProfileBtn}>Edit Profile</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "0 36px 48px", background: "#111" }}>

        {/* User Stats Card */}
        <div style={{
          background: "#181818", border: "1px solid #252525", borderRadius: 16,
          padding: "22px 28px", margin: "22px 0 28px",
          display: "flex", alignItems: "center", gap: 24,
        }}>
          <AvatarCircle initials="AR" size={68} bg="#1e3a5f" color="#7eb8f7" />
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 22, color: "#fff" }}>Alex R.</p>
            <p style={{ margin: 0, fontSize: 13, color: "#555" }}>Member since: Jan 2023</p>
          </div>
          <div style={{ display: "flex", gap: 48, paddingLeft: 32, borderLeft: "1px solid #252525" }}>
            {[["25", "Sessions Hosted"], ["40", "Sessions Joined"]].map(([n, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ margin: "0 0 3px", fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{n}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #252525", marginBottom: 22 }}>
          {["My Sessions", "Joined Sessions"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none",
              color: tab === t ? "#fff" : "#555",
              padding: "10px 22px", fontSize: 15,
              fontWeight: tab === t ? 700 : 400,
              cursor: "pointer",
              borderBottom: tab === t ? "2px solid #2563eb" : "2px solid transparent",
              transition: "color 0.15s", fontFamily: "'DM Sans', sans-serif",
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Session Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {sessions.map(s => (
            <div key={s.id} style={{
              background: "#181818", border: "1px solid #252525",
              borderRadius: 14, padding: "18px 20px",
              transition: "border-color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#333"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#252525"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#e0e0e0", flex: 1, paddingRight: 12 }}>{s.title}</p>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {s.extra && <StatusBadge status={s.extra} />}
                  <StatusBadge status={s.status} />
                </div>
              </div>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: "#4a9eff" }}>Time: {s.time}</p>
              <p style={{ margin: 0, fontSize: 13, color: "#666" }}>{s.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 60, background: "#0a0a0a",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <span onClick={() => navigate("/")} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, cursor: "pointer" }}>
        <span style={{ color: "#2563eb" }}>Spot</span>
        <span style={{ color: "#f97316" }}>Me</span>
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => navigate("/")} style={navBtn}>Find Spotter</button>
        <button onClick={() => navigate("/create")} style={navBtn}>Create Session</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ background: "none", border: "none", color: "#ccc", fontSize: 14, cursor: "pointer", padding: "6px 14px" }}>Log in</button>
        <button style={{ background: "#f97316", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "8px 18px" }}>Sign up</button>
      </div>
    </nav>
  );
}

const pageWrap = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const backBtn = { background: "none", border: "none", color: "#4a9eff", cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "'DM Sans', sans-serif" };
const editProfileBtn = { background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 60, fontFamily: "'DM Sans', sans-serif" };
const navBtn = { background: "none", border: "1px solid #2a2a2a", color: "#999", borderRadius: 8, padding: "6px 14px", fontSize: 14, cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" };
