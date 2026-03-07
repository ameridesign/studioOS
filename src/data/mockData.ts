export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  filesCount: number;
  recentFiles: FileItem[];
}

export interface FileItem {
  id: string;
  filename: string;
  sharedBy: string;
  size: string;
  createdTime: string;
  type: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  iconKey: string;
}

export interface ShortcutItem {
  id: string;
  title: string;
}

export const docCategories: DocCategory[] = [
  {
    id: "client-briefs",
    title: "Client Briefs",
    description: "Centralized briefs, goals, scope, and constraints per client.",
    icon: "FileText",
    filesCount: 24,
    recentFiles: [
      { id: "f-cb-1", filename: "atlas-crm-brief-v3.pdf", sharedBy: "Emir", size: "1.2 MB", createdTime: "July 1, 2025 • 10:30 AM", type: "PDF" },
      { id: "f-cb-2", filename: "onboarding-scope.md", sharedBy: "Farhan", size: "45 KB", createdTime: "June 28, 2025 • 2:15 PM", type: "MD" },
      { id: "f-cb-3", filename: "client-goals-q3.xlsx", sharedBy: "Lina", size: "320 KB", createdTime: "June 25, 2025 • 11:00 AM", type: "XLSX" },
    ],
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Components, UI patterns, tokens, and usage rules for consistency.",
    icon: "Palette",
    filesCount: 38,
    recentFiles: [
      { id: "f-ds-1", filename: "tokens-v2.json", sharedBy: "Emir", size: "12 KB", createdTime: "July 3, 2025 • 9:00 AM", type: "TXT" },
      { id: "f-ds-2", filename: "button-specs.fig", sharedBy: "Sarah", size: "3.8 MB", createdTime: "July 2, 2025 • 3:45 PM", type: "FIG" },
      { id: "f-ds-3", filename: "color-palette-update.pdf", sharedBy: "Lina", size: "680 KB", createdTime: "June 30, 2025 • 1:20 PM", type: "PDF" },
    ],
  },
  {
    id: "research-testing",
    title: "Research & Testing",
    description: "Interview notes, usability results, surveys, and insights.",
    icon: "FlaskConical",
    filesCount: 16,
    recentFiles: [
      { id: "f-rt-1", filename: "usability-round-3.pdf", sharedBy: "Mehdi", size: "2.1 MB", createdTime: "July 4, 2025 • 8:30 AM", type: "PDF" },
      { id: "f-rt-2", filename: "interview-notes-beta.md", sharedBy: "Farhan", size: "78 KB", createdTime: "July 1, 2025 • 4:00 PM", type: "MD" },
      { id: "f-rt-3", filename: "survey-results-q2.xlsx", sharedBy: "Lina", size: "450 KB", createdTime: "June 29, 2025 • 10:15 AM", type: "XLSX" },
    ],
  },
  {
    id: "handoff-qa",
    title: "Handoff & QA",
    description: "Specs, redlines, QA checklists, and release readiness.",
    icon: "CheckCircle",
    filesCount: 21,
    recentFiles: [
      { id: "f-hq-1", filename: "figma-handoff-checklist.xlsx", sharedBy: "Sarah", size: "95 KB", createdTime: "June 25, 2025 • 9:15 AM", type: "XLSX" },
      { id: "f-hq-2", filename: "qa-sprint-27.md", sharedBy: "Mehdi", size: "34 KB", createdTime: "July 2, 2025 • 11:30 AM", type: "MD" },
      { id: "f-hq-3", filename: "release-checklist-v1.pdf", sharedBy: "Emir", size: "120 KB", createdTime: "June 28, 2025 • 3:00 PM", type: "PDF" },
    ],
  },
  {
    id: "content-copy",
    title: "Content & Copy",
    description: "Messaging, landing page copy, microcopy, and tone.",
    icon: "PenTool",
    filesCount: 12,
    recentFiles: [
      { id: "f-cc-1", filename: "landing-page-v4.md", sharedBy: "Lina", size: "28 KB", createdTime: "July 3, 2025 • 2:00 PM", type: "MD" },
      { id: "f-cc-2", filename: "microcopy-guide.pdf", sharedBy: "Emir", size: "340 KB", createdTime: "June 30, 2025 • 10:45 AM", type: "PDF" },
      { id: "f-cc-3", filename: "tone-of-voice.txt", sharedBy: "Client", size: "8 KB", createdTime: "June 27, 2025 • 9:30 AM", type: "TXT" },
    ],
  },
  {
    id: "sprint-archives",
    title: "Sprint Archives",
    description: "Past sprint plans, retrospectives, and key decisions.",
    icon: "Archive",
    filesCount: 45,
    recentFiles: [
      { id: "f-sa-1", filename: "sprint-27-retro-notes.md", sharedBy: "Farhan", size: "320 KB", createdTime: "July 1, 2025 • 11:02 AM", type: "MD" },
      { id: "f-sa-2", filename: "sprint-26-plan.pdf", sharedBy: "Emir", size: "180 KB", createdTime: "June 24, 2025 • 9:00 AM", type: "PDF" },
      { id: "f-sa-3", filename: "sprint-25-decisions.md", sharedBy: "Mehdi", size: "42 KB", createdTime: "June 17, 2025 • 3:30 PM", type: "MD" },
    ],
  },
];

export const recentFiles: FileItem[] = [
  { id: "rf-1", filename: "atlas-crm-handoff-v1.fig", sharedBy: "Emir", size: "4.2 MB", createdTime: "June 28, 2025 • 3:46 PM", type: "FIG" },
  { id: "rf-2", filename: "sprint-27-retro-notes.md", sharedBy: "Farhan", size: "320 KB", createdTime: "July 1, 2025 • 11:02 AM", type: "MD" },
  { id: "rf-3", filename: "figma-handoff-checklist.xlsx", sharedBy: "Sarah", size: "95 KB", createdTime: "June 25, 2025 • 9:15 AM", type: "XLSX" },
  { id: "rf-4", filename: "real-time-sync-architecture.drawio", sharedBy: "Mehdi", size: "1.2 MB", createdTime: "June 24, 2025 • 1:37 PM", type: "DRAWIO" },
  { id: "rf-5", filename: "user-persona-beta-group-a.pdf", sharedBy: "Lina", size: "540 KB", createdTime: "July 3, 2025 • 9:50 AM", type: "PDF" },
  { id: "rf-6", filename: "proposal-studioos-v2.pdf", sharedBy: "Emir", size: "680 KB", createdTime: "July 2, 2025 • 4:12 PM", type: "PDF" },
  { id: "rf-7", filename: "client-feedback-round-2.txt", sharedBy: "Client", size: "18 KB", createdTime: "July 4, 2025 • 10:20 AM", type: "TXT" },
];

export const projects: Project[] = [
  { id: "atlas-crm",        name: "Atlas CRM",         color: "#1a1a1a", iconKey: "building2"  },
  { id: "studioos-v2",      name: "Studio OS v2",       color: "#1a1a1a", iconKey: "layers"     },
  { id: "mobile-app",       name: "Mobile App",         color: "#1a1a1a", iconKey: "smartphone" },
  { id: "website-redesign", name: "Website Redesign",   color: "#1a1a1a", iconKey: "globe"      },
];

export const shortcuts: ShortcutItem[] = [
  { id: "s-1", title: "Templates" },
  { id: "s-2", title: "Contracts" },
  { id: "s-3", title: "Proposals" },
  { id: "s-4", title: "Brand Assets" },
  { id: "s-5", title: "UI Kits" },
  { id: "s-6", title: "Invoices" },
  { id: "s-7", title: "Archived Projects" },
];

export const engagementData = [
  { month: "Jan", views: 120, edits: 45 },
  { month: "Feb", views: 180, edits: 62 },
  { month: "Mar", views: 150, edits: 55 },
  { month: "Apr", views: 220, edits: 78 },
  { month: "May", views: 280, edits: 95 },
  { month: "Jun", views: 310, edits: 110 },
  { month: "Jul", views: 250, edits: 88 },
  { month: "Aug", views: 340, edits: 125 },
  { month: "Sep", views: 290, edits: 102 },
  { month: "Oct", views: 380, edits: 140 },
  { month: "Nov", views: 420, edits: 155 },
  { month: "Dec", views: 460, edits: 170 },
];

export const weeklyViewsEdits = {
  views: 1247,
  edits: 483,
  total: 1730,
};
