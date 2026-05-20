import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// To redirect authenticated users away from login/signup
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/tickets/new" element={<NewTicket />} />
                  <Route path="/tickets/:id" element={<TicketDetail />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/reports" element={<Reports />} />
                  {/* Default fallback */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
