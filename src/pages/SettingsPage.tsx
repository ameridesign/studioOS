import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: "#A0A0A0", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 7px" }}>
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
  fontFamily: FONT,
  transition: "border-color 0.15s",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B0B0B0' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: 36,
  cursor: "pointer",
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
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        width: 38, height: 22, flexShrink: 0,
        background: on ? "#1A1A1A" : "#DEDEDC",
        borderRadius: 99, cursor: "pointer",
        position: "relative", transition: "background 0.2s",
      }}
    >
      <div style={{
        position: "absolute",
        top: 3, left: on ? 19 : 3,
        width: 16, height: 16,
        background: "white", borderRadius: "50%",
        transition: "left 0.18s",
      }} />
    </div>
  );
}

function SegmentedControl({ options, value, onChange }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "inline-flex", background: "#F0F0EE", borderRadius: 12, padding: 3, gap: 2 }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: "7px 16px", border: "none",
            borderRadius: 10,
            background: value === opt ? "white" : "transparent",
            fontSize: 13, fontWeight: value === opt ? 500 : 400,
            color: value === opt ? "#1A1A1A" : "#8A8A8A",
            cursor: "pointer", fontFamily: FONT,
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  const [saved, setSaved] = useState(false);
  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  return (
    <button
      onClick={handleSave}
      style={{
        height: 40, padding: "0 20px",
        background: saved ? "#4A4A4A" : "#1A1A1A",
        border: "none", borderRadius: 12,
        color: "white", fontSize: 13, fontWeight: 500,
        cursor: "pointer", fontFamily: FONT,
        transition: "background 0.2s",
      }}
    >
      {saved ? "Saved" : label}
    </button>
  );
}

function GhostButton({ children, danger }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <button
      style={{
        height: 38, padding: "0 16px",
        background: "white",
        border: `1px solid ${danger ? "#D0D0CE" : "#E8E8E6"}`,
        borderRadius: 12,
        color: danger ? "#C05040" : "#3A3A3A",
        fontSize: 13, fontWeight: 500,
        cursor: "pointer", fontFamily: FONT,
      }}
    >
      {children}
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

function Divider() {
  return <div style={{ borderTop: "1px solid #F0F0EE", margin: "4px 0" }} />;
}

// ── Toggle row ────────────────────────────────────────────────────────────────

function ToggleRow({
  label, description, value, onChange,
}: { label: string; description?: string; value: boolean; onChange: (v: boolean) => void }) {
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

// ── Panel header ──────────────────────────────────────────────────────────────

function PanelHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid #F0F0EE" }}>
      <h2 style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", margin: "0 0 4px" }}>{title}</h2>
      {description && <p style={{ fontSize: 13, color: "#9A9A9A", margin: 0 }}>{description}</p>}
    </div>
  );
}

// ── SECTIONS ─────────────────────────────────────────────────────────────────

function ProfilePanel() {
  const [form, setForm] = useState({
    name: "Emirkan Erkara",
    role: "Product Design",
    email: "emirkan@studioos.io",
    timezone: "Europe/Istanbul",
    bio: "Independent product designer focused on design systems, interaction design, and calm software.",
  });

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PanelHeader title="Profile" description="Your personal information visible to teammates." />

      {/* Avatar row */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "#1A1A1A",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "white", letterSpacing: "0.03em" }}>EE</span>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: "0 0 3px" }}>Emirkan Erkara</p>
          <button style={{ fontSize: 12, color: "#7A7A7A", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: FONT }}>
            Change photo
          </button>
        </div>
      </div>

      <Divider />

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name">
          <input style={inputStyle} value={form.name} onChange={update("name")} />
        </Field>
        <Field label="Role">
          <input style={inputStyle} value={form.role} onChange={update("role")} />
        </Field>
        <Field label="Email">
          <input style={inputStyle} type="email" value={form.email} onChange={update("email")} />
        </Field>
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
        <textarea
          value={form.bio}
          onChange={update("bio")}
          rows={3}
          style={{
            ...inputStyle,
            height: "auto", padding: "12px 14px",
            resize: "vertical", lineHeight: 1.55,
          }}
        />
      </Field>

      <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
        <SaveButton />
      </div>
    </div>
  );
}

