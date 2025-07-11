import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Share, Download, ChevronDown } from 'lucide-react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
  Chart.ArcElement,
  Chart.Tooltip,
  Chart.Legend,
  Chart.DoughnutController
);

export default function AttendanceApp() {
  const [selectedStudent, setSelectedStudent] = useState('Aryan Sharma');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Register Chart.js components
  useEffect(() => {
    Chart.Chart.register(
      Chart.ArcElement,
      Chart.Tooltip,
      Chart.Legend,
      Chart.DoughnutController
    );
  }, []);
  
  // Generate attendance data for the current month
 // Generate attendance data for the current month (only for dates before today)
 const generateAttendanceData = (month, year) => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    
    // Skip future dates (dates after today)
    if (year > todayYear || 
        (year === todayYear && month > todayMonth) || 
        (year === todayYear && month === todayMonth && day >= todayDate)) {
      continue;
    }
    
    // Sunday is 0, so mark Sundays as off
    if (dayOfWeek === 0) {
      data.push({ day, status: 'off' });
    } else {
      // Random attendance for demo - you can replace with actual data
      const statuses = ['present', 'absent', 'leave'];
      const weights = [0.75, 0.15, 0.10]; // 75% present, 15% absent, 10% leave
      const random = Math.random();
      let status = 'present';
      
      if (random < weights[1]) {
        status = 'absent';
      } else if (random < weights[1] + weights[2]) {
        status = 'leave';
      }
      
      data.push({ day, status });
    }
  }
  
  return data;
};

  const [attendanceData, setAttendanceData] = useState(() => 
    generateAttendanceData(currentMonth, currentYear)
  );

  // Update attendance data when month/year changes
  useEffect(() => {
    setAttendanceData(generateAttendanceData(currentMonth, currentYear));
    setSelectedDate(null);
  }, [currentMonth, currentYear]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-600';
      case 'absent': return 'bg-red-100 text-red-600';
      case 'leave': return 'bg-blue-100 text-blue-600';
      case 'off': return 'bg-gray-100 text-gray-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusStats = () => {
    const workingDays = attendanceData.filter(d => d.status !== 'off');
    const total = workingDays.length;
    const present = workingDays.filter(d => d.status === 'present').length;
    const absent = workingDays.filter(d => d.status === 'absent').length;
    const leave = workingDays.filter(d => d.status === 'leave').length;
    
    return {
      attendance: total > 0 ? Math.round((present / total) * 100) : 0,
      absent: total > 0 ? Math.round((absent / total) * 100) : 0,
      leave: total > 0 ? Math.round((leave / total) * 100) : 0,
      totalDays: attendanceData.length,
      workingDays: total,
      presentDays: present,
      absentDays: absent,
      leaveDays: leave
    };
  };

  const stats = getStatusStats();

  // Create or update Chart.js doughnut chart
  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstanceRef.current = new Chart.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Present', 'Absent', 'Leave'],
          datasets: [{
            data: [stats.presentDays, stats.absentDays, stats.leaveDays],
            backgroundColor: ['#10b981', '#ef4444', '#3b82f6'],
            borderWidth: 0,
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed;
                  const percentage = stats.workingDays > 0 ? Math.round((value / stats.workingDays) * 100) : 0;
                  return `${label}: ${value} days (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [stats.presentDays, stats.absentDays, stats.leaveDays, stats.workingDays]);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Get the first day of the month and create calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const updateAttendance = (day, status) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    
    // Don't allow updating Sunday (off day)
    if (dayOfWeek === 0) return;
    
    setAttendanceData(prev => 
      prev.map(item => 
        item.day === day ? { ...item, status } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="w-full max-w-sm bg-white shadow-2xl rounded-3xl overflow-hidden" style={{height: '844px'}}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 px-4 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <ChevronLeft className="w-6 h-6 cursor-pointer" />
              <span className="text-lg font-medium">Attendance</span>
            </div>
            <div className="flex items-center space-x-3">
              <Share className="w-5 h-5 cursor-pointer" />
              <Download className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 flex-1 overflow-y-auto">
          {/* Student Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Student</label>
            <div className="relative">
              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg bg-white text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option>Aryan Sharma</option>
                <option>Priya Singh</option>
                <option>Rahul Kumar</option>
                <option>Sakshi Patel</option>
                <option>Anjali Gupta</option>
                <option>Rohan Verma</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="mb-6">
            <h3 className="text-gray-800 font-medium mb-4">Attendance Overview</h3>
            
            {/* Calendar Header */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <ChevronLeft 
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-500 transition-colors" 
                  onClick={() => navigateMonth('prev')}
                />
                <span className="text-gray-700 font-medium">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <ChevronLeft 
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-500 transition-colors transform rotate-180" 
                  onClick={() => navigateMonth('next')}
                />
              </div>
              
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-xs text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="w-8 h-8"></div>;
                  }
                  
                  const dayData = attendanceData.find(d => d.day === day);
                  const isSelected = selectedDate === day;
                  
                  return (
                    <div
                      key={day}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${getStatusColor(dayData?.status || 'present')} ${isSelected ? 'ring-2 ring-pink-400' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Statistics Chart */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <canvas ref={chartRef} className="w-full h-full"></canvas>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{stats.attendance}%</div>
                    <div className="text-xs text-gray-500">Attendance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Present</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{stats.presentDays} days ({stats.attendance}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Absent</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{stats.absentDays} days ({stats.absent}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Leave</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{stats.leaveDays} days ({stats.leave}%)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {selectedDate && (
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Update attendance for {selectedDate} {monthNames[currentMonth]} {currentYear}:
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => updateAttendance(selectedDate, 'present')}
                  className="px-4 py-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap hover:bg-green-100 transition-colors"
                >
                  (P) Present
                </button>
                <button 
                  onClick={() => updateAttendance(selectedDate, 'absent')}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap hover:bg-red-100 transition-colors"
                >
                  (A) Absent
                </button>
                <button 
                  onClick={() => updateAttendance(selectedDate, 'leave')}
                  className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap hover:bg-blue-100 transition-colors"
                >
                  (L) Leave
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}