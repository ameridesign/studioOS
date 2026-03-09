import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppearance, type Theme, type Density, type FontSize, type CornerStyle } from "../contexts/AppearanceContext";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ── Shared primitives ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10.5, fontWeight: 600, color: "#A0A0A0", letterSpacing: "0.09em", textTransform: "uppercase", margin: 0 }}>
      {children}
    </p>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", height: 44,
  background: "white", border: "1px solid #E8E8E6",
  borderRadius: 12, padding: "0 14px",
  fontSize: 14, color: "#1A1A1A",
  outline: "none", boxSizing: "border-box",
  fontFamily: FONT, transition: "border-color 0.15s",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B0B0B0' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
  paddingRight: 36, cursor: "pointer",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      role="switch" aria-checked={on} onClick={() => onChange(!on)}
      style={{ width: 38, height: 22, flexShrink: 0, background: on ? "#1A1A1A" : "#DEDEDC", borderRadius: 99, cursor: "pointer", position: "relative", transition: "background 0.2s" }}
    >
      <div style={{ position: "absolute", top: 3, left: on ? 19 : 3, width: 16, height: 16, background: "white", borderRadius: "50%", transition: "left 0.18s" }} />
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
      style={{ height: 36, padding: "0 20px", background: saved ? "#4A4A4A" : "#1A1A1A", border: "none", borderRadius: 12, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT, transition: "background 0.2s" }}
    >
      {saved ? "Saved" : label}
    </button>
  );
}

function GhostButton({ children, danger }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <button style={{ height: 36, padding: "0 16px", background: "white", border: `1px solid ${danger ? "#D0D0CE" : "#E8E8E6"}`, borderRadius: 12, color: danger ? "#C05040" : "#3A3A3A", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: FONT }}>
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid #F0F0EE", margin: "2px 0" }} />;
}

function ToggleRow({ label, description, value, onChange }: { label: string; description?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", gap: 24 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, color: "#1A1A1A", margin: 0, fontWeight: 400 }}>{label}</p>
        {description && <p style={{ fontSize: 12, color: "#A0A0A0", margin: "2px 0 0" }}>{description}</p>}
      </div>
      <Toggle on={value} onChange={onChange} />
    </div>
  );
}

function PanelHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid #F0F0EE" }}>
      <h2 style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{title}</h2>
      {description && <p style={{ fontSize: 13, color: "#9A9A9A", margin: 0, lineHeight: 1.5 }}>{description}</p>}
    </div>
  );
}

// ── Visual tile system (Appearance only) ──────────────────────────────────────

function VisualTile({
  label, selected, onClick, previewHeight = 68, children,
}: {
  label: string; selected: boolean; onClick: () => void;
  previewHeight?: number; children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 0", minWidth: 0,
        background: selected ? "#F6F6F4" : hov ? "#FAFAF9" : "white",
        border: `${selected ? 1.5 : 1}px solid ${selected ? "#9A9A9A" : "#E8E8E6"}`,
        borderRadius: 14, padding: "10px 10px 9px",
        cursor: "pointer", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8,
        transition: "border-color 0.15s, background 0.1s",
        fontFamily: FONT,
      }}
    >
      {/* Preview pane — data-no-invert so colours always show true in dark mode */}
      <div
        data-no-invert
        style={{
          width: "100%", height: previewHeight,
          borderRadius: 8, overflow: "hidden",
          border: "1px solid #EDEDEB",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
      <span style={{
        fontSize: 12, fontWeight: selected ? 500 : 400,
        color: selected ? "#1A1A1A" : "#8A8A8A",
        letterSpacing: "-0.005em",
      }}>
        {label}
      </span>
    </button>
  );
}

function TileRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", gap: 10 }}>{children}</div>;
}

function SettingGroup({
  label, hint, children,
}: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <SectionLabel>{label}</SectionLabel>
      {children}
      {hint && <p style={{ fontSize: 12, color: "#A8A8A6", margin: 0, lineHeight: 1.5 }}>{hint}</p>}
    </div>
  );
}

// ── Theme tile previews ───────────────────────────────────────────────────────

