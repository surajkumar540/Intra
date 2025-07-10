import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

// Pages - Auth
import Login from "../features/Auth/Login";
import ForgotPassword from "../features/Auth/ForgotPassword";
import VerifyOtp from "../features/Auth/VerifyOTP";
import SetNewPassword from "../features/Auth/SetNewPassword";

// Pages - Onboarding
import WelcomeScreen from "../features/Onboarding/WelcomeScreen";

// Pages - Dashboard
import Dashboard from "../features/Dashboard/Dashboard";
import AttendanceOverview from "../pages/dashboard/AttendanceOverview";

// Pages - Meetings
import InviteForm from "../features/Meetings/InviteForm";
import PreviousMeetings from "../features/Meetings/PreviousMeetings";
import UpcomingMeetings from "../features/Meetings/UpcomingMeetings";

// Pages - Reports
import AttendanceTracker from "../features/Reports/AttendanceTracker";

// 404 Page
import NotFound from "../pages/NotFound";

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
        {/* Root Route */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/welcome"}
              replace
            />
          }
        />

        {/* Public Routes - Only accessible when NOT authenticated */}
        <Route
          path="/welcome"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <WelcomeScreen />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login setAuth={setIsAuthenticated} />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/otp-verification"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <VerifyOtp />
            </PublicRoute>
          }
        />

        <Route
          path="/set-new-password"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SetNewPassword />
            </PublicRoute>
          }
        />

        {/* Protected Routes - Only accessible when authenticated */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance-overview"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AttendanceOverview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invite-form"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <InviteForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upcoming-meetings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpcomingMeetings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/previous-meetings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PreviousMeetings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AttendanceTracker />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;