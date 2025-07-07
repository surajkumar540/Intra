import React, { useState } from 'react';
import { ChevronLeft, Calendar, Phone, Edit, Share2, Settings, ChevronRight, X, Copy, MessageCircle, Mail, Facebook, Twitter, Instagram, Save, User, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AttendanceOverview = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('Total');
    const [selectedDate, setSelectedDate] = useState('2025-06-01');
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1)); // June 2025
    const [showShareModal, setShowShareModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        rollNo: '',
        status: '',
        phone: ''
    });

    const filters = ['Total', 'Present', 'Absent', 'Late'];

    const studentsData = [
        { id: 1, name: 'Aman Sharma', rollNo: '11', status: 'Present', avatar: 'AS', phone: '+91 9876543210' },
        { id: 2, name: 'Priya Singh', rollNo: '12', status: 'Absent', avatar: 'PS', phone: '+91 9876543211' },
        { id: 3, name: 'Rahul Kumar', rollNo: '13', status: 'Present', avatar: 'RK', phone: '+91 9876543212' },
        { id: 4, name: 'Sneha Patel', rollNo: '14', status: 'Late', avatar: 'SP', phone: '+91 9876543213' },
        { id: 5, name: 'Vikash Gupta', rollNo: '15', status: 'Present', avatar: 'VG', phone: '+91 9876543214' },
        { id: 6, name: 'Anita Yadav', rollNo: '16', status: 'Absent', avatar: 'AY', phone: '+91 9876543215' },
        { id: 7, name: 'Rohit Verma', rollNo: '17', status: 'Present', avatar: 'RV', phone: '+91 9876543216' },
        { id: 8, name: 'Kavita Joshi', rollNo: '18', status: 'Late', avatar: 'KJ', phone: '+91 9876543217' },
        { id: 9, name: 'Suresh Mehta', rollNo: '19', status: 'Present', avatar: 'SM', phone: '+91 9876543218' },
        { id: 10, name: 'Deepika Agarwal', rollNo: '20', status: 'Absent', avatar: 'DA', phone: '+91 9876543219' },
    ];

    // Filter students based on selected filter
    const filteredStudents = studentsData.filter(student => {
        if (selectedFilter === 'Total') return true;
        return student.status === selectedFilter;
    });

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
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
            const selectedDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
        return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const isSelectedDate = (day) => {
        if (!day) return false;
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return dateString === selectedDate;
    };

    // Phone call functionality
    const handlePhoneCall = (student) => {
        const phoneNumber = student.phone.replace(/\s+/g, '');
        window.open(`tel:${phoneNumber}`, '_self');
    };

    // Edit functionality
    const handleEditStudent = (student) => {
        setSelectedStudent(student);
        setEditFormData({
            name: student.name,
            rollNo: student.rollNo,
            status: student.status,
            phone: student.phone
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        // Here you would typically update the student data
        // For demo purposes, we'll just close the modal
        console.log('Updated student data:', editFormData);
        setShowEditModal(false);
        setSelectedStudent(null);
    };

    // Share functionality
    const handleShare = () => {
        setShowShareModal(true);
    };

    const shareOptions = [
        {
            name: 'Copy Link', icon: Copy, action: () => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        },
        {
            name: 'WhatsApp', icon: MessageCircle, action: () => {
                const text = `Attendance Overview - ${formatDate(selectedDate)}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }
        },
        {
            name: 'Email', icon: Mail, action: () => {
                const subject = `Attendance Overview - ${formatDate(selectedDate)}`;
                const body = `Check out the attendance overview for ${formatDate(selectedDate)}`;
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
                const text = `Attendance Overview - ${formatDate(selectedDate)}`;
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
            }
        },
        {
            name: 'Instagram', icon: Instagram, action: () => {
                alert('Instagram sharing requires the Instagram app');
            }
        }
    ];

    return (
        <div className="flex items-center justify-center">
            <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
                {/* Fixed Header */}
                <div className="sticky top-0 z-10 px-4 py-6" style={{ backgroundColor: '#FE697D' }}>
                    <div className="flex items-center justify-between">
                        <ChevronLeft className="text-white w-6 h-6 cursor-pointer hover:opacity-80" onClick={() => navigate('/dashboard')} />
                        <h1 className="text-white text-lg font-medium">Overview</h1>
                        <div className="flex items-center space-x-3">
                            <Share2 className="text-white w-5 h-5 cursor-pointer hover:opacity-80" onClick={handleShare} />
                            <Settings className="text-white w-5 h-5 cursor-pointer hover:opacity-80" />
                        </div>
                    </div>
                </div>

                <div className='mt-[20px] pb-6 px-6'>
                    {/* Date Selector */}
                    <div className="bg-white border-2 rounded-lg px-4 mb-4 relative">
                        <div className="flex items-center cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
                            <Calendar className="w-5 h-5 text-black/50 mr-3" />
                            <span className="py-2 text-sm text-black/70">
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
                                                    ${day ? 'hover:bg-opacity-80' : ''}
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

                    {/* Filter Tabs */}
                    <div className="flex space-x-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`w-32 px-4 py-2 rounded-full text-sm font-medium text-center transition-all ${selectedFilter === filter
                                    ? 'text-white font-normal font-poppins'
                                    : 'outline outline-1 font-normal font-poppins text-black/50'
                                    }`}
                                style={{
                                    backgroundColor: selectedFilter === filter ? '#FE697D' : 'transparent'
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable Students List */}
                <div className="px-4 py-6 space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Avatar */}
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium"
                                        style={{ backgroundColor: '#FE697D' }}
                                    >
                                        {student.avatar}
                                    </div>

                                    {/* Student Info */}
                                    <div>
                                        <h3 className="font-medium text-gray-800 text-sm">
                                            Name - {student.name}
                                        </h3>
                                        <p className="text-gray-500 text-xs">
                                            Roll No. - {student.rollNo}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${student.status === 'Present' ? 'bg-green-100 text-green-700' :
                                            student.status === 'Absent' ? 'bg-red-100 text-red-700' :
                                                student.status === 'Late' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Icons */}
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => handlePhoneCall(student)}
                                        className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                                        style={{ borderColor: '#FE697D' }}
                                        title={`Call ${student.name}`}
                                    >
                                        <Phone className="w-4 h-4" style={{ color: '#FE697D' }} />
                                    </button>
                                    <button
                                        onClick={() => handleEditStudent(student)}
                                        className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                                        style={{ borderColor: '#FE697D' }}
                                        title={`Edit ${student.name}`}
                                    >
                                        <Edit className="w-4 h-4" style={{ color: '#FE697D' }} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No students found for the selected filter.</p>
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
                                <h3 className="text-lg font-semibold text-gray-800">Share Attendance</h3>
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
                {showEditModal && selectedStudent && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-80 mx-4 max-h-96 overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Edit Student</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <User className="inline w-4 h-4 mr-1" />
                                        Student Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Enter student name"
                                    />
                                </div>

                                {/* Roll Number Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Hash className="inline w-4 h-4 mr-1" />
                                        Roll Number
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.rollNo}
                                        onChange={(e) => setEditFormData({ ...editFormData, rollNo: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Enter roll number"
                                    />
                                </div>

                                {/* Phone Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Phone className="inline w-4 h-4 mr-1" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                {/* Status Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Attendance Status
                                    </label>
                                    <select
                                        value={editFormData.status}
                                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    >
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                        <option value="Late">Late</option>
                                    </select>
                                </div>

                                {/* Action Buttons */}
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
};

export default AttendanceOverview;