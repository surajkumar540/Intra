import React from "react";
import StatCard from "./StatCard";
import CalendarComponent from "../../../components/Calendar/CalendarComponent";

const OverviewSection = ({
  dashboardData,
  selectedDate,
  onDateSelect,
  showCalendar,
  onToggleCalendar,
  onStatClick,
}) => {
  return (
    <div className="pt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] leading-none font-medium font-poppins text-gray-800">
          Overview
        </h2>

        <CalendarComponent
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          showCalendar={showCalendar}
          onToggleCalendar={onToggleCalendar}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6">
        <StatCard
          label="Present"
          value={dashboardData.present}
          onClick={() => onStatClick("present")}
          variant="primary"
        />

        <StatCard
          label="Absent"
          value={dashboardData.absent}
          onClick={() => onStatClick("absent")}
          variant="secondary"
        />

        <StatCard
          label="Leave"
          value={dashboardData.leave}
          onClick={() => onStatClick("leave")}
          variant="secondary"
        />

        <StatCard
          label="Total"
          value={dashboardData.total}
          onClick={() => onStatClick("total")}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default OverviewSection;
