// 2. AppointmentsSection.jsx - Appointments section component
import React from "react";
import { ClockFading, Plus } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

const AppointmentsSection = ({
  upcomingMeetings,
  previousMeetings,
  onUpcomingClick,
  onPreviousClick,
  onCreateInvite,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Appointments</h2>

      <div className="flex flex-row justify-center gap-4 w-full z-20">
        <AppointmentCard
          icon={ClockFading}
          title="Upcoming Meetings"
          count={upcomingMeetings}
          onClick={onUpcomingClick}
          variant="primary"
        />

        <AppointmentCard
          icon={ClockFading}
          title="Previous Meetings"
          count={previousMeetings}
          onClick={onPreviousClick}
          variant="secondary"
        />
      </div>

      <button
        onClick={onCreateInvite}
        className="w-full text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary"
      >
        <span>Create Invite</span>
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AppointmentsSection;
