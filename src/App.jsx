import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import UsersPage from './pages/UsersPage';
import MeetingInteractionPage from './pages/MeetingInteractionPage';
import MeetingManagementPage from './pages/MeetingManagementPage';
import PointsMallPage from './pages/PointsMallPage';
import SettingsPage from './pages/SettingsPage';
import LiveWallPage from './pages/LiveWallPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="meeting-interaction" element={<MeetingInteractionPage />} />
          <Route path="meeting-management/:id" element={<MeetingManagementPage />} />
          <Route path="live-wall/:activityId" element={<LiveWallPage />} />
          <Route path="points-mall" element={<PointsMallPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
