import { Download, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarHeader from "../../components/Navbar/NavbarHeader";
import { RiSearchLine } from "react-icons/ri";
import { Phone, Edit } from "lucide-react";

const attendanceData = [
  { day: 1, present: 24, absent: 6, leave: 2 },
  { day: 2, present: 22, absent: 8, leave: 2 },
  { day: 3, present: 26, absent: 4, leave: 2 },
  { day: 4, present: 23, absent: 7, leave: 2 },
  { day: 5, present: 25, absent: 5, leave: 2 },
  { day: 6, present: 21, absent: 9, leave: 2 },
  { day: 7, present: 24, absent: 6, leave: 2 },
  { day: 8, present: 27, absent: 3, leave: 2 },
];

// Sample student data - you can replace this with your actual data source
const studentsData = [
  {
    id: 1,
    name: "Aman Sharma",
    rollNo: "11",
    status: "Present",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Priya Singh",
    rollNo: "12",
    status: "Absent",
    phone: "+91 9876543211",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    rollNo: "13",
    status: "Present",
    phone: "+91 9876543212",
  },
  {
    id: 4,
    name: "Sneha Patel",
    rollNo: "14",
    status: "Leave",
    phone: "+91 9876543213",
  },
  {
    id: 5,
    name: "Vikash Gupta",
    rollNo: "15",
    status: "Present",
    phone: "+91 9876543214",
  },
  {
    id: 6,
    name: "Anita Yadav",
    rollNo: "16",
    status: "Absent",
    phone: "+91 9876543215",
  },
  {
    id: 7,
    name: "Rohit Verma",
    rollNo: "17",
    status: "Present",
    phone: "+91 9876543216",
  },
  {
    id: 8,
    name: "Kavita Joshi",
    rollNo: "18",
    status: "Present",
    phone: "+91 9876543217",
  },
  {
    id: 9,
    name: "Suresh Mehta",
    rollNo: "19",
    status: "Present",
    phone: "+91 9876543218",
  },
  {
    id: 10,
    name: "Deepika Agarwal",
    rollNo: "20",
    status: "Absent",
    phone: "+91 9876543219",
  },
  {
    id: 11,
    name: "Arjun Patel",
    rollNo: "21",
    status: "Present",
    phone: "+91 9876543220",
  },
  {
    id: 12,
    name: "Meera Gupta",
    rollNo: "22",
    status: "Absent",
    phone: "+91 9876543221",
  },
  {
    id: 13,
    name: "Karan Singh",
    rollNo: "23",
    status: "Present",
    phone: "+91 9876543222",
  },
  {
    id: 14,
    name: "Ritu Sharma",
    rollNo: "24",
    status: "Leave",
    phone: "+91 9876543223",
  },
  {
    id: 15,
    name: "Amit Kumar",
    rollNo: "25",
    status: "Present",
    phone: "+91 9876543224",
  },
];

const AttendanceTracker = () => {
  const [clicked, setClicked] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudentList, setShowStudentList] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get filter from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const typeParam = urlParams.get("type");

    if (typeParam) {
      setCurrentFilter(typeParam);
      setShowStudentList(true);

      // Filter students based on the type
      let filtered = [];
      if (typeParam === "present") {
        filtered = studentsData.filter(
          (student) => student.status === "Present"
        );
      } else if (typeParam === "absent") {
        filtered = studentsData.filter(
          (student) => student.status === "Absent"
        );
      } else if (typeParam === "leave") {
        filtered = studentsData.filter((student) => student.status === "Leave");
      }

      setFilteredStudents(filtered);
    }
  }, [location.search]);

  // Filter students based on search term
  const searchFilteredStudents = filteredStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (day, type) => {
    setClicked((prev) => ({
      ...prev,
      [`${day}-${type}`]: !prev[`${day}-${type}`],
    }));

    // Navigate with day and type as URL params
    navigate(`/report?type=${type}&day=${day}`);
  };

  const handleBackClick = () => {
    if (showStudentList) {
      // Go back to main attendance view
      setShowStudentList(false);
      setCurrentFilter(null);
      navigate("/report");
    } else {
      // Go back to dashboard
      navigate("/dashboard");
    }
  };

  // Phone call functionality
  const handlePhoneCall = (student) => {
    const phoneNumber = student.phone.replace(/\s+/g, "");
    window.open(`tel:${phoneNumber}`, "_self");
  };

  // Edit functionality
  const handleEditStudent = (student) => {
    console.log("Edit student:", student);
    // Add your edit logic here
  };

  // Get navbar title based on current filter
  const getNavbarTitle = () => {
    if (!currentFilter) return "Reports";

    switch (currentFilter) {
      case "present":
        return "Present ";
      case "absent":
        return "Absent ";
      case "leave":
        return "  Leave";
      default:
        return "Reports";
    }
  };

  // Get border style based on student status
  const getBorderStyle = (status) => {
    switch (status) {
      case "Present":
        return "border border-green-400/50";
      case "Absent":
        return "border border-[#FE697D]/50";
      case "Leave":
        return "border border-blue-300/50";
      default:
        return "border border-gray-300";
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        {/* Header */}
        <NavbarHeader
          text={getNavbarTitle()}
          showArrow={true}
          onArrowClick={handleBackClick}
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
          className="px-4 py-8"
          style={{ height: "auto" }}
        />

        {/* Show student list when a filter is active */}
        {showStudentList ? (
          <div className="p-4">
            {/* Search Bar */}
            <div className="mb-4">
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

            {/* Students List */}
            <div
              className="space-y-3 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {searchFilteredStudents.length > 0 ? (
                searchFilteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow ${getBorderStyle(
                      student.status
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
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No students found for the selected filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
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

            {/* Attendance List */}
            <div className="p-4 space-y-4">
              {attendanceData.map((item) => (
                <div key={item.day} className="flex items-center gap-4 py-3">
                  <div className="w-12 h-12 rounded-full border-[1px] border-black/50 flex items-center justify-center text-[24px] font-semibold text-gray-600 leading-[100%] font-poppins">
                    {item.day}
                  </div>

                  <div className="flex gap-4 flex-1 justify-center">
                    <button
                      onClick={() => handleClick(item.day, "present")}
                      className={`h-[52px] w-[81px] p-2 border border-[#227749] rounded-[18px] text-[#227749] text-[12px] font-medium text-center leading-[100%] font-poppins ${
                        clicked[`${item.day}-present`]
                          ? "bg-[#22774933]"
                          : "bg-[#2277491A]"
                      }`}
                    >
                      ({item.present})<br />
                      Present
                    </button>

                    <button
                      onClick={() => handleClick(item.day, "absent")}
                      className={`h-[52px] w-[81px] p-2 border border-[#FE697D] rounded-[16px] text-[#FE697D] text-[12px] font-medium text-center leading-[100%] font-poppins ${
                        clicked[`${item.day}-absent`]
                          ? "bg-[#FE697D33]"
                          : "bg-[#FE697D1A]"
                      }`}
                    >
                      ({item.absent}) <br /> Absent
                    </button>

                    <button
                      onClick={() => handleClick(item.day, "leave")}
                      className={`w-[81px] h-[52px] p-2 border border-[#394089] rounded-[16px] text-[#394089] text-[12px] font-medium text-center leading-[100%] font-poppins ${
                        clicked[`${item.day}-leave`]
                          ? "bg-[#39408933]"
                          : "bg-[#3940891A]"
                      }`}
                    >
                      ({item.leave}) <br /> Leave
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
