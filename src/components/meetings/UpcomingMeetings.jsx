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
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../common/NavbarHeader"; // Import the reusable navbar
import entraLogo from "../../assets/offical/entraLogo.png";

export default function UpcomingMeetings() {
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
        <div
          className="sticky top-0 z-50"
          style={{ backgroundColor: "#FE697D" }}
        >
          <NavbarHeader
            text="Meetings"
            showArrow={true}
            onArrowClick={() => navigate("/dashboard")}
            icons={[
              {
                icon: CircleUser,
                onClick: () => console.log("User profile clicked"),
                label: "Share attendance",
              },
              {
                icon: Settings,
                onClick: () => console.log("Settings clicked"),
                label: "Settings",
              },
            ]}
            textColor="text-white"
            className="px-4 py-6"
            style={{ height: "auto" }} // Override the default height
          />
        </div>


        {/* Search Bar */}
        <div className="space-y-4 mt-6">
          <div>
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
                              ${day
                                ? "hover:bg-gray-100 cursor-pointer"
                                : "cursor-default"
                              }
                              ${isSelectedDate(day)
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
          </div>


          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              className={`
      w-full h-[41px] pl-10 pr-[20px] py-[10px] border rounded-[14px] 
      focus:outline-none text-sm transition-all duration-200 font-poppins 
      font-medium text-[14px] leading-[100%] tracking-[0%] 
      placeholder:font-poppins placeholder:font-medium 
      placeholder:text-[14px] placeholder:leading-[100%] 
      placeholder:tracking-[0%] border-gray-200 focus:border-pink-400
    `}
              placeholder="Name / Roll no"
            />
          </div>
        </div>

        {/* Calendar Overlay */}
        {/* {showCalendar && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowCalendar(false)}
          />
        )} */}
      </div>
    </div>
  );
}