function WorkspacePanel() {
  const [form, setForm] = useState({
    name: "Studio OS",
    slug: "studio-os",
    defaultView: "tasks",
    fiscal: "january",
  });

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PanelHeader title="Workspace" description="Manage your shared workspace settings." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Workspace Name">
          <input style={inputStyle} value={form.name} onChange={update("name")} />
        </Field>
        <Field label="Workspace URL">
          <div style={{ display: "flex", alignItems: "center", height: 44, border: "1px solid #E8E8E6", borderRadius: 12, overflow: "hidden", background: "white" }}>
            <span style={{ padding: "0 10px 0 14px", fontSize: 14, color: "#B0B0B0", whiteSpace: "nowrap", flexShrink: 0 }}>studioos.io/</span>
            <input
              style={{ ...inputStyle, border: "none", borderRadius: 0, paddingLeft: 0, flex: 1, height: "100%" }}
              value={form.slug}
              onChange={update("slug")}
            />
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

      {/* Member count info */}
      <div style={{ background: "#F8F8F7", borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#5A5A5A" }}>Members</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>6 active</span>
      </div>

      <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
        <SaveButton />
      </div>

      <Divider />

      {/* Danger zone */}
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
    emailNotifs: true,
    pushNotifs: false,
    weeklyDigest: true,
    taskMentions: true,
    commentMentions: true,
    statusChanges: false,
    projectAssigned: true,
    deadlineReminders: true,
  });

  function toggle(key: keyof typeof state) {
    return (v: boolean) => setState({ ...state, [key]: v });
  }

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

      <div style={{ paddingTop: 22 }}>
        <SaveButton />
      </div>
    </div>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState("Light");
  const [density, setDensity] = useState("Default");
  const [fontSize, setFontSize] = useState("Default");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <PanelHeader title="Appearance" description="Customize how Studio OS looks for you." />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionLabel>Theme</SectionLabel>
          <SegmentedControl options={["Light", "Dark", "System"]} value={theme} onChange={setTheme} />
        </div>

        <Divider />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionLabel>Interface density</SectionLabel>
          <SegmentedControl options={["Compact", "Default", "Comfortable"]} value={density} onChange={setDensity} />
          <p style={{ fontSize: 12, color: "#A0A0A0", margin: 0 }}>
            {density === "Compact" && "Tighter spacing for more content on screen."}
            {density === "Default" && "Balanced spacing for everyday use."}
            {density === "Comfortable" && "Generous spacing for focused work."}
          </p>
        </div>

        <Divider />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SectionLabel>Font size</SectionLabel>
          <SegmentedControl options={["Small", "Default", "Large"]} value={fontSize} onChange={setFontSize} />
        </div>
      </div>

      <div style={{ paddingTop: 4 }}>
        <SaveButton label="Apply" />
      </div>
    </div>
  );
}

const INTEGRATIONS = [
  { id: "github",   name: "GitHub",       desc: "Sync issues and pull requests",    connected: true  },
  { id: "figma",    name: "Figma",        desc: "Link design files to projects",    connected: true  },
  { id: "slack",    name: "Slack",        desc: "Send updates to channels",         connected: false },
  { id: "gdrive",   name: "Google Drive", desc: "Attach documents and assets",      connected: false },
  { id: "notion",   name: "Notion",       desc: "Import pages and databases",       connected: false },
];

