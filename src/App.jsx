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
import LoginPage from './pages/LoginPage';

// 路由保护组件
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
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
