import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Background3D from './components/Background3D';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/auth" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginSignup />} />
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/project/:id" element={
        <PrivateRoute>
          <ProjectDetails />
        </PrivateRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Background3D />
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