function IntegrationsPanel() {
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected]))
  );

  function toggle(id: string) {
    setConnected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <PanelHeader title="Integrations" description="Connect Studio OS to your existing tools." />

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {INTEGRATIONS.map((item, i) => (
          <div key={item.id}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{item.name}</p>
                  {connected[item.id] && (
                    <span style={{ fontSize: 10, fontWeight: 500, color: "#6A6A6A", background: "#F0F0EE", padding: "2px 8px", borderRadius: 99, letterSpacing: "0.02em" }}>
                      Connected
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#A0A0A0", margin: "2px 0 0" }}>{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.id)}
                style={{
                  height: 34, padding: "0 14px",
                  background: connected[item.id] ? "white" : "#1A1A1A",
                  border: `1px solid ${connected[item.id] ? "#E8E8E6" : "#1A1A1A"}`,
                  borderRadius: 10,
                  color: connected[item.id] ? "#5A5A5A" : "white",
                  fontSize: 12, fontWeight: 500,
                  cursor: "pointer", fontFamily: FONT,
                  whiteSpace: "nowrap",
                }}
              >
                {connected[item.id] ? "Manage" : "Connect"}
              </button>
            </div>
            {i < INTEGRATIONS.length - 1 && <div style={{ borderTop: "1px solid #F4F4F2" }} />}
          </div>
        ))}
      </div>
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

      {/* Password */}
      <div>
        <SectionLabel>Password</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderTop: "1px solid #F0F0EE" }}>
          <div>
            <p style={{ fontSize: 14, color: "#1A1A1A", margin: "0 0 2px", fontWeight: 400 }}>Password</p>
            <p style={{ fontSize: 12, color: "#A0A0A0", margin: 0 }}>Last changed 3 months ago</p>
          </div>
          <GhostButton>Change password</GhostButton>
        </div>
      </div>

      <Divider />

      {/* 2FA */}
      <div>
        <SectionLabel>Two-factor authentication</SectionLabel>
        <div style={{ borderTop: "1px solid #F0F0EE" }}>
          <ToggleRow
            label="Enable 2FA"
            description="Use an authenticator app to add a second layer of security"
            value={twofa}
            onChange={setTwofa}
          />
        </div>
      </div>

      <Divider />

      {/* Active sessions */}
      <div>
        <SectionLabel>Active sessions</SectionLabel>
        <div style={{ border: "1px solid #EAEAE8", borderRadius: 12, overflow: "hidden" }}>
          {SESSIONS.map((s, i) => (
            <div key={s.device}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", gap: 12,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{s.device}</p>
                    {s.current && (
                      <span style={{ fontSize: 10, color: "#7A7A7A", background: "#F0F0EE", padding: "2px 7px", borderRadius: 99 }}>
                        This device
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "#A0A0A0", margin: "2px 0 0" }}>{s.location} · {s.time}</p>
                </div>
                {!s.current && (
                  <button style={{
                    fontSize: 12, color: "#9A9A9A",
                    background: "none", border: "none",
                    cursor: "pointer", fontFamily: FONT,
                    padding: "4px 8px",
                  }}>
                    Revoke
                  </button>
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

// ── Nav + page ────────────────────────────────────────────────────────────────

type Section = "Profile" | "Workspace" | "Notifications" | "Appearance" | "Integrations" | "Security";

const NAV_ITEMS: Section[] = ["Profile", "Workspace", "Notifications", "Appearance", "Integrations", "Security"];

const PANELS: Record<Section, React.ComponentType> = {
  Profile:       ProfilePanel,
  Workspace:     WorkspacePanel,
  Notifications: NotificationsPanel,
  Appearance:    AppearancePanel,
  Integrations:  IntegrationsPanel,
  Security:      SecurityPanel,
};

export default function SettingsPage() {
  const [active, setActive] = useState<Section>("Profile");
  const Panel = PANELS[active];

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%" }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 28 }}
      >
        <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
          Settings
        </p>
        <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
          Settings
        </h1>
      </motion.div>

      {/* ── Split layout ── */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">

        {/* Left nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06 }}
          className="w-full lg:w-48 xl:w-52 shrink-0"
        >
          {/* Mobile: horizontal scroll row */}
          <div
            className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0"
            style={{
              background: "white",
              border: "1px solid #EAEAE8",
              borderRadius: 16,
              padding: 6,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "9px 13px",
                  borderRadius: 11, border: "none",
                  background: active === item ? "#F0F0EE" : "transparent",
                  color: active === item ? "#1A1A1A" : "#7A7A7A",
                  fontSize: 13,
                  fontWeight: active === item ? 500 : 400,
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
              style={{
                background: "white",
                border: "1px solid #EAEAE8",
                borderRadius: 18,
                padding: "24px 24px 28px",
              }}
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
