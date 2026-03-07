import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { weeklyViewsEdits } from "../data/mockData";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const data = [
  { name: "Views", value: weeklyViewsEdits.views },
  { name: "Edits", value: weeklyViewsEdits.edits },
];

const COLORS = ["#1A1A1A", "#EBEBEA"];

export default function ViewsEditsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.48, duration: 0.32 }}
      style={{
        background: "white",
        border: "1px solid #EAEAE8",
        borderRadius: 18,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        padding: "22px 22px 18px",
        fontFamily: FONT,
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
        Views & Edits by Week
      </h3>
      <div style={{ height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={0}
              dataKey="value"
              animationDuration={1000}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 4 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9A9A9A", marginBottom: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#1A1A1A", display: "inline-block" }} />
            Views
          </div>
          <p style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
            {weeklyViewsEdits.views.toLocaleString()}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9A9A9A", marginBottom: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#DDDDD8", display: "inline-block" }} />
            Edits
          </div>
          <p style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", margin: 0 }}>
            {weeklyViewsEdits.edits.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
