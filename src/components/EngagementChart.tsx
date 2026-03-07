import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { engagementData } from "../data/mockData";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default function EngagementChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42, duration: 0.32 }}
      style={{
        background: "white",
        border: "1px solid #EAEAE8",
        borderRadius: 18,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        padding: "22px 22px 18px",
        fontFamily: FONT,
      }}
    >
      <h3
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: "#1A1A1A",
          margin: "0 0 18px",
          letterSpacing: "-0.01em",
        }}
      >
        Documentation Engagement Trend
      </h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData} margin={{ top: 6, right: 8, left: -28, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#F0F0EE"
              vertical={false}
              horizontal={true}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#ABABAB", fontFamily: FONT }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#ABABAB", fontFamily: FONT }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E8E8E6",
                borderRadius: 12,
                fontSize: 12,
                fontFamily: FONT,
                boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
              }}
            />
            {/* Secondary / edits line — very faint */}
            <Line
              type="monotone"
              dataKey="edits"
              stroke="#D8D8D6"
              strokeWidth={1.5}
              dot={false}
              activeDot={false}
              animationDuration={1200}
            />
            {/* Primary / views line — warm golden with red markers */}
            <Line
              type="monotone"
              dataKey="views"
              stroke="#C8956C"
              strokeWidth={2}
              dot={{ r: 4, fill: "white", stroke: "#D44040", strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: "white", stroke: "#D44040", strokeWidth: 2 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9A9A9A" }}>
          <div style={{ width: 20, height: 2, background: "#C8956C", borderRadius: 2 }} />
          Views
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#B0B0B0" }}>
          <div style={{ width: 20, height: 2, background: "#D8D8D6", borderRadius: 2 }} />
          Edits
        </div>
      </div>
    </motion.div>
  );
}
