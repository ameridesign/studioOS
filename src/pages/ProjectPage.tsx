import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Calendar,
  FileText,
  CheckCircle,
  Building2,
  Layers,
  Smartphone,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { docCategories } from "../data/mockData";
import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../components/Layout";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const PROJECT_ICONS: Record<string, LucideIcon> = {
  "atlas-crm":        Building2,
  "studioos-v2":      Layers,
  "mobile-app":       Smartphone,
  "website-redesign": Globe,
};

const projectStats = [
  { label: "Documents",       value: "24", icon: FileText    },
  { label: "Team Members",    value: "6",  icon: Users       },
  { label: "Sprints",         value: "12", icon: Calendar    },
  { label: "Completed Tasks", value: "89", icon: CheckCircle },
];

export default function ProjectPage() {
  const { projectId } = useParams();
  const { projects } = useOutletContext<LayoutContext>();
  const project = projects.find((p) => p.id === projectId);
  const ProjectIcon = projectId ? (PROJECT_ICONS[projectId] ?? Building2) : Building2;

  if (!project) {
    return (
      <div style={{ padding: "36px 40px", fontFamily: FONT }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#9A9A9A", textDecoration: "none", marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <p style={{ fontSize: 14, color: "#9A9A9A" }}>Project not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "36px 40px 52px", fontFamily: FONT, background: "#F6F6F4", minHeight: "100%" }}>
      {/* Back */}
      <Link
        to="/"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#9A9A9A", textDecoration: "none", marginBottom: 28 }}
      >
        <ArrowLeft size={13} /> Back
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", marginBottom: 4 }}>Project</p>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Icon badge */}
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "#1A1A1A",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>
            <ProjectIcon size={20} style={{ color: "white" }} />
          </div>
          <h1 style={{ fontSize: 54, fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            {project.name}
          </h1>
        </div>
        <p style={{ fontSize: 14, color: "#9A9A9A", margin: "8px 0 0" }}>Project overview and documentation hub</p>
      </motion.div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {projectStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.04, duration: 0.26 }}
            style={{ background: "white", border: "1px solid #EAEAE8", borderRadius: 16, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <stat.icon size={14} style={{ color: "#B0B0B0" }} />
              <span style={{ fontSize: 12, color: "#A0A0A0", fontWeight: 500 }}>{stat.label}</span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: 0, letterSpacing: "-0.02em" }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Related Docs */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.28 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#B0B0B0", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Related Documentation
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {docCategories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              style={{
                background: "white", border: "1px solid #EAEAE8", borderRadius: 16,
                padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.15s, transform 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                el.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A", margin: "0 0 6px" }}>{cat.title}</h3>
              <p style={{ fontSize: 12, color: "#9A9A9A", margin: "0 0 10px", lineHeight: 1.45 }}>{cat.description}</p>
              <p style={{ fontSize: 11, color: "#C0C0C0", margin: 0 }}>{cat.filesCount} files</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
