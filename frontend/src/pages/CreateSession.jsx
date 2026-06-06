import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { GLOBAL_STYLES, MUSCLE_GROUPS, inputStyle, labelStyle } from "../shared/shared";

export default function CreateSession() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    cityName: "",
    gymName: "",
    scheduledAt: "",
    maxPartners: 2,
    muscleGroup: MUSCLE_GROUPS[0],
    description: "",
  });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Title is required.";
    if (!form.cityName.trim())    e.cityName    = "City is required.";
    if (!form.gymName.trim())     e.gymName     = "Gym name is required.";
    if (!form.scheduledAt)        e.scheduledAt = "Date and time are required.";
    if (!form.muscleGroup)        e.muscleGroup = "Muscle group is required.";
    if (form.maxPartners < 1 || form.maxPartners > 10)
                                  e.maxPartners = "Must be between 1 and 10.";
    return e;
  };

  const handleSubmit = async () => {
    if (!user) { navigate("/auth"); return; }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/sessions", {
        ...form,
        maxPartners: Number(form.maxPartners),
        hostId: user.id,
      });
      setSubmitted(true);
    } catch (err) {
      // server-side validation errors come back as { field: message }
      const data = err.response?.data;
      if (typeof data === "object") {
        setErrors(data);
      } else {
        setErrors({ general: data || "Something went wrong." });
      }
    } finally {
      setLoading(false);
    }
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

        {errors.general && (
          <div style={{ background: "#3d1a1a", border: "1px solid #6b2d2d", color: "#e07070", borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 14 }}>
            ⚠️ {errors.general}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>

          <Field label="Session Title" error={errors.title}>
            <input name="title" value={form.title} onChange={handleChange}
              style={fieldInput(errors.title)} placeholder="e.g. Heavy Chest Day" />
          </Field>

          <Field label="City" error={errors.cityName}>
            <div style={{ position: "relative" }}>
              <span style={iconStyle}>📍</span>
              <input name="cityName" value={form.cityName} onChange={handleChange}
                style={{ ...fieldInput(errors.cityName), paddingLeft: 36 }} placeholder="Los Angeles" />
            </div>
          </Field>

          <Field label="Gym Name" error={errors.gymName}>
            <input name="gymName" value={form.gymName} onChange={handleChange}
              style={fieldInput(errors.gymName)} placeholder="e.g. Powerhouse Gym" />
          </Field>

          <Field label="Muscle Group" error={errors.muscleGroup}>
            <select name="muscleGroup" value={form.muscleGroup} onChange={handleChange}
              style={fieldInput(errors.muscleGroup)}>
              {MUSCLE_GROUPS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>

          <Field label="Date & Time" error={errors.scheduledAt}>
            <div style={{ position: "relative" }}>
              <span style={iconStyle}>📅</span>
              <input type="datetime-local" name="scheduledAt" value={form.scheduledAt}
                onChange={handleChange}
                style={{ ...fieldInput(errors.scheduledAt), paddingLeft: 36, colorScheme: "dark" }} />
            </div>
          </Field>

          <Field label="Max Partners" error={errors.maxPartners}>
            <input type="number" name="maxPartners" min={1} max={10} value={form.maxPartners}
              onChange={handleChange} style={fieldInput(errors.maxPartners)} />
          </Field>

          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Description" error={errors.description}>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={5} placeholder="Describe your session, goals, experience level expected…"
                style={{ ...fieldInput(errors.description), resize: "vertical", lineHeight: 1.65, paddingTop: 12, paddingBottom: 12 }} />
            </Field>
          </div>

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ ...primaryBtn, width: "100%", marginTop: 32, fontSize: 17, padding: "16px 0", opacity: loading ? 0.7 : 1 }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#1d4ed8"; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#2563eb"; }}
        >
          {loading ? "Posting..." : "Post Session"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <p style={{ margin: "6px 0 0", fontSize: 12, color: "#e07070" }}>⚠️ {error}</p>}
    </div>
  );
}

const fieldInput = (error) => ({
  ...inputStyle,
  borderColor: error ? "#6b2d2d" : "#2a2a2a",
});

const iconStyle = {
  position: "absolute", left: 13, top: "50%",
  transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none",
};

const pageWrap  = { minHeight: "100vh", background: "#111", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" };
const primaryBtn = { background: "#2563eb", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 12, padding: "12px 32px", transition: "background 0.15s" };