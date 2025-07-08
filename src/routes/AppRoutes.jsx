import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/auth/Dashboard";
import WelcomeScreen from "../pages/welcome/WelcomeScreen";
import ForgotPassword from "../pages/auth/ForgotPassword";
import AttendanceOverview from "../components/dashboard/AttendanceOverview";
import InviteForm from "../components/dashboard/invite/InviteForm";
import UpcomingMeetings from "../components/meetings/UpcomingMeetings";
import OTPInput from "../pages/auth/OtpInput";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public entry route */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/welcome"}
              replace
            />
          }
        />

        {/* Welcome screen */}
        <Route
          path="/welcome"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <WelcomeScreen />
            )
          }
        />

        {/* Authentication routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setAuth={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup setAuth={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/otp-verification"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <OTPInput setAuth={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/attendance-overview"
          element={
            isAuthenticated ? (
              <AttendanceOverview />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* InviteForm */}
        <Route
          path="/invite-form"
          element={
            isAuthenticated ? <InviteForm /> : <Navigate to="/login" replace />
          }
        />

        {/* UpcomingMeetings */}
        <Route
          path="/upcoming-meetings"
          element={
            isAuthenticated ? (
              <UpcomingMeetings />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={<ProtectedRedirect isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

const ProtectedRedirect = ({ isAuthenticated }) => {
  const location = useLocation();
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AppRoutes;
