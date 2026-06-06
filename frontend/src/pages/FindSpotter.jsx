import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { AvatarCircle, Tag, GLOBAL_STYLES, GYM_BG_URL } from "../shared/shared";

export default function SessionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [session, setSession]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [joining, setJoining]   = useState(false);
  const [leaving, setLeaving]   = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/sessions/${id}`);
      setSession(res.data);
    } catch (err) {
      setError("Session not found.");
    } finally {
      setLoading(false);
    }
  };

  const isHost     = user && session && session.hostId === user.id;
  const hasJoined  = user && session?.participants?.some(p => p.partnerId === user.id);
  const spotsLeft  = session ? session.maxPartners - session.participantCount : 0;
  const isActive   = session?.sessionStatus === "ACTIVE";

  const handleJoin = async () => {
    if (!user) { navigate("/auth"); return; }
    setJoining(true);
    setActionError(null);
    try {
      await axios.post(`/api/sessions/${id}/join?partnerId=${user.id}`);
      await fetchSession(); // refresh to show updated participant count
    } catch (err) {
      setActionError(err.response?.data || "Could not join session.");
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    setLeaving(true);
    setActionError(null);
    try {
      await axios.delete(`/api/sessions/${id}/leave?partnerId=${user.id}`);
      await fetchSession();
    } catch (err) {
      setActionError(err.response?.data || "Could not leave session.");
    } finally {
      setLeaving(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this session?")) return;
    setActionError(null);
    try {
      await axios.patch(`/api/sessions/${id}/cancel?hostId=${user.id}`);
      await fetchSession();
    } catch (err) {
      setActionError(err.response?.data || "Could not cancel session.");
    }
  };

  // ── Render states ────────────────────────────────────────────────────

  if (loading) return (
    <div style={pageWrap}>
      <Navbar />
      <div style={{ textAlign: "center", color: "#555", padding: "120px 0", fontSize: 15 }}>
        Loading session...
      </div>
    </div>
  );

  if (error) return (
    <div style={pageWrap}>
      <Navbar />
      <div style={{ textAlign: "center", color: "#e07070", padding: "120px 0", fontSize: 15 }}>
        {error}
        <br />
        <button onClick={() => navigate("/")} style={{ marginTop: 16, background: "none", border: "1px solid #555", color: "#ccc", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 14 }}>
          Back to sessions
        </button>
      </div>
    </div>
  );

  const initials = session.hostUsername?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.72)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `url('${GYM_BG_URL}') center/cover`, filter: "brightness(0.28)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "32px 36px 0" }}>
          <button onClick={() => navigate("/")} style={backBtn}>← Back to sessions</button>
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
        <div style={{ background: "#181818", border: "1px solid #252525", borderRadius: 20, padding: 32 }}>

          {/* Title + status */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <h2 style={{
              margin: 0, fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: 0.5,
            }}>
              {session.title}
            </h2>
            <StatusBadge status={session.sessionStatus} />
          </div>

          <div style={{ display: "flex", gap: 28 }}>

            {/* ── Left Column ─────────────────────────────── */}
            <div style={{ flex: 1 }}>

              {/* Host */}
              <div style={{
                display: "flex", alignItems: "center", gap: 16,
                paddingBottom: 22, marginBottom: 22, borderBottom: "1px solid #252525",
              }}>
                <AvatarCircle initials={initials} size={54} />
                <div>
                  <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 18, color: "#e0e0e0" }}>
                    {session.hostUsername}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#555" }}>Session host</p>
                </div>
                {isHost && (
                  <span style={{
                    marginLeft: "auto", background: "#1e3a5f", color: "#7eb8f7",
                    fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                    border: "1px solid #2a5a8f",
                  }}>
                    Your Session
                  </span>
                )}
              </div>

              {/* Meta grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div>
                  <p style={metaLabel}>Gym</p>
                  <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 16, color: "#e0e0e0" }}>{session.gymName}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "#555" }}>{session.cityName}</p>
                </div>
                <div>
                  <p style={metaLabel}>Scheduled</p>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#e0e0e0" }}>
                    {new Date(session.scheduledAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Muscle group */}
              <div style={{ marginBottom: 24 }}>
                <p style={metaLabel}>Muscle Group</p>
                <Tag label={session.muscleGroup} />
              </div>

              {/* Participants */}
              <div>
                <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#e0e0e0" }}>
                  Joined Spotters ({session.participantCount}/{session.maxPartners})
                </p>
                {session.participantCount === 0 ? (
                  <p style={{ margin: 0, color: "#555", fontSize: 14 }}>No one joined yet — be the first!</p>
                ) : (
                  <p style={{ margin: 0, color: "#888", fontSize: 14 }}>{session.participantCount} spotter{session.participantCount !== 1 ? "s" : ""} joined</p>
                )}
              </div>
            </div>

            {/* ── Right Column ─────────────────────────────── */}
            <div style={{
              width: 310, flexShrink: 0, background: "#111",
              borderRadius: 14, border: "1px solid #252525",
              padding: 22, display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div>
                <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15, color: "#e0e0e0" }}>Description</p>
                <textarea readOnly value={session.description ?? "No description provided."} rows={5}
                  style={{
                    width: "100%", background: "#1a1a1a", border: "1px solid #252525",
                    borderRadius: 10, color: "#888", fontSize: 14, padding: 12,
                    resize: "none", lineHeight: 1.65, fontFamily: "inherit", boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Action error */}
              {actionError && (
                <p style={{ margin: 0, color: "#e07070", fontSize: 13, textAlign: "center" }}>
                  ⚠️ {typeof actionError === "string" ? actionError : JSON.stringify(actionError)}
                </p>
              )}

              {/* Action buttons */}
              {isHost && isActive && (
                <button onClick={handleCancel} style={cancelBtn}>
                  Cancel Session
                </button>
              )}

              {!isHost && isActive && !hasJoined && spotsLeft > 0 && (
                <>
                  <p style={{ margin: 0, fontSize: 13, color: "#555", textAlign: "center" }}>
                    {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} remaining
                  </p>
                  <button onClick={handleJoin} disabled={joining} style={joinBtn}
                    onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  >
                    {joining ? "Joining..." : "Join Session"}
                  </button>
                </>
              )}

              {!isHost && isActive && hasJoined && (
                <>
                  <div style={{
                    padding: "16px 0", borderRadius: 14, background: "#1a3d1a",
                    border: "1px solid #2d6b2d", color: "#7cc47c",
                    fontSize: 16, fontWeight: 700, textAlign: "center",
                  }}>
                    ✓ You've Joined!
                  </div>
                  <button onClick={handleLeave} disabled={leaving} style={leaveBtn}>
                    {leaving ? "Leaving..." : "Leave Session"}
                  </button>
                </>
              )}

              {!isActive && (
                <div style={{
                  padding: "16px 0", borderRadius: 14,
                  background: session.sessionStatus === "CANCELLED" ? "#3d1a1a" : "#1e1e1e",
                  border: `1px solid ${session.sessionStatus === "CANCELLED" ? "#6b2d2d" : "#333"}`,
                  color: session.sessionStatus === "CANCELLED" ? "#e07070" : "#aaa",
                  fontSize: 15, fontWeight: 700, textAlign: "center",
                }}>
                  {session.sessionStatus === "CANCELLED" ? "Session Cancelled" : "Session Completed"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    ACTIVE:    { bg: "#1a3d1a", color: "#6dcc6d", border: "#2d6b2d" },
    COMPLETED: { bg: "#1e1e1e", color: "#aaaaaa", border: "#333"    },
    CANCELLED: { bg: "#3d1a1a", color: "#e07070", border: "#6b2d2d" },
  };
  const s = map[status] || map.COMPLETED;
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20,
    }}>
      {status}
    </span>
  );
}

const pageWrap  = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const backBtn   = { background: "none", border: "none", color: "#4a9eff", cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "'DM Sans', sans-serif", display: "block" };
const metaLabel = { margin: "0 0 6px", fontSize: 12, color: "#444", textTransform: "uppercase", letterSpacing: 1 };
const joinBtn   = { width: "100%", padding: "16px 0", borderRadius: 14, background: "#2563eb", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background 0.15s", fontFamily: "'DM Sans', sans-serif" };
const leaveBtn  = { width: "100%", padding: "12px 0", borderRadius: 14, background: "none", border: "1px solid #555", color: "#aaa", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };
const cancelBtn = { width: "100%", padding: "12px 0", borderRadius: 14, background: "#3d1a1a", border: "1px solid #6b2d2d", color: "#e07070", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };