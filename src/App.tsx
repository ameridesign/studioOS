import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import DocsPage from "./pages/DocsPage";
import ProjectPage from "./pages/ProjectPage";
import FilePage from "./pages/FilePage";
import ReportingPage from "./pages/ReportingPage";
import SettingsPage from "./pages/SettingsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import TeamPage from "./pages/TeamPage";
import AutomationsPage from "./pages/AutomationsPage";
import ReleasesPage from "./pages/ReleasesPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/files/:fileId" element={<FilePage />} />
          <Route path="/reporting" element={<ReportingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Placeholder routes for sidebar items */}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/automations" element={<AutomationsPage />} />
          <Route path="/releases" element={<ReleasesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

