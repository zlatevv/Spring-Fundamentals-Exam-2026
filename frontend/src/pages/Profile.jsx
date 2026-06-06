import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { AvatarCircle, StatusBadge, GLOBAL_STYLES, GYM_BG_URL } from "../shared/shared";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [tab, setTab]             = useState("hosted");
  const [sessions, setSessions]   = useState([]);
  const [profile, setProfile]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [editOpen, setEditOpen]   = useState(false);
  const [editForm, setEditForm]   = useState({ firstName: "", lastName: "", profilePictureUrl: "", currentPassword: "", newPassword: "" });
  const [editErrors, setEditErrors] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    fetchProfile();
    fetchSessions();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchSessions();
  }, [tab]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/auth/${user.id}`);
      setProfile(res.data);
    } catch {
      // non-critical, fall back to auth context
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/sessions/user/${user.id}`);
      setSessions(res.data);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    setEditErrors(prev => ({ ...prev, [name]: null }));
    setEditSuccess(false);
  };

  const handleEditSubmit = async () => {
    setEditLoading(true);
    setEditErrors({});
    try {
      const res = await axios.put(`/api/auth/${user.id}/edit-profile`, editForm);
      setProfile(res.data);
      setEditSuccess(true);
      setTimeout(() => setEditOpen(false), 1200);
    } catch (err) {
      const data = err.response?.data;
      if (typeof data === "object") setEditErrors(data);
      else setEditErrors({ general: data || "Something went wrong." });
    } finally {
      setEditLoading(false);
    }
  };

  const hostedSessions = sessions.filter(s => s.hostId === user?.id);
  const joinedSessions = sessions.filter(s => s.hostId !== user?.id);
  const displayed      = tab === "hosted" ? hostedSessions : joinedSessions;

  const initials = profile?.username?.slice(0, 2).toUpperCase() ?? user?.username?.slice(0, 2).toUpperCase() ?? "??";
  const displayName = profile ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() || profile.username : user?.username;

  return (
    <div style={pageWrap}>
      <style>{GLOBAL_STYLES}</style>
      <Navbar />

      {/* Hero */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.92) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `url('${GYM_BG_URL}') center/cover`, filter: "brightness(0.28)" }} />
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
              My Profile
            </h1>
          </div>
          <button onClick={() => setEditOpen(true)} style={editProfileBtn}>Edit Profile</button>
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
          <AvatarCircle initials={initials} size={68} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 22, color: "#fff" }}>{displayName}</p>
            <p style={{ margin: 0, fontSize: 13, color: "#555" }}>@{profile?.username ?? user?.username}</p>
          </div>
          <div style={{ display: "flex", gap: 48, paddingLeft: 32, borderLeft: "1px solid #252525" }}>
            {[[hostedSessions.length, "Sessions Hosted"], [joinedSessions.length, "Sessions Joined"]].map(([n, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ margin: "0 0 3px", fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{n}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #252525", marginBottom: 22 }}>
          {[["hosted", "My Sessions"], ["joined", "Joined Sessions"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              background: "none", border: "none",
              color: tab === key ? "#fff" : "#555",
              padding: "10px 22px", fontSize: 15,
              fontWeight: tab === key ? 700 : 400,
              cursor: "pointer",
              borderBottom: tab === key ? "2px solid #2563eb" : "2px solid transparent",
              transition: "color 0.15s", fontFamily: "'DM Sans', sans-serif",
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Session Grid */}
        {loading ? (
          <p style={{ color: "#555", fontSize: 14 }}>Loading sessions...</p>
        ) : displayed.length === 0 ? (
          <p style={{ color: "#555", fontSize: 14 }}>
            {tab === "hosted" ? "You haven't hosted any sessions yet." : "You haven't joined any sessions yet."}
            {" "}<span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => navigate(tab === "hosted" ? "/create" : "/")}>
              {tab === "hosted" ? "Create one?" : "Find one?"}
            </span>
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {displayed.map(s => (
              <div
                key={s.id}
                onClick={() => navigate(`/session/${s.id}`)}
                style={{
                  background: "#181818", border: "1px solid #252525",
                  borderRadius: 14, padding: "18px 20px", cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#3a7bd5"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#252525"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#e0e0e0", flex: 1, paddingRight: 12 }}>{s.title}</p>
                  <StatusBadge status={s.sessionStatus} />
                </div>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#4a9eff" }}>
                  {new Date(s.scheduledAt).toLocaleString()}
                </p>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#666" }}>{s.gymName} · {s.cityName}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#555" }}>{s.muscleGroup}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
          zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
        }}
          onClick={e => { if (e.target === e.currentTarget) setEditOpen(false); }}
        >
          <div style={{
            background: "#181818", border: "1px solid #2a2a2a",
            borderRadius: 20, padding: 32, width: 440,
            display: "flex", flexDirection: "column", gap: 18,
          }}>
            <h3 style={{ margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff" }}>
              Edit Profile
            </h3>

            {editErrors.general && (
              <p style={{ margin: 0, color: "#e07070", fontSize: 13 }}>⚠️ {editErrors.general}</p>
            )}

            {editSuccess && (
              <p style={{ margin: 0, color: "#7cc47c", fontSize: 13 }}>✓ Profile updated!</p>
            )}

            {[
              ["firstName", "First Name", "text", "John"],
              ["lastName",  "Last Name",  "text", "Doe"],
              ["profilePictureUrl", "Profile Picture URL", "text", "https://..."],
            ].map(([name, label, type, placeholder]) => (
              <div key={name}>
                <label style={{ display: "block", fontSize: 13, color: "#999", marginBottom: 6 }}>{label}</label>
                <input name={name} type={type} value={editForm[name]} onChange={handleEditChange}
                  placeholder={placeholder}
                  style={{
                    width: "100%", background: "#1a1a1a", border: `1px solid ${editErrors[name] ? "#6b2d2d" : "#2a2a2a"}`,
                    borderRadius: 10, color: "#e0e0e0", fontSize: 15, padding: "10px 14px",
                    outline: "none", boxSizing: "border-box",
                  }} />
                {editErrors[name] && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#e07070" }}>⚠️ {editErrors[name]}</p>}
              </div>
            ))}

            <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: 16 }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#666" }}>Change password (optional)</p>
              {[
                ["currentPassword", "Current Password"],
                ["newPassword",     "New Password"],
              ].map(([name, label]) => (
                <div key={name} style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 13, color: "#999", marginBottom: 6 }}>{label}</label>
                  <input name={name} type="password" value={editForm[name]} onChange={handleEditChange}
                    placeholder="••••••••"
                    style={{
                      width: "100%", background: "#1a1a1a", border: `1px solid ${editErrors[name] ? "#6b2d2d" : "#2a2a2a"}`,
                      borderRadius: 10, color: "#e0e0e0", fontSize: 15, padding: "10px 14px",
                      outline: "none", boxSizing: "border-box",
                    }} />
                  {editErrors[name] && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#e07070" }}>⚠️ {editErrors[name]}</p>}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditOpen(false)} style={{
                flex: 1, padding: "12px 0", borderRadius: 10, background: "none",
                border: "1px solid #333", color: "#aaa", fontSize: 14, cursor: "pointer",
              }}>
                Cancel
              </button>
              <button onClick={handleEditSubmit} disabled={editLoading} style={{
                flex: 1, padding: "12px 0", borderRadius: 10, background: "#2563eb",
                border: "none", color: "#fff", fontSize: 14, fontWeight: 700,
                cursor: editLoading ? "not-allowed" : "pointer", opacity: editLoading ? 0.7 : 1,
              }}>
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const pageWrap      = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const backBtn       = { background: "none", border: "none", color: "#4a9eff", cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "'DM Sans', sans-serif" };
const editProfileBtn = { background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 60, fontFamily: "'DM Sans', sans-serif" };