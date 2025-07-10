import { Download, Share2 } from "lucide-react";
import { useState } from "react";
import { RiSearchLine, RiAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader";
import CalendarComponent from "../../components/Calendar/CalendarComponent";
import CancelMeetingPopup from "../../components/Modals/CancelMeetingPopup";

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

  // Cancel meeting handlers
  const handleCancelClick = (meetingIndex) => {
    setMeetingToCancel(meetingIndex);
    setShowCancelPopup(true);
  };

  const handleCancelConfirm = () => {
    // Remove the meeting from the list
    setMeetings((prev) => prev.filter((_, index) => index !== meetingToCancel));
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
        <div
          className="sticky top-0 z-10"
          style={{ backgroundColor: "#FE697D" }}
        >
          <NavbarHeader
            text="Upcoming Meetings"
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
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
          <h1 className="text-lg font-semibold text-gray-900">
            Upcoming Meetings
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
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RiSearchLine className="text-gray-400 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Name/Roll No."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Meeting Cards */}
        <div className="px-4 pb-24 space-y-4">
          {filteredMeetings.map((meeting, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 "
              style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            >
              <h3 className="text-primary font-medium mb-3">{meeting.title}</h3>
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
              {meeting.type === "group" && (
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-2 px-4 bg-green-50 text-green-600 rounded-[8px] text-sm font-medium border border-green-200 hover:bg-green-100"
                    onClick={() => navigate("/invite-form")}
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancelClick(index)}
                    className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-[8px] text-sm font-medium border border-red-200 hover:bg-red-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
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
