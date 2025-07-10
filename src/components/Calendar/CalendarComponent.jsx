import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const CalendarComponent = ({
  selectedDate,
  onDateSelect,
  showCalendar,
  onToggleCalendar,
  triggerClassName = "",
  dropdownClassName = "",
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

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
      onDateSelect(selectedDateString);
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
    if (!day || !selectedDate) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return dateString === selectedDate;
  };

  return (
    <div className="relative">
      {/* Calendar Trigger */}
      <div
        className={`flex items-center gap-2 cursor-pointer ${triggerClassName}`}
        onClick={onToggleCalendar}
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
        <>
          <div
            className={`absolute top-full right-0 mt-2 bg-white border-2 rounded-lg shadow-lg z-20 w-80 ${dropdownClassName}`}
          >
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

          {/* Calendar Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => onToggleCalendar(false)}
          />
        </>
      )}
    </div>
  );
};
export default CalendarComponent;
