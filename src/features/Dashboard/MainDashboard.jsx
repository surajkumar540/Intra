// Updated MainDashboard.jsx with reusable calendar component
import React, { useState } from "react";
import { ClockFading, CircleUser, Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader"; // Import the reusable navbar
import CalendarComponent from "../../components/Calendar/CalendarComponent";
import AttendanceInterface from "../../pages/dashboard/AttendanceInterface";
import entraLogo from "../../assets/offical/entraLogo.png";
import ChartComponent from "../../components/Charts/Chart";

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
    // navigate("/profile");
    // or show user menu
    console.log("User profile clicked");
  };

  const handleSettingsClick = () => {
    // navigate("/settings");
    // or show settings menu
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

  const handleCreateInvite = () => {
    navigate("/invite-form");
  };

  // const handleViewDetailedReport = () => {
  //   navigate("/attendance-overview");
  // };

  // Dynamic redirect function based on status
  const handleRedirect = (status) => {
    navigate(`/attendance-overview?filter=${status}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        {/* Replace the old header with the reusable NavbarHeader */}
        <div
          className="sticky top-0 z-50"
          style={{ backgroundColor: "#FE697D" }}
        >
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
            style={{ height: "auto" }} // Override the default height
          />
        </div>

        {/* Main Content */}
        <div className="px-4 pt-4 flex flex-col justify-center items-center bg-">
          {/* Appointments Section */}
          <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Appointments
            </h2>
            <div className="flex flex-row justify-center gap-4 w-full z-20">
              {/* Upcoming Meetings */}
              <div
                className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-all font-semibold text-sm relative overflow-hidden w-full sm:min-w-[165px] sm:max-w-[165px] min-h-[171px] bg-dual-gradient"
                onClick={() => navigate("/upcoming-meetings")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 opacity-100"></div>
                <div className="relative flex flex-col gap-2 h-full">
                  <div className="flex items-center justify-between">
                    <ClockFading className="w-6 h-6 transform scale-x-[-1]" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[16px] font-medium font-poppins text-[#F0F0F0]">
                      Upcoming <br /> Meetings
                    </p>
                    <p className="text-[34px] leading-none font-semibold font-poppins">
                      {dashboardData.upcomingMeetings}
                    </p>
                  </div>
                </div>
              </div>

              {/* Previous Meetings */}
              <div
                className="rounded-xl p-4 cursor-pointer hover:bg-gray-200 transition-colors w-full sm:min-w-[165px] sm:max-w-[165px] min-h-[171px] bg-[#E9E9E9]"
                style={{
                  opacity: 1,
                }}
                onClick={() => navigate("/previous-meetings")}
              >
                <div className="flex items-center justify-between mb-2">
                  <ClockFading className="w-6 h-6 text-gray-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[16px] leading-5 font-medium font-poppins text-[#333333]">
                    Previous <br />
                    Meetings
                  </p>
                  <p className="text-[34px] leading-none pt-1 font-semibold font-poppins text-[#000000]">
                    {dashboardData.previousMeetings}
                  </p>
                </div>
              </div>
            </div>

            {/* Create Invite Button */}
            <button
              onClick={handleCreateInvite}
              className="w-full text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary"
            >
              <span>Create Invite</span>
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Overview Section */}
          <div className="pt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[24px] leading-none font-medium font-poppins text-gray-800">
                Overview
              </h2>

              {/* Reusable Calendar Component */}
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                showCalendar={showCalendar}
                onToggleCalendar={handleToggleCalendar}
              />
            </div>

            {/* Stats Grid - Now with dynamic redirects */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div
                className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-all relative overflow-hidden bg-dual-gradient"
                onClick={() => handleRedirect("present")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 "></div>
                <div className="relative z-2 h-full">
                  <div className="flex items-center justify-between h-full text-sm text-gray-200">
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      Present
                    </p>
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      {dashboardData.present}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 cursor-pointer hover:bg-gray-300 transition-all relative overflow-hidden"
                style={{
                  width: "165px",
                  height: "76px",
                  background:
                    "linear-gradient(0deg, #E8E8E8, #E8E8E8), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                  opacity: 1,
                }}
                onClick={() => handleRedirect("absent")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>
                <div className="relative z-2 h-full">
                  <div className="flex items-center justify-between h-full text-sm text-gray-800 font-poppins">
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      Absent
                    </p>
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      {dashboardData.absent}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 cursor-pointer hover:bg-gray-300 transition-all relative overflow-hidden"
                style={{
                  width: "165px",
                  height: "76px",
                  background:
                    "linear-gradient(0deg, #E8E8E8, #E8E8E8), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                  opacity: 1,
                }}
                onClick={() => handleRedirect("leave")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>
                <div className="relative z-2 h-full">
                  <div className="flex items-center justify-between h-full text-sm text-gray-800 font-poppins">
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      Leave
                    </p>
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      {dashboardData.leave}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-all relative overflow-hidden bg-dual-gradient"
                onClick={() => handleRedirect("total")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20"></div>
                <div className="relative z-2 h-full">
                  <div className="flex items-center justify-between h-full text-sm text-gray-300 font-poppins">
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      Total
                    </p>
                    <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
                      {dashboardData.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="pt-4 w-full">
          <div className="w-full">
            <div className="bg-gray-50 rounded-2xl p-6 w-full">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-semibold text-gray-800 font-poppins">
                  Attendance
                </h2>
              </div>

              <ChartComponent />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center pt-2">
              <div>
                <p className="text-sm text-gray-600 font-poppins">
                  Present Days
                </p>
                <p className="text-xl font-bold text-gray-800 font-poppins">
                  {dashboardData.presentDays}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Total Days</p>
                <p className="text-xl font-bold text-gray-800 font-poppins">
                  {dashboardData.totalDays}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/attendance-overview?filter=total")}
              className="w-full text-white py-3 rounded-2xl font-medium mt-4 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary"
            >
              <span>View Students</span>
            </button>
          </div>
        </div>
        <AttendanceInterface />
      </div>
    </div>
  );
}
