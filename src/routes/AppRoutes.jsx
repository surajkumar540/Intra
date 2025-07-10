import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Login from "../features/Auth/Login";
import WelcomeScreen from "../features/Onboarding/WelcomeScreen";
import ForgotPassword from "../features/Auth/ForgotPassword";
import VerifyOtp from "../features/Auth/VerifyOTP";
import SetNewPassword from "../features/Auth/SetNewPassword";
import Dashboard from "../features/Dashboard/Dashboard";
import AttendanceOverview from "../pages/dashboard/AttendanceOverview";
import InviteForm from "../features/Meetings/InviteForm";
import PreviousMeetings from "../features/Meetings/PreviousMeetings";
import UpcomingMeetings from "../features/Meetings/UpcomingMeetings";
import AttendanceTracker from "../features/Reports/AttendanceTracker";

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
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/welcome"}
              replace
            />
          }
        />

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
          path="/otp-verification"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <VerifyOtp />
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

        <Route
          path="/set-new-password"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SetNewPassword />
            )
          }
        />

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

        <Route
          path="/invite-form"
          element={
            isAuthenticated ? <InviteForm /> : <Navigate to="/login" replace />
          }
        />

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

        <Route
          path="/previous-meetings"
          element={
            isAuthenticated ? (
              <PreviousMeetings />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/report"
          element={
            isAuthenticated ? (
              <AttendanceTracker />
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
