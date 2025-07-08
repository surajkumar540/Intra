// Updated MainDashboard.jsx with dynamic redirects
import React, { useState } from "react";
import {
  Calendar,
  ClockFading,
  CircleUser,
  Plus,
  ChevronRight,
  ChevronLeft,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../common/NavbarHeader"; // Import the reusable navbar
import entraLogo from "../../assets/offical/entraLogo.png";

export default function MainDashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 15));

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

  // Calendar functions (keeping your existing logic)
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const handleDateSelect = (day) => {
    if (day) {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const selectedDateString = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      setSelectedDate(selectedDateString);
      setShowCalendar(false);
      updateDashboardData(selectedDateString);
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getMonthYearDisplay = () => {
    return currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const isSelectedDate = (day) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return dateString === selectedDate;
  };

  const handleCreateInvite = () => {
    navigate("/invite-form");
  };

  const handleViewDetailedReport = () => {
    navigate("/attendance-overview");
  };

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

        {/* Main Content - keeping your existing content */}
        <div className="px-4 pt-4 flex flex-col justify-center items-center">
          {/* Appointments Section */}
          <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Appointments
            </h2>
            <div className="flex flex-row justify-center gap-4 w-full z-20">
              {/* Upcoming Meetings */}
              <div
                className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-all font-semibold text-sm relative overflow-hidden w-full sm:min-w-[165px] sm:max-w-[165px] min-h-[171px]"
                style={{
                  background:
                    "linear-gradient(0deg, #000000, #000000), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                  opacity: 1,
                }}
                onClick={() => handleRedirect("upcoming")}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 opacity-100"></div>
                <div className="relative  flex flex-col gap-2 h-full">
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
                className="rounded-xl p-4 cursor-pointer hover:bg-gray-200 transition-colors w-full sm:min-w-[165px] sm:max-w-[165px] min-h-[171px]"
                style={{
                  background: "rgba(233, 233, 233, 1)",
                  opacity: 1,
                }}
                onClick={() => handleRedirect("previous")}
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

              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center border shadow-[1px_1px_8px_0px_#0000001A]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(254, 105, 125, 0.08), rgba(254, 105, 125, 0.08))",
                      border: "1px solid rgba(254, 105, 125, 0.1)",
                      opacity: 1,
                    }}
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Calendar Dropdown */}
                {showCalendar && (
                  <div className="absolute top-full right-0 mt-2 bg-white border-2 rounded-lg shadow-lg z-20 w-80">
                    <div className="flex items-center justify-between p-4 border-b">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <h3 className="text-lg font-medium text-gray-800">
                        {getMonthYearDisplay()}
                      </h3>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-xs font-medium text-gray-500 py-2"
                            >
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentMonth).map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day)}
                            disabled={!day}
                            className={`
                              h-8 w-8 text-sm rounded-full flex items-center justify-center
                              ${
                                day
                                  ? "hover:bg-gray-100 cursor-pointer"
                                  : "cursor-default"
                              }
                              ${
                                isSelectedDate(day)
                                  ? "text-white font-medium"
                                  : "text-gray-700"
                              }
                            `}
                            style={{
                              backgroundColor: isSelectedDate(day)
                                ? "#FE697D"
                                : "transparent",
                            }}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid - Now with dynamic redirects */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div
                className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-all relative overflow-hidden"
                style={{
                  width: "165px",
                  height: "76px",
                  background:
                    "linear-gradient(0deg, #000000, #000000), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                  opacity: 1,
                }}
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
                className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-all relative overflow-hidden"
                style={{
                  width: "165px",
                  height: "76px",
                  background:
                    "linear-gradient(0deg, #000000, #000000), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                  opacity: 1,
                }}
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

          {/* Attendance Section */}
          <div className="pt-4 w-full">
            <div className="bg-gray-50 rounded-2xl p-6 w-full">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-semibold text-gray-800 font-poppins">
                  Attendance
                </h2>
              </div>

              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-32 h-32 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8ACC7D"
                      strokeWidth="4"
                      strokeDasharray={`${dashboardData.attendancePercentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800 font-poppins">
                      {dashboardData.attendancePercentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 font-poppins">
                    Present Days
                  </p>
                  <p className="text-xl font-bold text-gray-800 font-poppins">
                    {dashboardData.presentDays}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-poppins">
                    Total Days
                  </p>
                  <p className="text-xl font-bold text-gray-800 font-poppins">
                    {dashboardData.totalDays}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Overlay */}
        {showCalendar && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowCalendar(false)}
          />
        )}
      </div>
    </div>
  );
}