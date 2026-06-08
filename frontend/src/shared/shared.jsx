export const MUSCLE_GROUPS = [
  'LEGS',
  'CORE',
  'CHEST',
  'BACK',
  'BICEPS',
  'TRICEPS',
  'SHOULDERS',
  'FULL_BODY'
];

// ── Shared UI Primitives ────────────────────────────────────────────────

export function AvatarCircle({ initials, size = 44, bg = "#1e3a5f", color = "#7eb8f7" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color, display: "flex", alignItems: "center",
      justifyContent: "center", fontWeight: 600, fontSize: size * 0.32,
      flexShrink: 0, fontFamily: "'DM Mono', monospace", letterSpacing: 1,
    }}>
      {initials}
    </div>
  );
}

export function Tag({ label }) {
  return (
    <span style={{
      background: "#1c2d1c", color: "#7cc47c", fontSize: 12, fontWeight: 500,
      padding: "3px 10px", borderRadius: 20, border: "1px solid #2a4a2a",
    }}>
      {label}
    </span>
  );
}

// Keys match the backend enum values exactly (all caps)
export function StatusBadge({ status }) {
  const map = {
    ACTIVE:    { bg: "#1a3d1a", color: "#6dcc6d", border: "#2d6b2d" },
    COMPLETED: { bg: "#1e1e1e", color: "#aaaaaa", border: "#333"    },
    CANCELLED: { bg: "#3d1a1a", color: "#e07070", border: "#6b2d2d" },
  };
  const s = map[status] || map.COMPLETED;
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

export const inputStyle = {
  width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a",
  borderRadius: 10, color: "#e0e0e0", fontSize: 15, padding: "12px 14px",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  transition: "border-color 0.15s",
};

export const labelStyle = {
  display: "block", fontSize: 13, color: "#999", marginBottom: 8, fontWeight: 500,
};

export const GYM_BG_URL =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80";

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap');
  * { box-sizing: border-box; }
  input:focus, textarea:focus, select:focus { outline: none; border-color: #3a7bd5 !important; }
  input[type=number]::-webkit-inner-spin-button { opacity: 1; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
`;
