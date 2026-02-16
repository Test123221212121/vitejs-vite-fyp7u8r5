import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { ProjectsView } from './components/projects/ProjectsView';
import { CompaniesView } from './components/companies/CompaniesView';
import { LifeOSView } from './components/lifeos/LifeOSView';
import { NewsPage } from './pages/NewsPage';
import { CorePage } from './pages/CorePage';
import { OrganizationPage } from './pages/OrganizationPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="projects" element={<ProjectsView />} />
          <Route path="companies" element={<CompaniesView />} />
          <Route path="companies/:id" element={<CompanyDetailPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="lifeos" element={<LifeOSView />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="core" element={<CorePage />} />
          <Route path="organization" element={<OrganizationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
