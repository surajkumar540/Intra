import { Download, Search, Share2 } from "lucide-react";
import { useState } from "react";
import { RiSearchLine, RiAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader";
import CalendarComponent from "../../components/Calendar/CalendarComponent";
import CancelMeetingPopup from "../../components/Modals/CancelMeetingPopup";
import SearchInput from "../../components/UI/SearchInput";

const meetingsData = [
  {
    title: "PTM Invite",
    details: [
      ["Student Roll No", "01 to 10"],
      ["Class/Section Name", "2A"],
      ["Date", "12/03/24"],
      ["Day", "Monday"],
      ["Meeting Time", "10:00 AM to 11:00 AM"],
      ["Meeting Agenda", "PTM"],
    ],
    type: "group",
    status: "upcoming", // upcoming, visited, canceled, rescheduled
  },
  {
    title: "Single Invite",
    details: [
      ["Student Roll No", "01"],
      ["Student Name", "Aryan"],
      ["Class/Section Name", "2A"],
      ["Date", "12/03/24"],
      ["Day", "Monday"],
      ["Meeting Time", "10:30 AM to 11:30 AM"],
      ["Meeting Agenda", "Individual Discussion"],
    ],
    type: "single",
    status: "visited",
  },
  {
    title: "PTM Invite",
    details: [
      ["Student Roll No", "11 to 20"],
      ["Class/Section Name", "2B"],
      ["Date", "13/03/24"],
      ["Day", "Tuesday"],
      ["Meeting Time", "11:00 AM to 12:00 PM"],
      ["Meeting Agenda", "Parent Feedback"],
    ],
    type: "group",
    status: "canceled",
  },
  {
    title: "Single Invite",
    details: [
      ["Student Roll No", "02"],
      ["Student Name", "Riya"],
      ["Class/Section Name", "1B"],
      ["Date", "13/03/24"],
      ["Day", "Tuesday"],
      ["Meeting Time", "2:00 PM to 3:00 PM"],
      ["Meeting Agenda", "Academic Progress"],
    ],
    type: "single",
    status: "rescheduled",
  },
  {
    title: "PTM Invite",
    details: [
      ["Student Roll No", "21 to 30"],
      ["Class/Section Name", "3A"],
      ["Date", "14/03/24"],
      ["Day", "Wednesday"],
      ["Meeting Time", "9:00 AM to 10:30 AM"],
      ["Meeting Agenda", "Progress Review"],
    ],
    type: "group",
    status: "upcoming",
  },
  {
    title: "Single Invite",
    details: [
      ["Student Roll No", "05"],
      ["Student Name", "Kabir"],
      ["Class/Section Name", "3C"],
      ["Date", "14/03/24"],
      ["Day", "Wednesday"],
      ["Meeting Time", "1:00 PM to 2:00 PM"],
      ["Meeting Agenda", "Behavioral Discussion"],
    ],
    type: "single",
    status: "visited",
  },
];

export default function MeetingsDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [meetingToCancel, setMeetingToCancel] = useState(null);
  const [meetings, setMeetings] = useState(meetingsData);

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: {
        text: "Upcoming",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
      },
      visited: {
        text: "Visited",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
      },
      canceled: {
        text: "Canceled",
        bgColor: "bg-red-50",
        textColor: "text-red-600",
        borderColor: "border-red-200",
      },
      rescheduled: {
        text: "Rescheduled",
        bgColor: "bg-orange-50",
        textColor: "text-orange-600",
        borderColor: "border-orange-200",
      },
    };

    const config = statusConfig[status] || statusConfig.upcoming;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
      >
        {config.text}
      </span>
    );
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const content = meeting.details
      .map(([, v]) => v)
      .join(" ")
      .toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  // Calendar handlers
  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    setShowCalendar(false);
  };

  const handleToggleCalendar = (show) => {
    if (typeof show === "boolean") {
      setShowCalendar(show);
    } else {
      setShowCalendar(!showCalendar);
    }
  };

  const handleCancelConfirm = () => {
    // Update the meeting status to canceled instead of removing it
    setMeetings((prev) =>
      prev.map((meeting, index) =>
        index === meetingToCancel ? { ...meeting, status: "canceled" } : meeting
      )
    );
    setShowCancelPopup(false);
    setShowSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowCancelPopup(false);
    setShowSuccessPopup(false);
    setMeetingToCancel(null);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        <NavbarHeader
          text="Previous Meetings"
          showArrow={true}
          onArrowClick={() => navigate("/dashboard")}
          icons={[
            {
              icon: Share2,
              onClick: () => console.log("Share clicked"),
              label: "Share attendance",
            },
            {
              icon: Download,
              onClick: () => console.log("Download clicked"),
              label: "Download",
            },
          ]}
          textColor="text-white"
          className="px-4  py-8"
          style={{ height: "auto" }} // Override the default height
        />

        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
          <h1 className="text-lg font-semibold text-gray-900">
            Previous Meetings
          </h1>
          {/* Reusable Calendar Component */}
          <CalendarComponent
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            showCalendar={showCalendar}
            onToggleCalendar={handleToggleCalendar}
          />
        </div>

        {/* Search Bar */}
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Name/Roll No."
          icon={<Search className="text-gray-400 w-4 h-4" />}
          inputClassName="focus:ring-primary/20" // This overrides the default blue ring
        />

        {/* Meeting Cards */}
        <div className="px-4 pb-24 space-y-4">
          {filteredMeetings.map((meeting, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 "
              style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            >
              {/* Header with title and status badge */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-primary font-medium">{meeting.title}</h3>
                {getStatusBadge(meeting.status)}
              </div>

              <div className="space-y-2 mb-4">
                {meeting.details.map(([label, value], idx) => (
                  <div className="flex justify-between" key={idx}>
                    <span className="text-gray-500 text-sm">{label} :</span>
                    <span className="text-gray-900 text-sm font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Create Invite Button */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 bg-white border-t border-gray-100">
          <button className="w-full bg-primary hover:bg-secondary text-white py-3 px-6 rounded-[8px] font-medium flex items-center justify-center gap-2 shadow-lg">
            <span>Create Invite</span>
            <RiAddLine className="text-lg" />
          </button>
        </div>

        {/* Cancel Meeting Popup */}
        <CancelMeetingPopup
          isOpen={showCancelPopup || showSuccessPopup}
          onClose={handlePopupClose}
          onConfirm={handleCancelConfirm}
          showSuccess={showSuccessPopup}
        />
      </div>
    </div>
  );
}
