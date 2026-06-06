import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    logout();
    navigate("/auth");
  };

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
        {user && <button onClick={() => navigate("/create")} style={navBtn}>Create Session</button>}
        {user && <button onClick={() => navigate("/profile")} style={navBtn}>My Profile</button>}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ color: "#888", fontSize: 14 }}>Hey, {user.username}</span>
            <button onClick={handleLogout} style={{ background: "none", border: "1px solid #333", color: "#ccc", fontSize: 14, cursor: "pointer", padding: "6px 14px", borderRadius: 8 }}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/auth")} style={{ background: "none", border: "none", color: "#ccc", fontSize: 14, cursor: "pointer", padding: "6px 14px" }}>Log in</button>
            <button onClick={() => navigate("/auth")} style={{ background: "#f97316", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "8px 18px" }}>Sign up</button>
          </>
        )}
      </div>
    </nav>
  );
}

const navBtn = {
  background: "none", border: "1px solid #2a2a2a", color: "#999",
  borderRadius: 8, padding: "6px 14px", fontSize: 14,
  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
};