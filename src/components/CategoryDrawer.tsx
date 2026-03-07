import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Upload, Link, FileText } from "lucide-react";
import type { DocCategory } from "../data/mockData";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

interface CategoryDrawerProps {
  category: DocCategory | null;
  onClose: () => void;
}

const quickActions = [
  { icon: Plus,   label: "Create new" },
  { icon: Upload, label: "Upload" },
  { icon: Link,   label: "Share link" },
];

export default function CategoryDrawer({ category, onClose }: CategoryDrawerProps) {
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {category && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.18)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              zIndex: 50,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", damping: 30, stiffness: 360, duration: 0.22 }}
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%", maxWidth: 500,
              maxHeight: "82vh",
              background: "white",
              borderRadius: 20,
              border: "1px solid #E8E8E6",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
              zIndex: 51,
              display: "flex", flexDirection: "column",
              fontFamily: FONT,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #F0F0EE", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px", letterSpacing: "-0.015em" }}>
                  {category.title}
                </h2>
                <p style={{ fontSize: 13, color: "#8A8A8A", lineHeight: 1.5, margin: 0 }}>
                  {category.description}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: 30, height: 30, borderRadius: 8, border: "1px solid #E8E8E6",
                  background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0, color: "#8A8A8A",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}>

              {/* Quick actions */}
              <p style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>
                Quick Actions
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    style={{
                      display: "flex", alignItems: "center", gap: 7,
                      height: 36, padding: "0 14px",
                      background: "white", border: "1px solid #E8E8E6",
                      borderRadius: 10, fontSize: 13, fontWeight: 500,
                      color: "#3A3A3A", cursor: "pointer", fontFamily: FONT,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8F8F7"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                  >
                    <a.icon size={14} style={{ color: "#7A7A7A" }} />
                    {a.label}
                  </button>
                ))}
              </div>

              {/* Recent files */}
              <p style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px" }}>
                Recent Files ({category.recentFiles.length})
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {category.recentFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => { onClose(); navigate(`/files/${file.id}`); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 14px", borderRadius: 12,
                      border: "1px solid #EAEAE8", cursor: "pointer",
                      transition: "background 0.12s, box-shadow 0.12s",
                      background: "white",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#FAFAF9";
                      el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "white";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F4F4F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FileText size={14} style={{ color: "#8A8A8A" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.filename}
                      </p>
                      <p style={{ fontSize: 11, color: "#B0B0B0", margin: 0 }}>
                        {file.sharedBy} · {file.size} · {file.createdTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p style={{ fontSize: 12, color: "#B0B0B0", marginTop: 16, marginBottom: 0 }}>
                {category.filesCount} files total
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
