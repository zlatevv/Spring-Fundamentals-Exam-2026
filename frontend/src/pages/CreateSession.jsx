import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GLOBAL_STYLES, inputStyle, labelStyle } from "./shared";

const ALL_TAGS = ["Legs", "Squat", "Back", "Chest", "Arms", "Shoulders", "Full Body", "Push", "Pull", "Cardio"];

export default function CreateSession() {
  const navigate = useNavigate();

  const [title, setTitle]             = useState("Heavy Squat Session");
  const [city, setCity]               = useState("Los Angeles");
  const [gym, setGym]                 = useState("The Barbell Club");
  const [date, setDate]               = useState("2024-10-29T18:00");
  const [maxPartners, setMaxPartners] = useState(2);
  const [tags, setTags]               = useState(["Legs", "Squat", "Back"]);
  const [desc, setDesc]               = useState(
    "Looking for a spotter for heavy squats. Going for 5x5 at 315lbs. Casual lifting atmosphere."
  );
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = t =>
    setTags(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));

  const handlePost = () => {
    setSubmitted(true);
    setTimeout(() => navigate("/"), 1800);
  };

  if (submitted) {
    return (
      <div style={pageWrap}>
        <style>{GLOBAL_STYLES}</style>
        <Navbar />
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", minHeight: "70vh", gap: 16,
        }}>
          <div style={{ fontSize: 72 }}>💪</div>
          <h2 style={{
            margin: 0, fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: 1,
          }}>
            Session Posted!
          </h2>
          <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
            Your workout session is now live for others to join.
          </p>
          <button
            onClick={() => navigate("/")}
            style={primaryBtn}
            onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
          >
            Browse Sessions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      <div style={{ padding: "40px 40px 60px", maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{
          margin: "0 0 36px", fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: 1,
        }}>
          Create Workout Session
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>

          <div>
            <label style={labelStyle}>Session Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="e.g. Heavy Chest Day" />
          </div>

          <div>
            <label style={labelStyle}>City</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" }}>📍</span>
              <input value={city} onChange={e => setCity(e.target.value)} style={{ ...inputStyle, paddingLeft: 36 }} placeholder="Los Angeles" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Gym Name</label>
            <input value={gym} onChange={e => setGym(e.target.value)} style={inputStyle} placeholder="e.g. Powerhouse Gym" />
          </div>

          <div>
            <label style={labelStyle}>Muscle Group</label>
            <div style={{
              ...inputStyle, display: "flex", flexWrap: "wrap", gap: 8,
              minHeight: 50, alignItems: "center", padding: "8px 12px", cursor: "default",
            }}>
              {ALL_TAGS.map(t => {
                const active = tags.includes(t);
                return (
                  <span key={t} onClick={() => toggleTag(t)} style={{
                    background: active ? "#1c3d1c" : "#252525",
                    color: active ? "#7cc47c" : "#555",
                    border: `1px solid ${active ? "#2d6b2d" : "#333"}`,
                    borderRadius: 20, fontSize: 12, padding: "3px 10px",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                    transition: "all 0.15s",
                  }}>
                    {t}
                    {active && <span style={{ opacity: 0.65, fontSize: 11 }}>×</span>}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Date & Time Picker</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none" }}>📅</span>
              <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)}
                style={{ ...inputStyle, paddingLeft: 36, colorScheme: "dark" }} />
            </div>
          </div>

          <div style={{ gridRow: "span 2" }}>
            <label style={labelStyle}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={7}
              placeholder="Describe your session, goals, experience level expected…"
              style={{ ...inputStyle, resize: "vertical", height: "auto", lineHeight: 1.65, paddingTop: 12, paddingBottom: 12 }} />
          </div>

          <div>
            <label style={labelStyle}>Max Partners</label>
            <input type="number" min={1} max={10} step={1} value={maxPartners}
              onChange={e => setMaxPartners(Number(e.target.value))} style={inputStyle} />
          </div>
        </div>

        <button
          onClick={handlePost}
          style={{ ...primaryBtn, width: "100%", marginTop: 32, fontSize: 17, padding: "16px 0" }}
          onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
          onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
        >
          Post Session
        </button>
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
        <button onClick={() => navigate("/profile")} style={navBtn}>My Profile</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={{ background: "none", border: "none", color: "#ccc", fontSize: 14, cursor: "pointer", padding: "6px 14px" }}>Log in</button>
        <button style={{ background: "#f97316", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "8px 18px" }}>Sign up</button>
      </div>
    </nav>
  );
}

const pageWrap = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const primaryBtn = { background: "#2563eb", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 12, padding: "12px 32px", transition: "background 0.15s" };
const navBtn = { background: "none", border: "1px solid #2a2a2a", color: "#999", borderRadius: 8, padding: "6px 14px", fontSize: 14, cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" };
