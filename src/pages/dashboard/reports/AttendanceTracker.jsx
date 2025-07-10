import { Download, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../../../components/layout/NavbarHeader";
import { RiSearchLine } from "react-icons/ri";

const attendanceData = [
  { day: 1, present: 24, absent: 6, leave: 2 },
  { day: 2, present: 24, absent: 6, leave: 2 },
  { day: 3, present: 24, absent: 6, leave: 2 },
  { day: 4, present: 24, absent: 6, leave: 2 },
  { day: 5, present: 24, absent: 6, leave: 2 },
  { day: 6, present: 24, absent: 6, leave: 2 },
  { day: 7, present: 24, absent: 6, leave: 2 },
  { day: 8, present: 24, absent: 6, leave: 2 },
];

const AttendanceTracker = () => {
  const [clicked, setClicked] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const handleClick = (day, type) => {
    setClicked((prev) => ({
      ...prev,
      [`${day}-${type}`]: !prev[`${day}-${type}`],
    }));

    // Navigate with day and type as URL params
    navigate(`/report?type=${type}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
        {/* Header */}
        <NavbarHeader
          text="Reports"
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
      </div>
    </div>
  );
};

export default AttendanceTracker;
