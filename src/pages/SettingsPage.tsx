import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [active, setActive] = useState("profile");

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-xs font-medium text-warm-gray-400 uppercase tracking-wider mb-1">Settings</p>
        <h1 className="text-2xl font-bold text-warm-gray-900">Settings</h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:w-56 shrink-0"
        >
          <div className="flex lg:flex-col gap-1 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                  ${active === s.id
                    ? "bg-accent text-white shadow-sm"
                    : "text-warm-gray-600 hover:bg-warm-gray-100"
                  }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-6"
        >
          {active === "profile" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-base text-warm-gray-800">Profile</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center text-white font-bold text-xl">EE</div>
                <div>
                  <p className="font-semibold text-warm-gray-800">Emirkan Erkara</p>
                  <p className="text-sm text-warm-gray-500">Independent Product Designer</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: "Emirkan Erkara" },
                  { label: "Email", value: "emirkan@studioos.io" },
                  { label: "Role", value: "Product Designer" },
                  { label: "Location", value: "Istanbul, Turkey" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-medium text-warm-gray-500 mb-1 block">{f.label}</label>
                    <input
                      readOnly
                      value={f.value}
                      className="w-full px-3 py-2 rounded-xl border border-warm-gray-200 text-sm bg-warm-gray-50 text-warm-gray-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === "notifications" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-base text-warm-gray-800">Notifications</h2>
              {["Email notifications", "Push notifications", "Weekly digest", "Mention alerts"].map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-warm-gray-100">
                  <span className="text-sm text-warm-gray-700">{item}</span>
                  <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer">
                    <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {active === "security" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-base text-warm-gray-800">Security</h2>
              <p className="text-sm text-warm-gray-500">Manage your account security settings.</p>
              <button className="px-4 py-2 rounded-xl border border-warm-gray-200 text-sm text-warm-gray-600 hover:bg-warm-gray-100 transition-colors">
                Change Password
              </button>
              <button className="ml-2 px-4 py-2 rounded-xl border border-warm-gray-200 text-sm text-warm-gray-600 hover:bg-warm-gray-100 transition-colors">
                Enable 2FA
              </button>
            </div>
          )}
          {active === "appearance" && (
            <div className="space-y-5">
              <h2 className="font-semibold text-base text-warm-gray-800">Appearance</h2>
              <p className="text-sm text-warm-gray-500">Customize the look and feel.</p>
              <div className="flex gap-3">
                {["Light", "Dark", "System"].map((theme) => (
                  <button
                    key={theme}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${theme === "Light" ? "border-accent bg-accent-muted text-accent" : "border-warm-gray-200 text-warm-gray-600 hover:bg-warm-gray-100"}`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
