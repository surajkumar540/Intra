import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Calendar,
  Phone,
  Edit,
  Share2,
  ChevronRight,
  X,
  Copy,
  MessageCircle,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Download,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader";

const AttendanceOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get filter parameter from URL
  const urlParams = new URLSearchParams(location.search);
  const urlFilter = urlParams.get("filter");

  // Initialize selectedFilter based on URL parameter
  const [selectedFilter, setSelectedFilter] = useState(() => {
    // Map URL filter values to display values
    const filterMap = {
      present: "Present",
      absent: "Absent",
      leave: "Leave",
      total: "Total",
      upcoming: "Total", // Default to Total for upcoming
      previous: "Total", // Default to Total for previous
    };

    return filterMap[urlFilter?.toLowerCase()] || "Total";
  });

  const [selectedDate, setSelectedDate] = useState("2025-06-01");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1)); // June 2025
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    rollNo: "",
    status: "",
    phone: "",
  });

  // Update filter when URL changes
  useEffect(() => {
    const filterMap = {
      present: "Present",
      absent: "Absent",
      leave: "Leave",
      total: "Total",
      upcoming: "Total",
      previous: "Total",
    };

    const newFilter = filterMap[urlFilter?.toLowerCase()] || "Total";
    setSelectedFilter(newFilter);
  }, [urlFilter]);

  const filters = ["Total", "Present", "Absent", "Leave"];

  const studentsData = [
    {
      id: 1,
      name: "Aman Sharma",
      rollNo: "11",
      status: "Present",
      avatar: "AS",
      phone: "+91 9876543210",
    },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: "12",
      status: "Absent",
      avatar: "PS",
      phone: "+91 9876543211",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      rollNo: "13",
      status: "Present",
      avatar: "RK",
      phone: "+91 9876543212",
    },
    {
      id: 4,
      name: "Sneha Patel",
      rollNo: "14",
      status: "Leave",
      avatar: "SP",
      phone: "+91 9876543213",
    },
    {
      id: 5,
      name: "Vikash Gupta",
      rollNo: "15",
      status: "Present",
      avatar: "VG",
      phone: "+91 9876543214",
    },
    {
      id: 6,
      name: "Anita Yadav",
      rollNo: "16",
      status: "Absent",
      avatar: "AY",
      phone: "+91 9876543215",
    },
    {
      id: 7,
      name: "Rohit Verma",
      rollNo: "17",
      status: "Present",
      avatar: "RV",
      phone: "+91 9876543216",
    },
    {
      id: 8,
      name: "Kavita Joshi",
      rollNo: "18",
      status: "Late",
      avatar: "KJ",
      phone: "+91 9876543217",
    },
    {
      id: 9,
      name: "Suresh Mehta",
      rollNo: "19",
      status: "Present",
      avatar: "SM",
      phone: "+91 9876543218",
    },
    {
      id: 10,
      name: "Deepika Agarwal",
      rollNo: "20",
      status: "Absent",
      avatar: "DA",
      phone: "+91 9876543219",
    },
  ];

  // Filter students based on selected filter
  const filteredStudents = studentsData.filter((student) => {
    if (selectedFilter === "Total") return true;
    if (selectedFilter === "Leave") {
      // You might want to add a "Leave" status to your student data
      // For now, treating "Leave" as a separate status
      return student.status === "Leave";
    }
    return student.status === selectedFilter;
  });

  // Update URL when filter changes manually
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    // Update URL parameter
    const newParams = new URLSearchParams(location.search);
    newParams.set("filter", filter.toLowerCase());
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
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

  // Phone call functionality
  const handlePhoneCall = (student) => {
    const phoneNumber = student.phone.replace(/\s+/g, "");
    window.open(`tel:${phoneNumber}`, "_self");
  };

  // Edit functionality
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      name: student.name,
      rollNo: student.rollNo,
      status: student.status,
      phone: student.phone,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Here you would typically update the student data
    // For demo purposes, we'll just close the modal
    console.log("Updated student data:", editFormData);
    setShowEditModal(false);
    setSelectedStudent(null);
  };

  // Share functionality
  const handleShare = () => {
    setShowShareModal(true);
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: () => {
        const text = `Attendance Overview - ${formatDate(selectedDate)}`;
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      },
    },
    {
      name: "Email",
      icon: Mail,
      action: () => {
        const subject = `Attendance Overview - ${formatDate(selectedDate)}`;
        const body = `Check out the attendance overview for ${formatDate(
          selectedDate
        )}`;
        window.open(
          `mailto:?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(body)}`,
          "_blank"
        );
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`,
          "_blank"
        );
      },
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => {
        const text = `Attendance Overview - ${formatDate(selectedDate)}`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(window.location.href)}`,
          "_blank"
        );
      },
    },
    {
      name: "Instagram",
      icon: Instagram,
      action: () => {
        alert("Instagram sharing requires the Instagram app");
      },
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        <NavbarHeader
          text="Overview"
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
              onClick: () => console.log("Download clicked"),
              label: "Download",
            },
          ]}
          textColor="text-white"
          className="px-4  py-8"
          style={{ height: "auto" }} // Override the default height
        />
        <div className="mt-6 px-6">
          {/* Date Selector */}
          <div className="bg-white  mb-4 relative w-full ">
            <div
              className="flex items-center gap-4 cursor-pointer w-full h-[56px] rounded-[16px] border border-[#0000001A] px-6 py-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <Calendar className="w-5 h-5 font-medium text-black/50" />
              <span className="text-sm font-medium text-black/50 font-poppins">
                {formatDate(selectedDate)}
              </span>
            </div>

            {/* Calendar Dropdown */}
            {showCalendar && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 rounded-lg shadow-lg z-20">
                {/* Calendar Header */}
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

                {/* Calendar Grid */}
                <div className="p-4">
                  {/* Day headers */}
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

                  {/* Calendar days */}
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
                                                    ${
                                                      day
                                                        ? "hover:bg-opacity-80"
                                                        : ""
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

          {/* Filter Tabs */}
          <div
            className="flex space-x-2 mt-6 py-2 px-2 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => {
              const slider = e.currentTarget;
              let isDown = true;
              let startX = e.pageX - slider.offsetLeft;
              let scrollLeft = slider.scrollLeft;

              const onMouseMove = (eMove) => {
                if (!isDown) return;
                const x = eMove.pageX - slider.offsetLeft;
                const walk = x - startX;
                slider.scrollLeft = scrollLeft - walk;
              };

              const onMouseUp = () => {
                isDown = false;
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
              };

              window.addEventListener("mousemove", onMouseMove);
              window.addEventListener("mouseup", onMouseUp);
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`w-[89px] h-[44px] p-2 rounded-[30px] text-sm font-medium text-center transition-all text-[12px] leading-[100%] tracking-[0] font-poppins ${
                  selectedFilter === filter
                    ? "text-white"
                    : "outline outline-1 text-black/50"
                }`}
                style={{
                  backgroundColor:
                    selectedFilter === filter ? "#FE697D" : "transparent",
                  opacity: 1,
                  flexShrink: 0, // important to prevent shrinking inside scroll
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        {/* Scrollable Students List */}
        <div
          className="px-4 py-6 space-y-3 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              // Define border styles based on student status and current filter
              const getBorderStyle = (status, currentFilter) => {
                // If filter is "Total", use uniform gray border for all cards
                if (currentFilter === "Total") {
                  return "border-gray-300";
                }

                // Otherwise, use status-specific borders
                switch (status) {
                  case "Present":
                    return "border border-green-400/50"; // 50% opacity (#30A706 with 50% opacity)
                  case "Absent":
                    return "border border-[#FE697D]/50"; // 50% opacity of primary color
                  case "Leave":
                    return "border border-blue-300/25"; // 25% opacity (#5F95E8 with 25% opacity)

                  default:
                    return "border border-black"; // 25% opacity for any other status
                }
              };

              return (
                <div
                  key={student.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow border ${getBorderStyle(
                    student.status,
                    selectedFilter
                  )}`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&fit=crop"
                        alt="Student Avatar"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Student Info */}
                    <div>
                      <p className="font-semibold text-gray-800 text-[12px] leading-[24px] tracking-[0] font-poppins">
                        Name -{" "}
                        <span className="font-medium text-[12px] leading-[24px] tracking-[0] font-poppins">
                          {student.name}
                        </span>
                      </p>

                      <p className="font-semibold text-gray-800 text-[12px] leading-[24px] tracking-[0] font-poppins">
                        Roll No. -{" "}
                        <span className="font-medium text-[12px] leading-[24px] tracking-[0] font-poppins">
                          {student.rollNo}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handlePhoneCall(student)}
                      className="p-2 bg-[#F8F8F8] rounded-full hover:bg-gray-50 transition-colors text-primary"
                      title={`Call ${student.name}`}
                    >
                      <Phone className="w-4 h-4 rotate-12" />
                    </button>
                    <button
                      onClick={() => handleEditStudent(student)}
                      title={`Edit ${student.name}`}
                      className="p-2 bg-[#F8F8F8] rounded-full hover:bg-gray-50 transition-colors text-primary"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No students found for the selected filter.
              </p>
            </div>
          )}
        </div>
        {/* Overlay to close calendar when clicking outside */}
        {showCalendar && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowCalendar(false)}
          />
        )}
        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 mx-4 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Share Attendance
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setShowShareModal(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <option.icon
                      className="w-6 h-6 mb-2"
                      style={{ color: "#FE697D" }}
                    />
                    <span className="text-sm text-gray-700">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceOverview;