function ThemeLight() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F2F2F0" }}>
      {/* sidebar */}
      <div style={{ width: "28%", background: "#E8E8E6", borderRight: "1px solid #DEDEDE", padding: "7px 6px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ width: "55%", height: 3, background: "#BEBEBA", borderRadius: 99, marginBottom: 2 }} />
        {[82, 68, 75, 60].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 2.5, background: "#D4D4D0", borderRadius: 99 }} />
        ))}
      </div>
      {/* content */}
      <div style={{ flex: 1, padding: "7px 7px", display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ width: "42%", height: 3.5, background: "#B4B4B0", borderRadius: 99 }} />
        {[0, 1].map((i) => (
          <div key={i} style={{ background: "white", borderRadius: 5, border: "1px solid #E8E8E6", padding: "4px 5px", display: "flex", flexDirection: "column", gap: 2.5 }}>
            <div style={{ width: "72%", height: 2, background: "#DCDCD8", borderRadius: 99 }} />
            <div style={{ width: "52%", height: 2, background: "#E6E6E2", borderRadius: 99 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeDark() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#141414" }}>
      {/* sidebar */}
      <div style={{ width: "28%", background: "#0C0C0C", borderRight: "1px solid #222222", padding: "7px 6px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ width: "55%", height: 3, background: "#484848", borderRadius: 99, marginBottom: 2 }} />
        {[82, 68, 75, 60].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 2.5, background: "#282828", borderRadius: 99 }} />
        ))}
      </div>
      {/* content */}
      <div style={{ flex: 1, padding: "7px 7px", display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ width: "42%", height: 3.5, background: "#3C3C3A", borderRadius: 99 }} />
        {[0, 1].map((i) => (
          <div key={i} style={{ background: "#1E1E1C", borderRadius: 5, border: "1px solid #282826", padding: "4px 5px", display: "flex", flexDirection: "column", gap: 2.5 }}>
            <div style={{ width: "72%", height: 2, background: "#363634", borderRadius: 99 }} />
            <div style={{ width: "52%", height: 2, background: "#2E2E2C", borderRadius: 99 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeSystem() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      {/* light half */}
      <div style={{ width: "50%", background: "#F2F2F0", padding: "7px 6px", display: "flex", flexDirection: "column", gap: 4, borderRight: "1px solid #C8C8C4" }}>
        <div style={{ width: "60%", height: 3, background: "#BEBEBA", borderRadius: 99, marginBottom: 1 }} />
        {[0, 1].map((i) => (
          <div key={i} style={{ background: "white", borderRadius: 4, border: "1px solid #E8E8E6", padding: "3px 4px", display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ width: "78%", height: 2, background: "#DCDCD8", borderRadius: 99 }} />
            <div style={{ width: "55%", height: 2, background: "#E6E6E2", borderRadius: 99 }} />
          </div>
        ))}
      </div>
      {/* dark half */}
      <div style={{ width: "50%", background: "#141414", padding: "7px 6px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ width: "60%", height: 3, background: "#3C3C3A", borderRadius: 99, marginBottom: 1 }} />
        {[0, 1].map((i) => (
          <div key={i} style={{ background: "#1E1E1C", borderRadius: 4, border: "1px solid #282826", padding: "3px 4px", display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ width: "78%", height: 2, background: "#363634", borderRadius: 99 }} />
            <div style={{ width: "55%", height: 2, background: "#2E2E2C", borderRadius: 99 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Density tile previews ─────────────────────────────────────────────────────

function DensityRows({ count, gap }: { count: number; gap: number }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "center", gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#CECECA", flexShrink: 0 }} />
          <div style={{ flex: 1, height: 2, background: "#E4E4E0", borderRadius: 99 }} />
          <div style={{ width: [14, 20, 10, 18, 12][i % 5], height: 2, background: "#D4D4D0", borderRadius: 99 }} />
        </div>
      ))}
    </div>
  );
}

// ── Font size tile previews ───────────────────────────────────────────────────

function FontPreview({ aaSize }: { aaSize: number }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "8px 12px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 5 }}>
      <span style={{ fontSize: aaSize, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, fontFamily: FONT, letterSpacing: "-0.02em" }}>
        Aa
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "78%", height: 1.5, background: "#DCDCD8", borderRadius: 99 }} />
        <div style={{ width: "55%", height: 1.5, background: "#E4E4E0", borderRadius: 99 }} />
      </div>
    </div>
  );
}

// ── Corner style tile previews ────────────────────────────────────────────────

function CornerPreview({ r }: { r: number }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ width: 38, height: 22, border: "1.5px solid #C4C4C0", borderRadius: r, background: "#F6F6F4" }} />
        <div style={{ width: 28, height: 14, border: "1.5px solid #D4D4D0", borderRadius: Math.round(r * 0.65), background: "#F6F6F4" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ width: 36, height: 7, border: "1px solid #DCDCD8", borderRadius: Math.round(r * 0.45), background: "#FAFAF8" }} />
        ))}
      </div>
    </div>
  );
}

// ── Appearance panel ──────────────────────────────────────────────────────────

function AppearancePanel() {
  const { theme, density, fontSize, cornerStyle, setTheme, setDensity, setFontSize, setCornerStyle } = useAppearance();

  const themeHint: Record<Theme, string> = {
    Light:  "Light mode is active.",
    Dark:   "Dark mode is active.",
    System: "Follows your operating system setting.",
  };

  const densityHint: Record<Density, string> = {
    Compact:     "Tighter spacing — fits more content on screen.",
    Default:     "Balanced spacing for everyday use.",
    Comfortable: "Generous spacing for a more relaxed experience.",
  };

  const fontHint: Record<FontSize, string> = {
    Small:   "88% scale — more content, smaller text.",
    Default: "100% scale — the default Studio OS size.",
    Large:   "113% scale — easier reading, larger text.",
  };

  const cornerHint: Record<CornerStyle, string> = {
    Soft:    "Friendly, generously rounded surfaces.",
    Rounded: "Balanced — the Studio OS default.",
    Sharp:   "Structured and precise, minimal radius.",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Appearance" description="Customize how Studio OS looks. Changes apply instantly." />

      {/* 1 — Theme */}
      <SettingGroup label="Theme" hint={themeHint[theme]}>
        <TileRow>
          <VisualTile label="Light" selected={theme === "Light"} onClick={() => setTheme("Light")} previewHeight={72}>
            <ThemeLight />
          </VisualTile>
          <VisualTile label="Dark" selected={theme === "Dark"} onClick={() => setTheme("Dark")} previewHeight={72}>
            <ThemeDark />
          </VisualTile>
          <VisualTile label="System" selected={theme === "System"} onClick={() => setTheme("System")} previewHeight={72}>
            <ThemeSystem />
          </VisualTile>
        </TileRow>
      </SettingGroup>

      <div style={{ margin: "22px 0" }}><Divider /></div>

      {/* 2 — Density */}
      <SettingGroup label="Interface Density" hint={densityHint[density]}>
        <TileRow>
          <VisualTile label="Compact" selected={density === "Compact"} onClick={() => setDensity("Compact")} previewHeight={64}>
            <DensityRows count={5} gap={3} />
          </VisualTile>
          <VisualTile label="Default" selected={density === "Default"} onClick={() => setDensity("Default")} previewHeight={64}>
            <DensityRows count={4} gap={7} />
          </VisualTile>
          <VisualTile label="Comfortable" selected={density === "Comfortable"} onClick={() => setDensity("Comfortable")} previewHeight={64}>
            <DensityRows count={3} gap={12} />
          </VisualTile>
        </TileRow>
      </SettingGroup>

      <div style={{ margin: "22px 0" }}><Divider /></div>

      {/* 3 — Font size */}
      <SettingGroup label="Font Size" hint={fontHint[fontSize]}>
        <TileRow>
          <VisualTile label="Small" selected={fontSize === "Small"} onClick={() => setFontSize("Small")} previewHeight={64}>
            <FontPreview aaSize={13} />
          </VisualTile>
          <VisualTile label="Default" selected={fontSize === "Default"} onClick={() => setFontSize("Default")} previewHeight={64}>
            <FontPreview aaSize={18} />
          </VisualTile>
          <VisualTile label="Large" selected={fontSize === "Large"} onClick={() => setFontSize("Large")} previewHeight={64}>
            <FontPreview aaSize={22} />
          </VisualTile>
        </TileRow>
      </SettingGroup>

      <div style={{ margin: "22px 0" }}><Divider /></div>

      {/* 4 — Corner style */}
      <SettingGroup label="Corner Style" hint={cornerHint[cornerStyle]}>
        <TileRow>
          <VisualTile label="Soft" selected={cornerStyle === "Soft"} onClick={() => setCornerStyle("Soft")} previewHeight={60}>
            <CornerPreview r={14} />
          </VisualTile>
          <VisualTile label="Rounded" selected={cornerStyle === "Rounded"} onClick={() => setCornerStyle("Rounded")} previewHeight={60}>
            <CornerPreview r={7} />
          </VisualTile>
          <VisualTile label="Sharp" selected={cornerStyle === "Sharp"} onClick={() => setCornerStyle("Sharp")} previewHeight={60}>
            <CornerPreview r={2} />
          </VisualTile>
        </TileRow>
      </SettingGroup>
    </div>
  );
}

// ── Other panels (unchanged) ──────────────────────────────────────────────────

function ProfilePanel() {
  const [form, setForm] = useState({
    name: "Emirkan Erkara", role: "Product Design",
    email: "emirkan@studioos.io", timezone: "Europe/Istanbul",
    bio: "Independent product designer focused on design systems, interaction design, and calm software.",
  });
  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PanelHeader title="Profile" description="Your personal information visible to teammates." />
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "white", letterSpacing: "0.03em" }}>EE</span>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: "0 0 3px" }}>Emirkan Erkara</p>
          <button style={{ fontSize: 12, color: "#7A7A7A", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: FONT }}>Change photo</button>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name"><input style={inputStyle} value={form.name} onChange={update("name")} /></Field>
        <Field label="Role"><input style={inputStyle} value={form.role} onChange={update("role")} /></Field>
        <Field label="Email"><input style={inputStyle} type="email" value={form.email} onChange={update("email")} /></Field>
        <Field label="Timezone">
          <select style={selectStyle} value={form.timezone} onChange={update("timezone")}>
            <option value="Europe/Istanbul">Istanbul — UTC+3</option>
            <option value="Europe/London">London — UTC+0</option>
            <option value="Europe/Berlin">Berlin — UTC+1</option>
            <option value="Asia/Dubai">Dubai — UTC+4</option>
            <option value="Asia/Karachi">Karachi — UTC+5</option>
            <option value="America/New_York">New York — UTC−5</option>
            <option value="America/Los_Angeles">Los Angeles — UTC−8</option>
          </select>
        </Field>
      </div>
      <Field label="Short Bio">
        <textarea value={form.bio} onChange={update("bio")} rows={3}
          style={{ ...inputStyle, height: "auto", padding: "12px 14px", resize: "vertical", lineHeight: 1.55 }} />
      </Field>
      <div style={{ paddingTop: 4 }}><SaveButton /></div>
    </div>
  );
}

