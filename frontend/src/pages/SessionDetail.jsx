import { useState } from "react";
import { AvatarCircle, Tag, GLOBAL_STYLES, GYM_BG_URL } from "./shared";

export default function SessionDetail({ session, onBack }) {
  const [joined, setJoined] = useState(false);

  const spotsLeft = session.max - session.joined.length;

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(10,10,10,0.72)", zIndex: 1,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `url('${GYM_BG_URL}') center/cover`,
          filter: "brightness(0.28)",
        }} />
        <div style={{ position: "relative", zIndex: 2, padding: "32px 36px 0" }}>
          <button onClick={onBack} style={backBtn}>← Back to sessions</button>
          <h1 style={{
            margin: "10px 0 0", fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: 1,
          }}>
            Session Detail
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 36px 48px", background: "#111" }}>
        <div style={{
          background: "#181818", border: "1px solid #252525",
          borderRadius: 20, padding: 32,
        }}>
          {/* Title */}
          <h2 style={{
            margin: "0 0 24px", fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: 0.5,
          }}>
            Friday Night Bench Press
          </h2>

          <div style={{ display: "flex", gap: 28 }}>

            {/* ── Left Column ─────────────────────────────────────── */}
            <div style={{ flex: 1 }}>

              {/* Host */}
              <div style={{
                display: "flex", alignItems: "center", gap: 16,
                paddingBottom: 22, marginBottom: 22,
                borderBottom: "1px solid #252525",
              }}>
                <AvatarCircle initials={session.avatar} size={54} />
                <div>
                  <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 18, color: "#e0e0e0" }}>
                    {session.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                    Bio: Username about us, host us very sportive h…
                  </p>
                </div>
              </div>

              {/* Meta grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div>
                  <p style={metaLabel}>Gym Info</p>
                  <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 16, color: "#e0e0e0" }}>
                    {session.gym}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#555" }}>123 Power Ave, San Diego, CA</p>
                </div>
                <div>
                  <p style={metaLabel}>Date</p>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#e0e0e0" }}>
                    {session.date}, {session.time}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: 24 }}>
                <p style={metaLabel}>Muscle group tags</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {session.tags.map(t => <Tag key={t} label={t} />)}
                </div>
              </div>

              {/* Joined Spotters */}
              <div>
                <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#e0e0e0" }}>
                  Joined Spotters
                </p>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  {session.joined.length > 0 ? (
                    session.joined.map(av => (
                      <div key={av} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <AvatarCircle initials={av} size={38} bg="#2a1f3d" color="#b07af0" />
                        <span style={{ fontSize: 14, color: "#ccc" }}>{av}.</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ margin: 0, color: "#555", fontSize: 14 }}>
                      No one joined yet — be the first!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right Column ─────────────────────────────────────── */}
            <div style={{
              width: 310, flexShrink: 0,
              background: "#111", borderRadius: 14,
              border: "1px solid #252525", padding: 22,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div>
                <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15, color: "#e0e0e0" }}>
                  Description
                </p>
                <textarea
                  readOnly
                  value={session.desc}
                  rows={5}
                  style={{
                    width: "100%", background: "#1a1a1a",
                    border: "1px solid #252525", borderRadius: 10,
                    color: "#888", fontSize: 14, padding: 12,
                    resize: "none", lineHeight: 1.65, fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <p style={{ margin: 0, fontSize: 13, color: "#555", textAlign: "center" }}>
                Because {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} remaining
              </p>

              {joined ? (
                <div style={{
                  padding: "16px 0", borderRadius: 14, background: "#1a3d1a",
                  border: "1px solid #2d6b2d", color: "#7cc47c",
                  fontSize: 16, fontWeight: 700, textAlign: "center",
                }}>
                  ✓ You've Joined!
                </div>
              ) : (
                <button
                  onClick={() => setJoined(true)}
                  style={joinBtn}
                  onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                >
                  Join Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 60, background: "#0a0a0a",
      borderBottom: "1px solid #1a1a1a",
    }}>
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800 }}>
        <span style={{ color: "#2563eb" }}>Spot</span>
        <span style={{ color: "#f97316" }}>Me</span>
      </span>
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

const pageWrap = {
  minHeight: "100vh", background: "#111",
  fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0",
};

const backBtn = {
  background: "none", border: "none", color: "#4a9eff",
  cursor: "pointer", fontSize: 14, padding: 0,
  fontFamily: "'DM Sans', sans-serif", display: "block",
};

const metaLabel = {
  margin: "0 0 6px", fontSize: 12, color: "#444",
  textTransform: "uppercase", letterSpacing: 1,
};

const joinBtn = {
  width: "100%", padding: "16px 0", borderRadius: 14,
  background: "#2563eb", border: "none", color: "#fff",
  fontSize: 16, fontWeight: 700, cursor: "pointer",
  transition: "background 0.15s", fontFamily: "'DM Sans', sans-serif",
};
