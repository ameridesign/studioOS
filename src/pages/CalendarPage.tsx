import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const TODAY_STR = "2026-03-07";

type EventType = "Meeting" | "Review" | "Planning" | "Client" | "QA";

interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: EventType;
}

const allEvents: CalEvent[] = [
  { id: "e1",  title: "Studio OS sync",               date: "2026-03-07", time: "10:00 AM", type: "Meeting"  },
  { id: "e2",  title: "Sprint planning",              date: "2026-03-09", time: "2:00 PM",  type: "Planning" },
  { id: "e3",  title: "Atlas CRM review",             date: "2026-03-10", time: "11:00 AM", type: "Review"   },
  { id: "e4",  title: "Mobile app QA session",        date: "2026-03-12", time: "3:00 PM",  type: "QA"       },
  { id: "e5",  title: "Website redesign client call", date: "2026-03-14", time: "1:00 PM",  type: "Client"   },
  { id: "e6",  title: "Studio OS sync",               date: "2026-03-17", time: "10:00 AM", type: "Meeting"  },
  { id: "e7",  title: "Release review",               date: "2026-03-18", time: "4:00 PM",  type: "Review"   },
  { id: "e8",  title: "Atlas CRM review",             date: "2026-03-21", time: "11:00 AM", type: "Review"   },
  { id: "e9",  title: "Sprint planning",              date: "2026-03-24", time: "2:00 PM",  type: "Planning" },
  { id: "e10", title: "Mobile app QA session",        date: "2026-03-26", time: "3:00 PM",  type: "QA"       },
  { id: "e11", title: "Website redesign client call", date: "2026-03-28", time: "1:00 PM",  type: "Client"   },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function toStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatAgendaDate(s: string) {
  return parseDate(s).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function getCalDays(year: number, month: number) {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: { dateStr: string; day: number; inMonth: boolean }[] = [];

  for (let i = firstDow - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const pm = month === 0 ? 11 : month - 1;
    const py = month === 0 ? year - 1 : year;
    cells.push({ dateStr: toStr(py, pm, d), day: d, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: toStr(year, month, d), day: d, inMonth: true });
  }
  let nd = 1;
  while (cells.length < 42) {
    const nm = month === 11 ? 0 : month + 1;
    const ny = month === 11 ? year + 1 : year;
    cells.push({ dateStr: toStr(ny, nm, nd), day: nd, inMonth: false });
    nd++;
  }
  return cells;
}

function getUpcoming() {
  const todayMs = parseDate(TODAY_STR).getTime();
  const limitMs = todayMs + 7 * 24 * 60 * 60 * 1000;
  return allEvents
    .filter((e) => {
      const ms = parseDate(e.date).getTime();
      return ms >= todayMs && ms <= limitMs;
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ── Agenda Item ───────────────────────────────────────────────────────────────

function AgendaItem({ event, isLast }: { event: CalEvent; isLast: boolean }) {
  const isToday = event.date === TODAY_STR;
  return (
    <div
      style={{
        padding: "12px 18px",
        borderBottom: isLast ? "none" : "1px solid #F4F4F2",
        cursor: "pointer",
        transition: "background 0.1s",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAFAF9"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 3px", lineHeight: 1.3 }}>
          {event.title}
        </p>
        <p style={{ fontSize: 11, color: "#9A9A9A", margin: 0 }}>
          {formatAgendaDate(event.date)} · {event.time}
        </p>
      </div>
      <span style={{
        fontSize: 10, fontWeight: 500,
        padding: "2px 8px", borderRadius: 999,
        background: isToday ? "#1A1A1A" : "#F0F0EE",
        color: isToday ? "white" : "#6A6A6A",
        flexShrink: 0,
        marginTop: 2,
        whiteSpace: "nowrap",
      }}>
        {event.type}
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const [year, setYear]       = useState(2026);
  const [month, setMonth]     = useState(2); // March = 2
  const [selected, setSelected] = useState(TODAY_STR);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const calDays = useMemo(() => getCalDays(year, month), [year, month]);
  const upcoming = useMemo(() => getUpcoming(), []);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalEvent[]> = {};
    allEvents.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, []);

  // Week view: 7 days of the week containing `selected`
  const weekDays = useMemo(() => {
    const base = parseDate(selected);
    const dow = base.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(d.getDate() - dow + i);
      return {
        dateStr: toStr(d.getFullYear(), d.getMonth(), d.getDate()),
        day: d.getDate(),
        label: WEEKDAYS[i],
      };
    });
  }, [selected]);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  const pillTime = (time: string) =>
    `${time.split(":")[0]}${time.includes("PM") ? "p" : "a"}`;

  return (
    <div
      className="px-4 pt-6 pb-12 lg:px-10 lg:pt-9 lg:pb-[52px]"
      style={{ fontFamily: FONT, background: "#F6F6F4", minHeight: "100%", maxWidth: "100%" }}
    >
      {/* ── Header ── */}
      <div
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        style={{ marginBottom: 24 }}
      >
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#A0A0A0", letterSpacing: "0.01em", marginBottom: 4 }}>
            Calendar
          </p>
          <h1 style={{ fontSize: "clamp(28px, 7vw, 54px)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.025em", margin: 0 }}>
            Calendar
          </h1>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>

          {/* Month navigator */}
          <div style={{
            display: "flex", alignItems: "center",
            background: "white", border: "1px solid #E8E8E6",
            borderRadius: 12, height: 36, overflow: "hidden",
          }}>
            <button
              onClick={prevMonth}
              aria-label="Previous month"
              style={{ width: 32, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", borderRight: "1px solid #F0F0EE", cursor: "pointer", color: "#6A6A6A" }}
            >
              <ChevronLeft size={14} strokeWidth={1.5} />
            </button>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", padding: "0 12px", whiteSpace: "nowrap", minWidth: 112, textAlign: "center" }}>
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              aria-label="Next month"
              style={{ width: 32, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", borderLeft: "1px solid #F0F0EE", cursor: "pointer", color: "#6A6A6A" }}
            >
              <ChevronRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Filter */}
          <button
            style={{
              height: 36, padding: "0 12px",
              background: "white", border: "1px solid #E8E8E6",
              borderRadius: 12, display: "flex", alignItems: "center",
              gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 500,
              color: "#6A6A6A", fontFamily: FONT,
            }}
          >
            <Filter size={13} style={{ color: "#A0A0A0" }} />
            Filter
          </button>

          {/* Month / Week toggle */}
          <div style={{
            display: "flex",
            background: "white", border: "1px solid #E8E8E6",
            borderRadius: 12, height: 36, overflow: "hidden",
          }}>
            {(["month", "week"] as const).map((v, i) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                style={{
                  height: 36, padding: "0 14px",
                  background: viewMode === v ? "#F4F4F2" : "white",
                  border: "none",
                  borderRight: i === 0 ? "1px solid #F0F0EE" : "none",
                  cursor: "pointer",
                  fontSize: 13, fontWeight: viewMode === v ? 500 : 400,
                  color: viewMode === v ? "#1A1A1A" : "#8A8A8A",
                  transition: "background 0.12s",
                  fontFamily: FONT,
                  whiteSpace: "nowrap",
                }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* Add Event */}
          <button
            style={{
              height: 36, padding: "0 14px",
              background: "#1A1A1A", border: "none",
              borderRadius: 12, display: "flex", alignItems: "center",
              gap: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 600, color: "white",
              fontFamily: FONT, whiteSpace: "nowrap",
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Event
          </button>
        </div>
      </div>

      {/* ── Body: calendar + agenda ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_276px] gap-4">

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          style={{
            background: "white",
            border: "1px solid #E8E8E6",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {viewMode === "month" ? (
            /* ── Month view ── */
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 560 }}>
                {/* Weekday header */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #EAEAE8" }}>
                  {WEEKDAYS.map((wd, i) => (
                    <div
                      key={wd}
                      style={{
                        padding: "11px 0",
                        textAlign: "center",
                        fontSize: 11, fontWeight: 500,
                        color: i === 0 || i === 6 ? "#C8C8C8" : "#B0B0B0",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {wd}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                  {calDays.map((cell, idx) => {
                    const isToday    = cell.dateStr === TODAY_STR;
                    const isSelected = cell.dateStr === selected && !isToday;
                    const cellEvents = eventsByDate[cell.dateStr] ?? [];
                    const isLastRow  = idx >= 35;
                    const isLastCol  = idx % 7 === 6;

                    return (
                      <div
                        key={cell.dateStr}
                        onClick={() => setSelected(cell.dateStr)}
                        style={{
                          minHeight: 92,
                          padding: "8px 9px 6px",
                          borderRight: isLastCol ? "none" : "1px solid #F0F0EE",
                          borderBottom: isLastRow ? "none" : "1px solid #F0F0EE",
                          background: isSelected ? "#F8F8F7" : "white",
                          cursor: "pointer",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) => {
                          if (!isToday && !isSelected)
                            (e.currentTarget as HTMLElement).style.background = "#FAFAF9";
                        }}
                        onMouseLeave={(e) => {
                          if (!isToday && !isSelected)
                            (e.currentTarget as HTMLElement).style.background = isSelected ? "#F8F8F7" : "white";
                        }}
                      >
                        {/* Day number */}
                        <div style={{ marginBottom: 6 }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center", justifyContent: "center",
                            width: 24, height: 24,
                            borderRadius: "50%",
                            fontSize: 12,
                            fontWeight: isToday ? 600 : 400,
                            color: isToday ? "white" : cell.inMonth ? "#2A2A2A" : "#D0D0D0",
                            background: isToday ? "#1A1A1A" : "transparent",
                            lineHeight: 1,
                          }}>
                            {cell.day}
                          </span>
                        </div>

                        {/* Event pills */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {cellEvents.slice(0, 2).map((ev) => (
                            <div
                              key={ev.id}
                              style={{
                                fontSize: 10, fontWeight: 500, lineHeight: 1.4,
                                color: isToday ? "white" : "#3A3A3A",
                                background: isToday ? "#2A2A2A" : "#F0F0EE",
                                borderRadius: 4,
                                padding: "2px 5px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {pillTime(ev.time)} {ev.title}
                            </div>
                          ))}
                          {cellEvents.length > 2 && (
                            <span style={{ fontSize: 10, color: "#B0B0B0", paddingLeft: 2 }}>
                              +{cellEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          ) : (
            /* ── Week view ── */
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 480 }}>
                {/* Day headers */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #EAEAE8" }}>
                  {weekDays.map((wd, i) => {
                    const isToday    = wd.dateStr === TODAY_STR;
                    const isSelected = wd.dateStr === selected;
                    return (
                      <div
                        key={wd.dateStr}
                        onClick={() => setSelected(wd.dateStr)}
                        style={{
                          padding: "14px 8px 12px",
                          textAlign: "center",
                          cursor: "pointer",
                          borderRight: i < 6 ? "1px solid #F0F0EE" : "none",
                        }}
                      >
                        <p style={{ fontSize: 10, fontWeight: 500, color: "#A0A0A0", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px" }}>
                          {wd.label}
                        </p>
                        <div style={{
                          width: 30, height: 30, margin: "0 auto",
                          borderRadius: "50%",
                          background: isToday ? "#1A1A1A" : isSelected ? "#F0F0EE" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <span style={{
                            fontSize: 14,
                            fontWeight: isToday ? 600 : 400,
                            color: isToday ? "white" : "#2A2A2A",
                          }}>
                            {wd.day}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Events per day */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minHeight: 340, alignItems: "start" }}>
                  {weekDays.map((wd, i) => {
                    const evs = eventsByDate[wd.dateStr] ?? [];
                    const isToday = wd.dateStr === TODAY_STR;
                    return (
                      <div
                        key={wd.dateStr}
                        style={{
                          padding: "12px 8px",
                          borderRight: i < 6 ? "1px solid #F0F0EE" : "none",
                          minHeight: 340,
                        }}
                      >
                        {evs.map((ev) => (
                          <div
                            key={ev.id}
                            style={{
                              marginBottom: 6,
                              padding: "7px 8px",
                              background: isToday ? "#1A1A1A" : "#F4F4F2",
                              borderRadius: 8,
                              cursor: "pointer",
                            }}
                          >
                            <p style={{
                              fontSize: 11, fontWeight: 500, margin: 0,
                              color: isToday ? "white" : "#2A2A2A",
                              lineHeight: 1.3,
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                              {ev.title}
                            </p>
                            <p style={{
                              fontSize: 10,
                              color: isToday ? "rgba(255,255,255,0.55)" : "#9A9A9A",
                              margin: "3px 0 0",
                            }}>
                              {ev.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Agenda panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.26 }}
          style={{
            background: "white",
            border: "1px solid #E8E8E6",
            borderRadius: 18,
            overflow: "hidden",
            alignSelf: "start",
          }}
        >
          <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #F0F0EE" }}>
            <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Upcoming</h2>
            <p style={{ fontSize: 11, color: "#A0A0A0", margin: "3px 0 0" }}>Next 7 days</p>
          </div>
          <div>
            {upcoming.length === 0 ? (
              <p style={{ padding: "20px 18px", fontSize: 13, color: "#B0B0B0", margin: 0 }}>
                No upcoming events.
              </p>
            ) : (
              upcoming.map((ev, i) => (
                <AgendaItem key={ev.id} event={ev} isLast={i === upcoming.length - 1} />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
