import React, { useState } from "react";
import { CircleUser, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader";
import AppointmentsSection from "./components/AppointmentsSection";
import OverviewSection from "./components/OverviewSection";
import AttendanceSection from "./components/AttendanceSection";
import AttendanceInterface from "../../pages/dashboard/AttendanceInterface";
import entraLogo from "../../assets/offical/entraLogo.png";

export default function MainDashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock data for dynamic content
  const [dashboardData, setDashboardData] = useState({
    upcomingMeetings: 4,
    previousMeetings: 4,
    present: 36,
    absent: 4,
    leave: 1,
    total: 41,
    attendancePercentage: 90,
    presentDays: 36,
    totalDays: 40,
  });

  // Navbar event handlers
  const handleUserClick = () => {
    console.log("User profile clicked");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const updateDashboardData = () => {
    const randomPresent = Math.floor(Math.random() * 10) + 32;
    const randomAbsent = Math.floor(Math.random() * 5) + 2;
    const randomLeave = Math.floor(Math.random() * 3) + 1;
    const total = randomPresent + randomAbsent + randomLeave;
    const percentage = Math.round((randomPresent / total) * 100);

    setDashboardData((prev) => ({
      ...prev,
      present: randomPresent,
      absent: randomAbsent,
      leave: randomLeave,
      total: total,
      attendancePercentage: percentage,
      presentDays: randomPresent,
    }));
  };

  // Calendar handlers
  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    setShowCalendar(false);
    updateDashboardData();
  };

  const handleToggleCalendar = (show) => {
    if (typeof show === "boolean") {
      setShowCalendar(show);
    } else {
      setShowCalendar(!showCalendar);
    }
  };

  // Navigation handlers
  const handleCreateInvite = () => {
    navigate("/invite-form");
  };

  const handleRedirect = (status) => {
    navigate(`/attendance-overview?filter=${status}`);
  };

  const handleViewStudents = () => {
    navigate("/attendance-overview?filter=total");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        <NavbarHeader
          text=""
          showArrow={false}
          onArrowClick={() => navigate("/dashboard")}
          icons={[
            {
              icon: CircleUser,
              onClick: handleUserClick,
              label: "Share attendance",
            },
            {
              icon: Settings,
              onClick: handleSettingsClick,
              label: "Settings",
            },
          ]}
          logo={entraLogo}
          logoAlt="Entra Logo"
          textColor="text-white"
          className="px-4 py-6"
          style={{ height: "auto" }}
        />

        {/* Main Content */}
        <div className="px-4 pt-4 flex flex-col justify-center items-center bg-">
          <AppointmentsSection
            upcomingMeetings={dashboardData.upcomingMeetings}
            previousMeetings={dashboardData.previousMeetings}
            onUpcomingClick={() => navigate("/upcoming-meetings")}
            onPreviousClick={() => navigate("/previous-meetings")}
            onCreateInvite={handleCreateInvite}
          />

          <OverviewSection
            dashboardData={dashboardData}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            showCalendar={showCalendar}
            onToggleCalendar={handleToggleCalendar}
            onStatClick={handleRedirect}
          />
        </div>

        <AttendanceSection
          dashboardData={dashboardData}
          onViewStudents={handleViewStudents}
        />

        <AttendanceInterface />
      </div>
    </div>
  );
}
