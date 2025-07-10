import {
  ChevronDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import TimePicker from "../../components/Inputs/TimePicker";
import DropdownInput from "../../components/UI/DropdownInput";

export default function SingleInviteForm({
  formData,
  setFormData,
  errors,
  setErrors,
  primaryColor = "#FE697D",
  handleTimeChange,
  showCalendar,
  setShowCalendar,
  currentMonth,
  setCurrentMonth,
  showStudentDropdown,
  setShowStudentDropdown,
  showRoomDropdown,
  setShowRoomDropdown,
}) {
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

  return (
    <div>
      {/* Invite Details */}
      <div className="space-y-4">
        <h2 className="text-gray-800 font-semibold text-lg">Invite Details</h2>

        <div>
          {/* Student Roll No */}
          <DropdownInput
            type="number"
            name="studentRollNo"
            label="Student Roll No."
            value={formData.studentRollNo}
            onChange={(e) => handleInputChange("studentRollNo", e.target.value)}
            dropdownData={studentRollNumbers}
            showDropdown={showStudentDropdown}
            setShowDropdown={setShowStudentDropdown}
            error={errors.studentRollNo}
            icon={<ChevronDown className="w-4 h-4 mt-1 text-gray-400" />}
            iconPosition="right"
            required={true}
            placeholder=" "
            inputClassName={`w-full h-[41px] px-[20px] py-[10px] rounded-[14px] focus:outline-none text-sm transition-all duration-200 border-2 ${
              errors.studentRollNo
                ? "border-primary focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
            labelClassName="absolute left-[20px] top-[35%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D]"
          />

          {/* Student Name with Dropdown */}
          <DropdownInput
            type="text"
            name="studentName"
            label="Student Name"
            value={formData.studentName}
            onChange={(e) => handleInputChange("studentName", e.target.value)}
            error={errors.studentName}
            required={true}
            placeholder=" "
            inputClassName={`w-full h-[41px] px-[20px] py-[10px] border-2 rounded-[14px] focus:outline-none text-sm transition-all duration-200 font-poppins text-[14px] leading-[100%] tracking-[0%] ${
              errors.studentName
                ? "border-primary focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
            labelClassName="absolute left-[20px] top-[20%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D] transition-all duration-200"
          />

          {/* Host Name */}
          <DropdownInput
            type="text"
            name="hostName"
            label="Host Name"
            value={formData.hostName}
            onChange={(e) => handleInputChange("hostName", e.target.value)}
            dropdownData={[]} // No dropdown data
            error={errors.hostName}
            required={true}
            placeholder=" "
            inputClassName={`w-full h-[41px] px-[20px] py-[10px] border-2 rounded-[14px] focus:outline-none text-sm transition-all duration-200 font-poppins text-[14px] leading-[100%] tracking-[0%] ${
              errors.hostName
                ? "border-primary focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
            labelClassName="absolute left-[20px] top-[20%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D]"
          />

          {/* Date and Day Row */}
          <div className="flex gap-3 w-full">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={
                    formData.date
                      ? new Date(formData.date).toLocaleDateString()
                      : ""
                  }
                  onClick={() => setShowCalendar(!showCalendar)}
                  readOnly
                  className={`w-full h-[41px] px-[20px] py-[10px] rounded-[14px] focus:outline-none text-sm transition-all duration-200 font-poppins text-[14px] border-2 leading-[100%] tracking-[0%] cursor-pointer ${
                    errors.date
                      ? "border-primary"
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                  placeholder=" "
                />
                {!formData.date && (
                  <label className="absolute left-[20px] top-[20%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D]">
                    Date<span className="pb-4 pt-1 pl-1 text-red-500">*</span>
                  </label>
                )}
                <Calendar className="absolute right-3 top-[20%] w-4 h-4 text-gray-400 pointer-events-none" />

                <div className="min-h-[20px] mt-1">
                  {errors.date && (
                    <p className="pb-4 pt-1 pl-1 text-red-500 text-xs animate-in fade-in duration-200">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Custom Calendar */}
                {showCalendar && (
                  <div className="absolute top-full right-0 left-0 mt-2 bg-white border-2 rounded-xl shadow-xl z-20 w-80">
                    <div className="flex items-center justify-between p-4 border-b">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {getMonthYearDisplay()}
                      </h3>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                            className={`h-9 w-9 text-sm rounded-lg flex items-center justify-center transition-all duration-200 ${
                              day
                                ? "hover:bg-gray-100 cursor-pointer"
                                : "cursor-default"
                            } ${
                              isSelectedDate(day)
                                ? "text-white font-semibold shadow-lg transform scale-110"
                                : "text-gray-700"
                            }`}
                            style={{
                              backgroundColor: isSelectedDate(day)
                                ? primaryColor
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

            <div className="flex-1">
              <DropdownInput
                type="text"
                name="day"
                label="Day"
                value={formData.day}
                onChange={() => {}} // Read-only
                dropdownData={[]} // No dropdown
                error=""
                required={false}
                placeholder=" "
                disabled={true}
                inputClassName="w-full h-[41px] px-[20px] py-[10px] border-2 rounded-[14px] focus:outline-none text-sm transition-all duration-200 font-poppins text-[14px] leading-[100%] tracking-[0%] border-gray-300 bg-gray-50"
                labelClassName="absolute left-[20px] top-[20%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D]"
              />
            </div>
          </div>

          {/* Meeting Agenda */}
          <DropdownInput
            type="text"
            name="meetingAgenda"
            label="Meeting Agenda"
            value={formData.meetingAgenda}
            onChange={(e) => handleInputChange("meetingAgenda", e.target.value)}
            dropdownData={[]} // No dropdown
            error={errors.meetingAgenda}
            required={true}
            placeholder=" "
            inputClassName={`w-full h-[41px] px-[20px] py-[10px] border-2 rounded-[14px] focus:outline-none text-sm transition-all duration-200 font-poppins text-[14px] leading-[100%] tracking-[0%] ${
              errors.meetingAgenda
                ? "border-primary focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
            labelClassName="absolute left-[20px] top-[20%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D]"
          />

          {/* Meeting Room with Dropdown */}
          <DropdownInput
            type="text"
            name="meetingRoom"
            label="Meeting Room"
            value={formData.meetingRoom}
            onChange={(e) => handleInputChange("meetingRoom", e.target.value)}
            dropdownData={meetingRooms}
            showDropdown={showRoomDropdown}
            setShowDropdown={setShowRoomDropdown}
            error={errors.meetingRoom}
            icon={<ChevronDown className="w-4 h-4 text-gray-400" />}
            iconPosition="right"
            required={true}
            placeholder=" "
            inputClassName={`w-full h-[41px] px-[20px] py-[10px] border-2 rounded-[14px] focus:outline-none text-sm transition-all duration-200 font-poppins text-[14px] leading-[100%] tracking-[0%] ${
              errors.meetingRoom
                ? "border-primary focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }`}
            labelClassName="absolute left-[20px] top-[20%] pointer-events-none font-poppins font-medium text-[14px] leading-[100%] tracking-[0%] text-[#3333334D]"
            dropdownClassName="custom-dropdown"
          />
        </div>
      </div>

      {/* Time Selection using TimePicker */}
      <div className="space-y-4 pt-6">
        <TimePicker
          initialStartTime={formData.startTime}
          initialEndTime={formData.endTime}
          onTimeChange={handleTimeChange}
          primaryColor={primaryColor}
          size="small"
          className="!p-0 !max-w-none"
        />
      </div>
    </div>
  );
}