function WorkspacePanel() {
  const [form, setForm] = useState({ name: "Studio OS", slug: "studio-os", defaultView: "tasks", fiscal: "january" });
  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [key]: e.target.value });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PanelHeader title="Workspace" description="Manage your shared workspace settings." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Workspace Name"><input style={inputStyle} value={form.name} onChange={update("name")} /></Field>
        <Field label="Workspace URL">
          <div style={{ display: "flex", alignItems: "center", height: 44, border: "1px solid #E8E8E6", borderRadius: 12, overflow: "hidden", background: "white" }}>
            <span style={{ padding: "0 10px 0 14px", fontSize: 14, color: "#B0B0B0", whiteSpace: "nowrap", flexShrink: 0 }}>studioos.io/</span>
            <input style={{ ...inputStyle, border: "none", borderRadius: 0, paddingLeft: 0, flex: 1, height: "100%" }} value={form.slug} onChange={update("slug")} />
          </div>
        </Field>
        <Field label="Default View">
          <select style={selectStyle} value={form.defaultView} onChange={update("defaultView")}>
            <option value="tasks">Tasks</option>
            <option value="calendar">Calendar</option>
            <option value="projects">Projects</option>
          </select>
        </Field>
        <Field label="Fiscal Year Start">
          <select style={selectStyle} value={form.fiscal} onChange={update("fiscal")}>
            {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m) => (
              <option key={m} value={m.toLowerCase()}>{m}</option>
            ))}
          </select>
        </Field>
      </div>
      <div style={{ background: "#F8F8F7", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#5A5A5A" }}>Members</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>6 active</span>
      </div>
      <div style={{ paddingTop: 4 }}><SaveButton /></div>
      <Divider />
      <div>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", marginBottom: 8 }}>Danger Zone</p>
        <p style={{ fontSize: 12, color: "#A0A0A0", marginBottom: 14 }}>
          Deleting the workspace is irreversible. All projects, tasks, and files will be permanently removed.
        </p>
        <GhostButton danger>Delete workspace</GhostButton>
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const [state, setState] = useState({
    emailNotifs: true, pushNotifs: false, weeklyDigest: true,
    taskMentions: true, commentMentions: true, statusChanges: false,
    projectAssigned: true, deadlineReminders: true,
  });
  function toggle(key: keyof typeof state) { return (v: boolean) => setState({ ...state, [key]: v }); }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <PanelHeader title="Notifications" description="Choose what you're notified about and how." />
      <div style={{ marginBottom: 6 }}><SectionLabel>Activity</SectionLabel></div>
      <div style={{ borderTop: "1px solid #F0F0EE" }}>
        <ToggleRow label="Email notifications" description="Receive activity summaries to your inbox" value={state.emailNotifs} onChange={toggle("emailNotifs")} />
        <div style={{ borderTop: "1px solid #F4F4F2" }} />
        <ToggleRow label="Push notifications" description="Browser and mobile push alerts" value={state.pushNotifs} onChange={toggle("pushNotifs")} />
        <div style={{ borderTop: "1px solid #F4F4F2" }} />
        <ToggleRow label="Weekly digest" description="A summary of workspace activity each Monday" value={state.weeklyDigest} onChange={toggle("weeklyDigest")} />
      </div>
      <div style={{ margin: "22px 0 6px" }}><SectionLabel>Mentions &amp; Alerts</SectionLabel></div>
      <div style={{ borderTop: "1px solid #F0F0EE" }}>
        <ToggleRow label="Task mentions" value={state.taskMentions} onChange={toggle("taskMentions")} />
        <div style={{ borderTop: "1px solid #F4F4F2" }} />
        <ToggleRow label="Comment mentions" value={state.commentMentions} onChange={toggle("commentMentions")} />
        <div style={{ borderTop: "1px solid #F4F4F2" }} />
        <ToggleRow label="Status changes" description="When a task assigned to you changes status" value={state.statusChanges} onChange={toggle("statusChanges")} />
      </div>
      <div style={{ margin: "22px 0 6px" }}><SectionLabel>Projects</SectionLabel></div>
      <div style={{ borderTop: "1px solid #F0F0EE" }}>
        <ToggleRow label="New project assigned" value={state.projectAssigned} onChange={toggle("projectAssigned")} />
        <div style={{ borderTop: "1px solid #F4F4F2" }} />
        <ToggleRow label="Deadline reminders" description="48 hours before a deadline" value={state.deadlineReminders} onChange={toggle("deadlineReminders")} />
      </div>
      <div style={{ paddingTop: 22 }}><SaveButton /></div>
    </div>
  );
}

