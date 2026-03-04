import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DocsPage from "./pages/DocsPage";
import ProjectPage from "./pages/ProjectPage";
import FilePage from "./pages/FilePage";
import ReportingPage from "./pages/ReportingPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/docs" replace />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/files/:fileId" element={<FilePage />} />
          <Route path="/reporting" element={<ReportingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Placeholder routes for sidebar items */}
          <Route path="/tasks" element={<PlaceholderPage title="Tasks" />} />
          <Route path="/calendar" element={<PlaceholderPage title="Calendar" />} />
          <Route path="/automations" element={<PlaceholderPage title="Automations" />} />
          <Route path="/releases" element={<PlaceholderPage title="Releases" />} />
          <Route path="*" element={<Navigate to="/docs" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6 lg:p-8">
      <p className="text-xs font-medium text-warm-gray-400 uppercase tracking-wider mb-1">{title}</p>
      <h1 className="text-2xl font-bold text-warm-gray-900 mb-4">{title}</h1>
      <div className="bg-white rounded-2xl border border-warm-gray-200 shadow-sm p-8 text-center">
        <p className="text-warm-gray-500 text-sm">This page is under construction.</p>
      </div>
    </div>
  );
}
