import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PROJECT_ICON_MAP, PROJECT_ICON_KEYS } from "../lib/projectIcons";
import type { Project } from "../data/mockData";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

export default function NewProjectModal({ open, onClose, onSubmit }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [iconKey, setIconKey] = useState("building2");

  // Reset on open
  useEffect(() => {
    if (open) { setName(""); setIconKey("building2"); }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = trimmed.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
    onSubmit({ id, name: trimmed, color: "#1a1a1a", iconKey });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.18)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", zIndex: 60 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 30, stiffness: 380 }}
            style={{
              position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: "100%", maxWidth: 420,
              background: "white", borderRadius: 20, border: "1px solid #E8E8E6",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
              zIndex: 61, fontFamily: FONT, overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid #F0F0EE", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A", margin: 0, letterSpacing: "-0.01em" }}>
                New Project
              </h2>
              <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid #E8E8E6", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8A8A8A" }}>
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 22px 22px" }}>

              {/* Name */}
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#7A7A7A", marginBottom: 6 }}>
                Project name
              </label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Brand Refresh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                style={{
                  width: "100%", height: 40, padding: "0 12px",
                  border: "1px solid #E8E8E6", borderRadius: 10,
                  fontSize: 14, color: "#1A1A1A", background: "white",
                  outline: "none", boxSizing: "border-box", fontFamily: FONT,
                  marginBottom: 20,
                }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#C0C0BE"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E8E8E6"; }}
              />

              {/* Icon picker */}
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#7A7A7A", marginBottom: 10 }}>
                Icon
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 24 }}>
                {PROJECT_ICON_KEYS.map((key) => {
                  const Icon = PROJECT_ICON_MAP[key];
                  const active = key === iconKey;
                  return (
                    <button
                      key={key}
                      onClick={() => setIconKey(key)}
                      style={{
                        width: "100%", aspectRatio: "1",
                        borderRadius: 10,
                        border: active ? "1.5px solid #1A1A1A" : "1px solid #E8E8E6",
                        background: active ? "#1A1A1A" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.1s",
                      }}
                    >
                      <Icon size={16} style={{ color: active ? "white" : "#8A8A8A" }} />
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={onClose}
                  style={{ flex: 1, height: 38, borderRadius: 10, border: "1px solid #E8E8E6", background: "white", fontSize: 13, fontWeight: 500, color: "#6A6A6A", cursor: "pointer", fontFamily: FONT }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                  style={{
                    flex: 2, height: 38, borderRadius: 10, border: "none",
                    background: name.trim() ? "#1A1A1A" : "#E0E0DE",
                    fontSize: 13, fontWeight: 500,
                    color: name.trim() ? "white" : "#A0A0A0",
                    cursor: name.trim() ? "pointer" : "not-allowed",
                    fontFamily: FONT, transition: "background 0.15s",
                  }}
                >
                  Create Project
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
