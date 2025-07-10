// 5. AttendanceSection.jsx - Attendance section component
import React from "react";
import ChartComponent from "../../../components/Charts/Chart";
import Button from "../../../components/UI/Button";

const AttendanceSection = ({ dashboardData, onViewStudents }) => {
  return (
    <div className="pt-4 w-full">
      <div className="w-full px-6">
        <div className="bg-gray-50 rounded-2xl p-6 w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold text-gray-800 font-poppins">
              Attendance
            </h2>
          </div>

          <ChartComponent />
        </div>

        <div className="grid grid-cols-2 gap-4 text-center pt-2">
          <div>
            <p className="text-sm text-gray-600 font-poppins">Present Days</p>
            <p className="text-xl font-bold text-gray-800 font-poppins">
              {dashboardData.presentDays}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-poppins">Total Days</p>
            <p className="text-xl font-bold text-gray-800 font-poppins">
              {dashboardData.totalDays}
            </p>
          </div>
        </div>

        <Button
          onClick={onViewStudents}
          className="w-full  text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary"
        >
          View Students
        </Button>
      </div>
    </div>
  );
};

export default AttendanceSection;
