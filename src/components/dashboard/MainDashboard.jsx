import React, { useState } from 'react';
import { Calendar, Clock, Users, Settings, Search, Plus, BarChart3, CircleUser, ChevronRight, ChevronLeft, X, Share2, Edit, Save, Bell, Filter, Download, Mail, MessageCircle, Copy, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function MainDashboard() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('2024-01-15');
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 15)); // January 2024
    const [showShareModal, setShowShareModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Mock data for dynamic content
    const [dashboardData, setDashboardData] = useState({
        upcomingMeetings: 4,
        previousMeetings: 4,
        present: 36,
        absent: 4,
        leave: 1,
        total: 41,
        attendancePercentage: 90,
        presentDays: 36,
        totalDays: 40
    });

    const [editFormData, setEditFormData] = useState({
        className: 'Class 12-A',
        subject: 'Mathematics',
        totalStudents: 41,
        workingDays: 40
    });

    const notifications = [
        { id: 1, message: 'New student admission pending', time: '2 hours ago', type: 'info' },
        { id: 2, message: 'Monthly report is ready', time: '1 day ago', type: 'success' },
        { id: 3, message: 'Low attendance alert for 3 students', time: '2 days ago', type: 'warning' }
    ];

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        // Simulate data update based on date
        updateDashboardData(newDate);
    };

    const updateDashboardData = (date) => {
        // Simulate different data for different dates
        const randomPresent = Math.floor(Math.random() * 10) + 32;
        const randomAbsent = Math.floor(Math.random() * 5) + 2;
        const randomLeave = Math.floor(Math.random() * 3) + 1;
        const total = randomPresent + randomAbsent + randomLeave;
        const percentage = Math.round((randomPresent / total) * 100);

        setDashboardData(prev => ({
            ...prev,
            present: randomPresent,
            absent: randomAbsent,
            leave: randomLeave,
            total: total,
            attendancePercentage: percentage,
            presentDays: randomPresent
        }));
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
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();
            const selectedDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            setSelectedDate(selectedDateString);
            setShowCalendar(false);
            updateDashboardData(selectedDateString);
        }
    };

    const navigateMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    const getMonthYearDisplay = () => {
        return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const isSelectedDate = (day) => {
        if (!day) return false;
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return dateString === selectedDate;
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Share functionality
    const shareOptions = [
        {
            name: 'Copy Link', icon: Copy, action: () => {
                navigator.clipboard.writeText(window.location.href);
                alert('Dashboard link copied to clipboard!');
            }
        },
        {
            name: 'WhatsApp', icon: MessageCircle, action: () => {
                const text = `Daily Attendance Report - ${formatDate(selectedDate)}\nPresent: ${dashboardData.present}\nAbsent: ${dashboardData.absent}\nAttendance: ${dashboardData.attendancePercentage}%`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }
        },
        {
            name: 'Email', icon: Mail, action: () => {
                const subject = `Daily Attendance Report - ${formatDate(selectedDate)}`;
                const body = `Daily Attendance Summary:\n\nDate: ${formatDate(selectedDate)}\nPresent: ${dashboardData.present}\nAbsent: ${dashboardData.absent}\nLeave: ${dashboardData.leave}\nTotal: ${dashboardData.total}\nAttendance Rate: ${dashboardData.attendancePercentage}%`;
                window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
            }
        },
        {
            name: 'Facebook', icon: Facebook, action: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
            }
        },
        {
            name: 'Twitter', icon: Twitter, action: () => {
                const text = `Daily Attendance Report - ${dashboardData.attendancePercentage}% attendance rate on ${formatDate(selectedDate)}`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
            }
        },
        {
            name: 'Download', icon: Download, action: () => {
                const data = `Daily Attendance Report\nDate: ${formatDate(selectedDate)}\nPresent: ${dashboardData.present}\nAbsent: ${dashboardData.absent}\nLeave: ${dashboardData.leave}\nTotal: ${dashboardData.total}\nAttendance Rate: ${dashboardData.attendancePercentage}%`;
                const blob = new Blob([data], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `attendance-report-${selectedDate}.txt`;
                a.click();
                URL.revokeObjectURL(url);
            }
        }
    ];

    const handleSaveEdit = () => {
        console.log('Updated dashboard settings:', editFormData);
        setShowEditModal(false);
        // Here you would typically save the data to your backend
    };

    const handleCreateInvite = () => {
        navigate('/invite-form');
    };

    const handleViewDetailedReport = () => {
        // Navigate to attendance overview
        window.location.href = '/attendance-overview';
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
                {/* Header */}
                <div className="px-4 py-6" style={{ background: 'linear-gradient(135deg, #FE697D 0%, #FF8A9B 100%)' }}>
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-semibold">Entraa</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                                )}
                            </button>
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                            >
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications Dropdown */}
                {showNotifications && (
                    <div className="relative">
                        <div className="absolute top-0 right-4 left-4 bg-white border rounded-lg shadow-lg z-40 max-h-64 overflow-y-auto">
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
                                <div className="space-y-3">
                                    {notifications.map(notification => (
                                        <div key={notification.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'info' ? 'bg-blue-500' :
                                                notification.type === 'success' ? 'bg-green-500' :
                                                    'bg-yellow-500'
                                                }`}></div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800">{notification.message}</p>
                                                <p className="text-xs text-gray-500">{notification.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="fixed inset-0 z-30"
                            onClick={() => setShowNotifications(false)}
                        />
                    </div>
                )}

                {/* Main Content */}
                <div className="px-4 py-6 space-y-6">
                    {/* Appointments Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointments</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Upcoming Meetings */}
                            <div className="bg-gray-900 rounded-2xl p-4 text-white cursor-pointer hover:bg-gray-800 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-300">Upcoming <br /> Meetings</p>
                                    <p className="text-2xl font-bold">{dashboardData.upcomingMeetings}</p>
                                </div>
                            </div>

                            {/* Previous Meetings */}
                            <div className="bg-gray-100 rounded-2xl p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">Previous  <br />Meetings</p>
                                    <p className="text-2xl font-bold text-gray-800">{dashboardData.previousMeetings}</p>
                                </div>
                            </div>
                        </div>

                        {/* Create Invite Button */}
                        <button
                            onClick={handleCreateInvite}
                            className="w-full text-white py-3 rounded-2xl font-medium mt-4 flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                            style={{ background: 'linear-gradient(135deg, #FE697D 0%, #FF8A9B 100%)' }}
                        >
                            <span>Create Invite</span>
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Overview Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
                            <div className="relative">
                                <div className="flex items-center cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
                                    <Calendar className="w-5 h-5 text-pink-500 mr-2" />
                                    <span className="text-sm text-gray-600">
                                        {formatDate(selectedDate)}
                                    </span>
                                </div>

                                {/* Calendar Dropdown */}
                                {showCalendar && (
                                    <div className="absolute top-full right-0 mt-2 bg-white border-2 rounded-lg shadow-lg z-20 w-80">
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
                                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                                        {day}
                                                    </div>
                                                ))}
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
                                                            ${day ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'}
                                                            ${isSelectedDate(day) ? 'text-white font-medium' : 'text-gray-700'}
                                                        `}
                                                        style={{
                                                            backgroundColor: isSelectedDate(day) ? '#FE697D' : 'transparent'
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

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-2xl p-4 text-white cursor-pointer hover:bg-gray-800 transition-colors">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-300">Present</p>
                                    <p className="text-2xl font-bold">{dashboardData.present}</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-2xl p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">Absent</p>
                                    <p className="text-2xl font-bold text-gray-800">{dashboardData.absent}</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-2xl p-4 cursor-pointer hover:bg-gray-200 transition-colors">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">Leave</p>
                                    <p className="text-2xl font-bold text-gray-800">{dashboardData.leave}</p>
                                </div>
                            </div>

                            <div className="bg-gray-900 rounded-2xl p-4 text-white cursor-pointer hover:bg-gray-800 transition-colors">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-300">Total</p>
                                    <p className="text-2xl font-bold">{dashboardData.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Attendance</h2>
                            <button
                                onClick={handleViewDetailedReport}
                                className="text-pink-500 text-sm hover:text-pink-600 transition-colors flex items-center"
                            >
                                View Details <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6">
                            {/* Circular Progress */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e5e7eb"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#10b981"
                                            strokeWidth="2"
                                            strokeDasharray={`${dashboardData.attendancePercentage}, 100`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-800">{dashboardData.attendancePercentage}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Stats */}
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-gray-600">Present Days</p>
                                    <p className="text-xl font-bold text-gray-800">{dashboardData.presentDays}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Days</p>
                                    <p className="text-xl font-bold text-gray-800">{dashboardData.totalDays}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Overlay */}
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
                                <h3 className="text-lg font-semibold text-gray-800">Share Dashboard</h3>
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
                                        <option.icon className="w-6 h-6 mb-2" style={{ color: '#FE697D' }} />
                                        <span className="text-sm text-gray-700">{option.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-80 mx-4 max-h-96 overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Dashboard Settings</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.className}
                                        onChange={(e) => setEditFormData({ ...editFormData, className: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.subject}
                                        onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total Students
                                    </label>
                                    <input
                                        type="number"
                                        value={editFormData.totalStudents}
                                        onChange={(e) => setEditFormData({ ...editFormData, totalStudents: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Working Days
                                    </label>
                                    <input
                                        type="number"
                                        value={editFormData.workingDays}
                                        onChange={(e) => setEditFormData({ ...editFormData, workingDays: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="flex-1 py-2 px-4 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                                        style={{ backgroundColor: '#FE697D' }}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}