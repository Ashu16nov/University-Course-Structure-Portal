import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layouts/AdminLayout';
import UserLayout from './components/layouts/UserLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Programs from './pages/Programs';
import Semesters from './pages/Semesters';
import Subjects from './pages/Subjects';
import Login from './pages/Login';
import Register from './pages/Register';

function AppLayoutSwitcher({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return children;
  }

  if (user?.role === 'admin') {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (user?.role === 'user') {
    return <UserLayout>{children}</UserLayout>;
  }

  // Fallback while loading or if somehow not matched
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayoutSwitcher>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            } />
            <Route path="/programs" element={<ProtectedRoute><Programs /></ProtectedRoute>} />
            <Route path="/semesters" element={<ProtectedRoute><Semesters /></ProtectedRoute>} />
            <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
          </Routes>
        </AppLayoutSwitcher>
      </Router>
    </AuthProvider>
  );
}

function DashboardRouter() {
  const { user } = useContext(AuthContext);
  if (user?.role === 'admin') return <AdminDashboard />;
  return <UserDashboard />;
}

export default App;
