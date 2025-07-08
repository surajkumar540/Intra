import { useState } from "react";
import {
  ChevronLeft,
  Share2,
  Download,
  Calendar,
  ChevronDown,
  Clock,
  MapPin,
  User,
  Users,
  ChevronRight,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../common/NavbarHeader";
import TimePicker from "../../common/TimePicker";
import SuccessModal from "../../modals/SuccessModal";
import SingleInviteForm from "./SingleInviteForm";
import PTMInviteForm from "./PTMInviteForm";

export default function InviteForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Single");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    studentRollNo: "",
    studentName: "",
    hostName: "",
    date: "",
    day: "",
    meetingAgenda: "",
    meetingRoom: "",
    // Remove the individual time fields since TimePicker handles them
    startTime: { hour: 10, minute: 0, period: "AM" },
    endTime: { hour: 10, minute: 30, period: "AM" },
  });

  const [errors, setErrors] = useState({});
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const primaryColor = "#FE697D";
  const studentRollNumbers = [
    "2024001",
    "2024002",
    "2024003",
    "2024004",
    "2024005",
    "2024006",
    "2024007",
    "2024008",
  ];
  const meetingRooms = [
    "Conference Room A",
    "Conference Room B",
    "Meeting Room 1",
    "Meeting Room 2",
    "Virtual Room",
    "Board Room",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Auto-populate day when date is selected
    if (field === "date" && value) {
      const selectedDate = new Date(value);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = days[selectedDate.getDay()];
      setFormData((prev) => ({
        ...prev,
        day: dayName,
      }));
    }
  };

  // Handle time changes from TimePicker
  const handleTimeChange = (timeData) => {
    setFormData((prev) => ({
      ...prev,
      startTime: timeData.startTime,
      endTime: timeData.endTime,
    }));

    // Clear any existing time errors
    if (errors.endTime) {
      setErrors((prev) => ({
        ...prev,
        endTime: "",
      }));
    }
  };

  // Calendar helper functions
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
      const selectedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleInputChange("date", formattedDate);
      setShowCalendar(false);
    }
  };

  const isSelectedDate = (day) => {
    if (!day || !formData.date) return false;
    const selectedDate = new Date(formData.date);
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentRollNo.trim())
      newErrors.studentRollNo = "Student Roll No is required";
    if (!formData.studentName.trim())
      newErrors.studentName = "Student Name is required";
    if (!formData.hostName.trim()) newErrors.hostName = "Host Name is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.meetingAgenda.trim())
      newErrors.meetingAgenda = "Meeting Agenda is required";
    if (!formData.meetingRoom.trim())
      newErrors.meetingRoom = "Meeting Room is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateInvite = () => {
    if (validateForm()) {
      setShowSuccessPopup(true);
    }
  };

  const formatTimeForDisplay = (timeObj) => {
    if (!timeObj) return "";
    return `${timeObj.hour.toString().padStart(2, "0")}:${timeObj.minute
      .toString()
      .padStart(2, "0")} ${timeObj.period}`;
  };

  const handleShare = async () => {
    const inviteText = `📅 Meeting Invite
👨‍🎓 Student: ${formData.studentName} (${formData.studentRollNo})
👤 Host: ${formData.hostName}
📅 Date: ${formData.date} (${formData.day})
🕐 Time: ${formatTimeForDisplay(formData.startTime)} - ${formatTimeForDisplay(
      formData.endTime
    )}
📋 Agenda: ${formData.meetingAgenda}
🏢 Room: ${formData.meetingRoom}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Meeting Invite",
          text: inviteText,
        });
      } else {
        await navigator.clipboard.writeText(inviteText);
        alert("✅ Invite details copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      alert("❌ Unable to share. Please try again.");
    }
  };

  const handleDownload = () => {
    const inviteData = `MEETING INVITE
==================

Student Roll No: ${formData.studentRollNo}
Student Name: ${formData.studentName}
Host Name: ${formData.hostName}
Date: ${formData.date}
Day: ${formData.day}
Meeting Agenda: ${formData.meetingAgenda}
Meeting Room: ${formData.meetingRoom}
Start Time: ${formatTimeForDisplay(formData.startTime)}
End Time: ${formatTimeForDisplay(formData.endTime)}
Type: ${activeTab}

Generated on: ${new Date().toLocaleString()}

==================
Meeting Management System`;

    const blob = new Blob([inviteData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meeting-invite-${formData.studentRollNo || "draft"}-${new Date().toISOString().split("T")[0]
      }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      studentRollNo: "",
      studentName: "",
      hostName: "",
      date: "",
      day: "",
      meetingAgenda: "",
      meetingRoom: "",
      startTime: { hour: 10, minute: 0, period: "AM" },
      endTime: { hour: 10, minute: 30, period: "AM" },
    });
    setErrors({});
    setShowSuccessPopup(false);
  };


  const handleSubmit = () => {
    console.log("formData", formData);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        {/* Header */}
        <div
          className="sticky top-0 z-10"
          style={{ backgroundColor: "#FE697D" }}
        >
          <NavbarHeader
            text="Invite"
            showArrow={true}
            onArrowClick={() => navigate("/dashboard")}
            icons={[
              {
                icon: Share2,
                onClick: handleShare,
                label: "Share attendance",
              },
              {
                icon: Download,
                onClick: handleDownload,
                label: "Download",
              },
            ]}
            textColor="text-white"
            className="px-4  py-8"
            style={{ height: "auto" }}
          />
        </div>

        <div className="p-4 space-y-6 mx-auto">
          {/* Tab Selection */}
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={() => setActiveTab("Single")}
              className={`h-[44px] w-full p-[10px] rounded-[40px] text-sm font-medium  flex items-center justify-center gap-[10px] font-poppins opacity-100 ${activeTab === "Single"
                ? "text-primary border-2 bg-primary/10 border-[#FE697D1A]"
                : "text-black/70 border border-black/50 hover:bg-[#FE697D1A]  "
                }`}
            >
              Single
            </button>

            <button
              onClick={() => setActiveTab("PTM")}
              className={`w-full h-[44px] p-[10px] rounded-[40px] text-sm font-medium transition-all duration-200 flex items-center justify-center gap-[10px] font-poppins ${activeTab === "PTM"
                ? "text-primary border-2 bg-primary/10 border-[#FE697D1A]"
                : "text-black/70 border border-black/50 hover:bg-[#FE697D1A]  "
                }`}
            >
              PTM
            </button>
          </div>

          {activeTab === "Single" ? (
            <SingleInviteForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              onSubmit={handleSubmit}
              primaryColor="#FE697D"
              handleTimeChange={handleTimeChange}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              showStudentDropdown={showStudentDropdown}
              setShowStudentDropdown={setShowStudentDropdown}
              showRoomDropdown={showRoomDropdown}
              setShowRoomDropdown={setShowRoomDropdown}
            />
          ) : (
            <PTMInviteForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              onSubmit={handleSubmit}
              primaryColor="#FE697D"
              handleTimeChange={handleTimeChange}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              showStudentDropdown={showStudentDropdown}
              setShowStudentDropdown={setShowStudentDropdown}
              showRoomDropdown={showRoomDropdown}
              setShowRoomDropdown={setShowRoomDropdown}
            />
          )}

          <div className="flex flex-col justify-center items-center">
            {/* Create Invite Button */}
            <button
              type="button"
              onClick={handleCreateInvite}
              className="w-[345px] h-[50px] rounded-[16px] px-[10px] py-[10px] text-white font-semibold text-lg mt-8 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              Create Invite
            </button>
          </div>

        </div>


        <SuccessModal
          isOpen={showSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          title="Success!"
          message={activeTab === "Single" ? "The meeting has been scheduled successfully" : "PTM has been scheduled successfully"}
          primaryColor={primaryColor}
        />
      </div>
    </div>
  );
}