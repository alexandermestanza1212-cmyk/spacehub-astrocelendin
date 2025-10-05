// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MissionLocationPage from './pages/MissionLocationPage';
import ShipDesignerPage from './pages/ShipDesignerPage';
import DesignPage from './pages/DesignPage';
import MissionReportPage from './pages/MissionReportPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import CommunityDesigns from './pages/CommunityDesigns';
import './App.css';

function App() {
  console.log('App cargado');

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/community" element={<CommunityDesigns />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mission-location"
            element={
              <ProtectedRoute>
                <MissionLocationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ship-designer/:location"
            element={
              <ProtectedRoute>
                <DesignPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/design/:location"
            element={
              <ProtectedRoute>
                <DesignPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mission-report"
            element={
              <ProtectedRoute>
                <MissionReportPage />
              </ProtectedRoute>
            }
          />

          {/* 404 - Página no encontrada */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404</h1>
                <p>Página no encontrada</p>
                <Link to="/">Volver al inicio</Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;