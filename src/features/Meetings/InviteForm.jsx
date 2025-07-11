import { useState } from "react";
import { Share2, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader";
import SuccessModal from "../../components/Modals/SuccessModal  "
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

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    setFormData({
      studentRollNo: "",
      studentName: "",
      hostName: "",
      date: "",
    });
    setErrors({});
    setShowSuccessPopup(false);
    setShowCalendar(false);
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

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === "Single") {
      if (!formData.studentRollNo?.trim())
        newErrors.studentRollNo = "Student Roll No is required";
      if (!formData.studentName?.trim())
        newErrors.studentName = "Student Name is required";
      if (!formData.hostName?.trim())
        newErrors.hostName = "Host Name is required";
      if (!formData.date?.trim()) newErrors.date = "Date is required";
      if (!formData.meetingAgenda?.trim())
        newErrors.meetingAgenda = "Meeting Agenda is required";
      if (!formData.meetingRoom?.trim())
        newErrors.meetingRoom = "Meeting Room is required";
    } else if (activeTab === "PTM") {
      // Replace with PTM-specific validations
      if (!formData.className?.trim())
        newErrors.className = "Class is required";
      if (!formData.section?.trim()) newErrors.section = "Section is required";
      if (!formData.teacherName?.trim())
        newErrors.teacherName = "Teacher Name is required";
      if (!formData.date?.trim()) newErrors.date = "Date is required";
      if (!formData.meetingRoom?.trim())
        newErrors.meetingRoom = "Meeting Room is required";
      if (!formData.studentRollNo?.trim())
        newErrors.studentRollNo = "Student Roll No is required";
      if (!formData.studentName?.trim())
        newErrors.studentName = "Student Name is required";
      if (!formData.hostName?.trim())
        newErrors.hostName = "Host Name is required";
      if (!formData.date?.trim()) newErrors.date = "Date is required";
      if (!formData.meetingAgenda?.trim())
        newErrors.meetingAgenda = "Meeting Agenda is required";
      if (!formData.meetingRoom?.trim())
        newErrors.meetingRoom = "Meeting Room is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateInvite = () => {
    console.log("formData", formData);
    if (validateForm()) {
      setShowSuccessPopup(true);
    } else {
      console.log("errors", errors);
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
    a.download = `meeting-invite-${formData.studentRollNo || "draft"}-${
      new Date().toISOString().split("T")[0]
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
        

        <div className="p-4 space-y-6 mx-auto">
          {/* Tab Selection */}
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={() => handleActiveTab("Single")}
              className={`w-full h-[44px] p-[10px] rounded-[40px] text-sm font-medium transition-all duration-200 flex items-center justify-center gap-[10px] font-poppins ${
                activeTab === "Single"
                  ? "text-primary border border-primary bg-[#FE697D1A]"
                  : "text-black/70 border border-black/50 hover:bg-[#FE697D1A]"
              }`}
            >
              Single
            </button>

            <button
              onClick={() => handleActiveTab("PTM")}
              className={`w-full h-[44px] p-[10px] rounded-[40px] text-sm font-medium transition-all duration-200 flex items-center justify-center gap-[10px] font-poppins ${
                activeTab === "PTM"
                  ? "text-primary border bg-[#FE697D1A] border-primary"
                  : "text-black/70 border border-black/50 hover:bg-[#FE697D1A]"
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
              Create Invites
            </button>
          </div>
        </div>

        <SuccessModal
          isOpen={showSuccessPopup}
          onClose={() => {
            setShowSuccessPopup(false);
            resetForm();
          }}
          title="Success!"
          message={
            activeTab === "Single"
              ? "The meeting has been scheduled successfully"
              : "PTM has been scheduled successfully"
          }
          primaryColor={primaryColor}
        />
      </div>
    </div>
  );
}