const INTEGRATIONS = [
  { id: "github",  name: "GitHub",       desc: "Sync issues and pull requests", connected: true  },
  { id: "figma",   name: "Figma",        desc: "Link design files to projects", connected: true  },
  { id: "slack",   name: "Slack",        desc: "Send updates to channels",      connected: false },
  { id: "gdrive",  name: "Google Drive", desc: "Attach documents and assets",   connected: false },
  { id: "notion",  name: "Notion",       desc: "Import pages and databases",    connected: false },
];

function IntegrationsPanel() {
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected]))
  );
  function toggle(id: string) { setConnected((prev) => ({ ...prev, [id]: !prev[id] })); }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <PanelHeader title="Integrations" description="Connect Studio OS to your existing tools." />
      {INTEGRATIONS.map((item, i) => (
        <div key={item.id}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{item.name}</p>
                {connected[item.id] && (
                  <span style={{ fontSize: 10, fontWeight: 500, color: "#6A6A6A", background: "#F0F0EE", padding: "2px 8px", borderRadius: 99, letterSpacing: "0.02em" }}>Connected</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: "#A0A0A0", margin: "2px 0 0" }}>{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.id)}
              style={{ height: 34, padding: "0 14px", background: connected[item.id] ? "white" : "#1A1A1A", border: `1px solid ${connected[item.id] ? "#E8E8E6" : "#1A1A1A"}`, borderRadius: 10, color: connected[item.id] ? "#5A5A5A" : "white", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap" }}
            >
              {connected[item.id] ? "Manage" : "Connect"}
            </button>
          </div>
          {i < INTEGRATIONS.length - 1 && <div style={{ borderTop: "1px solid #F4F4F2" }} />}
        </div>
      ))}
    </div>
  );
}

