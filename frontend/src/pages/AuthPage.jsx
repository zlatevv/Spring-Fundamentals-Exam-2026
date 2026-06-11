import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (tab === "login") {
        const params = new URLSearchParams();
        params.append("username", formData.username);
        params.append("password", formData.password);

        const res = await axios.post("/api/auth/login", params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        });
        login(res.data);
        navigate("/");
      } else {
        await axios.post("/api/auth/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        
        setFormData({ ...formData, password: "" });
        
        setTab("login");
        alert("Account created successfully! Please log in to start your session.");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      <nav className="flex items-center justify-between px-8 py-4 bg-gray-950/90 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-800">
        <span className="text-2xl font-bold">
          <span className="text-blue-500">Spot</span>
          <span className="text-white">Me</span>
        </span>
        <div className="flex items-center gap-4">
          <button onClick={() => setTab("login")} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Log in</button>
          <button onClick={() => setTab("register")} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">Sign up</button>
        </div>
      </nav>

      <div className="flex flex-1 pt-16 min-h-screen">
        <div
          className="flex-1 relative flex items-center px-12"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80')`,
            backgroundSize: "cover", backgroundPosition: "center",
          }}
        >
          <div className="max-w-md">
            <h1 className="text-white font-black text-6xl leading-none tracking-tight mb-4">
              FOCUS.<br />LIFT.<br />REPEAT.
            </h1>
            <p className="text-gray-300 text-lg mt-4">Define your workout.</p>
          </div>
        </div>

        <div className="w-full max-w-md flex items-center justify-center bg-gray-900/60 backdrop-blur-md px-10">
          <div className="w-full bg-white rounded-2xl p-8 shadow-2xl">

            <div className="flex mb-6 border-b border-gray-200">
              {["login", "register"].map(t => (
                <button key={t} onClick={() => { setTab(t); setError(null); }}
                  className={`flex-1 pb-3 text-sm font-semibold transition-colors capitalize ${
                    tab === t ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t === "login" ? "Login" : "Register"}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                ⚠️ {typeof error === "string" ? error : JSON.stringify(error)}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {(tab === "register" || tab === "login") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" name="username" value={formData.username} onChange={handleChange}
                    placeholder="johndoe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              )}

              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="alex@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors text-sm mt-1">
                {loading ? "Please wait..." : tab === "login" ? "Let's Lift 💪" : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}