export const MUSCLE_GROUPS = [
  "Chest Day", "Leg Day", "Back Day", "Push Day",
  "Pull Day", "Arms", "Shoulders", "Full Body",
];

export const CITIES = [
  "Los Angeles", "San Diego", "New York", "Chicago", "Austin", "Miami",
];

export const MOCK_SESSIONS = [
  { id: 1,  name: "Marcus T.",  avatar: "MT", gym: "Powerhouse Gym",  time: "6:00 PM", date: "Oct 27", tags: ["Chest", "Upper Body"], joined: ["RT", "KS"], max: 3, desc: "Heavy chest day, need a reliable spotter for bench press." },
  { id: 2,  name: "Jordan L.",  avatar: "JL", gym: "Powerhouse Gym",  time: "6:00 PM", date: "Oct 27", tags: ["Back", "Pull"],         joined: ["AM"],       max: 2, desc: "Deadlift focus today. Aiming for a new PR." },
  { id: 3,  name: "Chris W.",   avatar: "CW", gym: "Powerhouse Gym",  time: "6:00 PM", date: "Oct 27", tags: ["Leg Day"],              joined: [],           max: 2, desc: "Squat session. Casual vibes, all levels welcome." },
  { id: 4,  name: "Sam K.",     avatar: "SK", gym: "Powerhouse Gym",  time: "6:00 PM", date: "Oct 28", tags: ["Arms", "Biceps"],       joined: ["TN", "FP"], max: 4, desc: "Arm day! Let's pump some iron together." },
  { id: 5,  name: "Devon R.",   avatar: "DR", gym: "IronWorks Gym",   time: "7:00 AM", date: "Oct 29", tags: ["Push Day"],             joined: ["BK"],       max: 2, desc: "Morning push session. Bench + OHP + Dips." },
  { id: 6,  name: "Tanya M.",   avatar: "TM", gym: "Powerhouse Gym",  time: "6:00 PM", date: "Oct 29", tags: ["Shoulders"],            joined: [],           max: 3, desc: "Shoulder hypertrophy. All welcome." },
  { id: 7,  name: "Ryan P.",    avatar: "RP", gym: "MetroFlex Gym",   time: "5:30 PM", date: "Oct 30", tags: ["Full Body"],            joined: ["XL", "ZN"], max: 4, desc: "Full body circuit. Fast-paced and fun." },
  { id: 8,  name: "Elena V.",   avatar: "EV", gym: "Powerhouse Gym",  time: "6:00 PM", date: "Oct 30", tags: ["Back"],                 joined: ["HM"],       max: 2, desc: "Back and bis. Looking for a motivated partner." },
  { id: 9,  name: "Felix A.",   avatar: "FA", gym: "Iron Temple",     time: "8:00 AM", date: "Oct 31", tags: ["Chest", "Triceps"],     joined: [],           max: 3, desc: "Classic push day. All experience levels welcome." },
  { id: 10, name: "Zoe H.",     avatar: "ZH", gym: "MetroFlex Gym",   time: "6:30 PM", date: "Oct 31", tags: ["Leg Day"],              joined: ["CQ"],       max: 2, desc: "Leg day grind. Squats and RDLs." },
  { id: 11, name: "Omar T.",    avatar: "OT", gym: "Powerhouse Gym",  time: "5:00 PM", date: "Nov 1",  tags: ["Pull Day"],             joined: [],           max: 2, desc: "Pull day. Rows, pulldowns and curls." },
  { id: 12, name: "Nina K.",    avatar: "NK", gym: "Peak Performance",time: "7:00 PM", date: "Nov 1",  tags: ["Full Body"],            joined: ["YB", "LR"], max: 4, desc: "Full body strength — compound lifts only." },
];

export const MY_SESSIONS = [
  { id: 101, title: "MetroFlex Gym",                 status: "Active",    extra: "Completed", time: "Oct 28, 7:00 AM", tag: "Leg Day"   },
  { id: 102, title: "Heavy Squatt Workout Session",  status: "Active",    extra: null,        time: "Oct 18, 7:00 AM", tag: "Heat Day"  },
  { id: 103, title: "MetroFlex Gym",                 status: "Completed", extra: null,        time: "Oct 28, 7:00 AM", tag: "Leg Day"   },
  { id: 104, title: "MetroFlex Gym",                 status: "Cancelled", extra: null,        time: "Oct 18, 7:00 AM", tag: "Leg Day"   },
  { id: 105, title: "MetroFlex Gym",                 status: "Active",    extra: "Completed", time: "Oct 15, 8:00 AM", tag: "Chest Day" },
  { id: 106, title: "Upcoming Workout Session",      status: "Cancelled", extra: null,        time: "Oct 10, 6:00 PM", tag: "Back Day"  },
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

export function StatusBadge({ status }) {
  const map = {
    Active:    { bg: "#1a3d1a", color: "#6dcc6d", border: "#2d6b2d" },
    Completed: { bg: "#1e1e1e", color: "#aaaaaa", border: "#333"    },
    Cancelled: { bg: "#3d1a1a", color: "#e07070", border: "#6b2d2d" },
  };
  const s = map[status] || map.Completed;
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
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