const SESSIONS = [
  { device: "MacBook Pro 16″", location: "Istanbul, Turkey", time: "Active now",  current: true  },
  { device: "iPhone 15 Pro",   location: "Istanbul, Turkey", time: "2 hours ago", current: false },
  { device: "Chrome — Windows",location: "Berlin, Germany",  time: "3 days ago",  current: false },
];

function SecurityPanel() {
  const [twofa, setTwofa] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <PanelHeader title="Security" description="Manage your password, 2FA, and active sessions." />
      <div>
        <SectionLabel>Password</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid #F0F0EE" }}>
          <div>
            <p style={{ fontSize: 14, color: "#1A1A1A", margin: "0 0 2px" }}>Password</p>
            <p style={{ fontSize: 12, color: "#A0A0A0", margin: 0 }}>Last changed 3 months ago</p>
          </div>
          <GhostButton>Change password</GhostButton>
        </div>
      </div>
      <Divider />
      <div>
        <SectionLabel>Two-factor authentication</SectionLabel>
        <div style={{ borderTop: "1px solid #F0F0EE" }}>
          <ToggleRow label="Enable 2FA" description="Use an authenticator app to add a second layer of security" value={twofa} onChange={setTwofa} />
        </div>
      </div>
      <Divider />
      <div>
        <SectionLabel>Active sessions</SectionLabel>
        <div style={{ border: "1px solid #EAEAE8", borderRadius: 12, overflow: "hidden", marginTop: 8 }}>
          {SESSIONS.map((s, i) => (
            <div key={s.device}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{s.device}</p>
                    {s.current && <span style={{ fontSize: 10, color: "#7A7A7A", background: "#F0F0EE", padding: "2px 7px", borderRadius: 99 }}>This device</span>}
                  </div>
                  <p style={{ fontSize: 12, color: "#A0A0A0", margin: "2px 0 0" }}>{s.location} · {s.time}</p>
                </div>
                {!s.current && (
                  <button style={{ fontSize: 12, color: "#9A9A9A", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, padding: "4px 8px" }}>Revoke</button>
                )}
              </div>
              {i < SESSIONS.length - 1 && <div style={{ borderTop: "1px solid #F4F4F2" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Nav + page shell ──────────────────────────────────────────────────────────

type Section = "Profile" | "Workspace" | "Notifications" | "Appearance" | "Integrations" | "Security";
const NAV_ITEMS: Section[] = ["Profile", "Workspace", "Notifications", "Appearance", "Integrations", "Security"];
const PANELS: Record<Section, React.ComponentType> = {
  Profile: ProfilePanel, Workspace: WorkspacePanel, Notifications: NotificationsPanel,
  Appearance: AppearancePanel, Integrations: IntegrationsPanel, Security: SecurityPanel,
};

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("Appearance");
  const Panel = PANELS[active];

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%" }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>Settings</p>
        <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
          Settings
        </h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
        {/* Left nav — UNCHANGED */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06 }}
          className="w-full lg:w-48 xl:w-52 shrink-0"
        >
          <div
            className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0"
            style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 16, padding: 6 }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "9px 13px", borderRadius: 11, border: "none",
                  background: active === item ? "#F0F0EE" : "transparent",
                  color: active === item ? "#1A1A1A" : "#7A7A7A",
                  fontSize: 13, fontWeight: active === item ? 500 : 400,
                  cursor: "pointer", fontFamily: FONT,
                  whiteSpace: "nowrap", textAlign: "left",
                  width: "100%", minWidth: "fit-content",
                  transition: "background 0.12s, color 0.12s",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 18, padding: "24px 24px 28px" }}
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
