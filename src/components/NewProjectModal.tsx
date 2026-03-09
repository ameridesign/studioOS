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

  useEffect(() => {
    if (open) { setName(""); setIconKey("building2"); }
  }, [open]);

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

  const canSubmit = name.trim().length > 0;

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

          {/* Centering container — static, no framer transforms */}
          <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 61, pointerEvents: "none" }}>
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 30, stiffness: 380 }}
            style={{
              pointerEvents: "auto",
              width: "calc(100vw - 32px)", maxWidth: 400,
              background: "white", borderRadius: 20, border: "1px solid #E8E8E6",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
              fontFamily: FONT,
              display: "flex", flexDirection: "column",
              maxHeight: "min(560px, 90vh)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #F0F0EE", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <h2 style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", margin: 0, letterSpacing: "-0.01em" }}>
                New Project
              </h2>
              <button onClick={onClose} style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid #E8E8E6", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8A8A8A" }}>
                <X size={13} />
              </button>
            </div>

            {/* Scrollable body */}
            <div style={{ padding: "16px 20px 4px", overflowY: "auto", flex: 1 }}>
              {/* Name */}
              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#7A7A7A", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
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
                  width: "100%", height: 38, padding: "0 11px",
                  border: "1px solid #E8E8E6", borderRadius: 9,
                  fontSize: 13, color: "#1A1A1A", background: "white",
                  outline: "none", boxSizing: "border-box", fontFamily: FONT,
                  marginBottom: 16,
                }}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#C0C0BE"; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#E8E8E6"; }}
              />

              {/* Icon picker */}
              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#7A7A7A", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Icon
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginBottom: 16 }}>
                {PROJECT_ICON_KEYS.map((key) => {
                  const Icon = PROJECT_ICON_MAP[key];
                  const active = key === iconKey;
                  return (
                    <button
                      key={key}
                      onClick={() => setIconKey(key)}
                      style={{
                        height: 36, borderRadius: 10,
                        border: active ? "1.5px solid #1A1A1A" : "1px solid #E8E8E6",
                        background: active ? "#1A1A1A" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.1s",
                      }}
                    >
                      <Icon size={15} style={{ color: active ? "white" : "#8A8A8A" }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky footer */}
            <div style={{ padding: "12px 20px 18px", borderTop: "1px solid #F0F0EE", display: "flex", gap: 8, flexShrink: 0 }}>
              <button
                onClick={onClose}
                style={{ flex: 1, height: 36, borderRadius: 9, border: "1px solid #E8E8E6", background: "white", fontSize: 13, fontWeight: 500, color: "#6A6A6A", cursor: "pointer", fontFamily: FONT }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  flex: 2, height: 36, borderRadius: 9, border: "none",
                  background: canSubmit ? "#1A1A1A" : "#E8E8E6",
                  fontSize: 13, fontWeight: 500,
                  color: canSubmit ? "white" : "#A0A0A0",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  fontFamily: FONT, transition: "background 0.15s",
                }}
              >
                Create Project
              </button>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
