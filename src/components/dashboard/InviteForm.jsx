import { useState } from 'react';
import { ChevronLeft, Share2, Download, Calendar, ChevronDown, CheckCircle, Clock, MapPin, User, Users, ChevronRight } from 'lucide-react';

export default function InviteForm() {
    const [activeTab, setActiveTab] = useState('Single');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        studentRollNo: '',
        studentName: '',
        hostName: '',
        date: '',
        day: '',
        meetingAgenda: '',
        meetingRoom: '',
        startTime: '10:00',
        startPeriod: 'AM',
        endTime: '10:30',
        endPeriod: 'AM'
    });

    const [errors, setErrors] = useState({});
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [showRoomDropdown, setShowRoomDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const primaryColor = '#FE697D';
    const studentRollNumbers = ['2024001', '2024002', '2024003', '2024004', '2024005', '2024006', '2024007', '2024008'];
    const meetingRooms = ['Conference Room A', 'Conference Room B', 'Meeting Room 1', 'Meeting Room 2', 'Virtual Room', 'Board Room'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Auto-populate day when date is selected
        if (field === 'date' && value) {
            const selectedDate = new Date(value);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[selectedDate.getDay()];
            setFormData(prev => ({
                ...prev,
                day: dayName
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
        return currentMonth.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
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
            const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            handleInputChange('date', formattedDate);
            setShowCalendar(false);
        }
    };

    const isSelectedDate = (day) => {
        if (!day || !formData.date) return false;
        const selectedDate = new Date(formData.date);
        return selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth.getMonth() &&
            selectedDate.getFullYear() === currentMonth.getFullYear();
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentRollNo.trim()) newErrors.studentRollNo = 'Student Roll No is required';
        if (!formData.studentName.trim()) newErrors.studentName = 'Student Name is required';
        if (!formData.hostName.trim()) newErrors.hostName = 'Host Name is required';
        if (!formData.date.trim()) newErrors.date = 'Date is required';
        if (!formData.meetingAgenda.trim()) newErrors.meetingAgenda = 'Meeting Agenda is required';
        if (!formData.meetingRoom.trim()) newErrors.meetingRoom = 'Meeting Room is required';

        // Validate time logic
        const startHour = parseInt(formData.startTime.split(':')[0]);
        const startMinute = parseInt(formData.startTime.split(':')[1] || 0);
        const endHour = parseInt(formData.endTime.split(':')[0]);
        const endMinute = parseInt(formData.endTime.split(':')[1] || 0);

        const startTotalMinutes = (startHour + (formData.startPeriod === 'PM' && startHour !== 12 ? 12 : 0) + (formData.startPeriod === 'AM' && startHour === 12 ? -12 : 0)) * 60 + startMinute;
        const endTotalMinutes = (endHour + (formData.endPeriod === 'PM' && endHour !== 12 ? 12 : 0) + (formData.endPeriod === 'AM' && endHour === 12 ? -12 : 0)) * 60 + endMinute;

        if (endTotalMinutes <= startTotalMinutes) {
            newErrors.endTime = 'End time must be after start time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateInvite = () => {
        if (validateForm()) {
            setShowSuccessPopup(true);
        }
    };

    const handleShare = async () => {
        const inviteText = `📅 Meeting Invite
👨‍🎓 Student: ${formData.studentName} (${formData.studentRollNo})
👤 Host: ${formData.hostName}
📅 Date: ${formData.date} (${formData.day})
🕐 Time: ${formData.startTime} ${formData.startPeriod} - ${formData.endTime} ${formData.endPeriod}
📋 Agenda: ${formData.meetingAgenda}
🏢 Room: ${formData.meetingRoom}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Meeting Invite',
                    text: inviteText,
                });
            } else {
                await navigator.clipboard.writeText(inviteText);
                alert('✅ Invite details copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
            alert('❌ Unable to share. Please try again.');
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
Start Time: ${formData.startTime} ${formData.startPeriod}
End Time: ${formData.endTime} ${formData.endPeriod}
Type: ${activeTab}

Generated on: ${new Date().toLocaleString()}

==================
Meeting Management System`;

        const blob = new Blob([inviteData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meeting-invite-${formData.studentRollNo || 'draft'}-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const resetForm = () => {
        setFormData({
            studentRollNo: '',
            studentName: '',
            hostName: '',
            date: '',
            day: '',
            meetingAgenda: '',
            meetingRoom: '',
            startTime: '10:00',
            startPeriod: 'AM',
            endTime: '10:30',
            endPeriod: 'AM'
        });
        setErrors({});
        setShowSuccessPopup(false);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full min-w-sm sm:max-w-sm bg-white min-h-screen">
                {/* Header */}
                <div className="px-4 py-6 text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => window.history.back()}
                                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-semibold">Meeting Invite</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleShare}
                                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleDownload}
                                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    {/* Tab Selection */}
                    <div className="flex justify-center gap-2 mt-2">
                        <button
                            onClick={() => setActiveTab('Single')}
                            className={`px-6 py-3 rounded-full text-sm font-medium w-full transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'Single'
                                ? 'text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                }`}
                            style={{
                                backgroundColor: activeTab === 'Single' ? primaryColor : undefined
                            }}
                        >
                            <User className="w-4 h-4" />
                            Single
                        </button>
                        <button
                            onClick={() => setActiveTab('PTM')}
                            className={`px-6 py-3 rounded-full text-sm font-medium w-full transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'PTM'
                                ? 'text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                }`}
                            style={{
                                backgroundColor: activeTab === 'PTM' ? primaryColor : undefined
                            }}
                        >
                            <Users className="w-4 h-4" />
                            PTM
                        </button>
                    </div>

                    {/* Invite Details */}
                    <div className="space-y-4">
                        <h2 className="text-gray-800 font-semibold text-lg">Invite Details</h2>

                        {/* Student Roll No */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Student Roll No.*"
                                value={formData.studentRollNo}
                                onChange={(e) => handleInputChange('studentRollNo', e.target.value)}
                                onFocus={() => setShowStudentDropdown(true)}
                                onBlur={() => setTimeout(() => setShowStudentDropdown(false), 200)}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-all duration-200 ${errors.studentRollNo
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-gray-200 focus:border-pink-400'
                                    }`}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            {showStudentDropdown && (
                                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
                                    {studentRollNumbers.filter(roll => roll.includes(formData.studentRollNo)).map(roll => (
                                        <div
                                            key={roll}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => {
                                                handleInputChange('studentRollNo', roll);
                                                setShowStudentDropdown(false);
                                            }}
                                        >
                                            {roll}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.studentRollNo && <p className="text-red-500 text-xs mt-1">{errors.studentRollNo}</p>}
                        </div>

                        {/* Student Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Student Name*"
                                value={formData.studentName}
                                onChange={(e) => handleInputChange('studentName', e.target.value)}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-all duration-200 ${errors.studentName
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-gray-200 focus:border-pink-400'
                                    }`}
                            />
                            {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
                        </div>

                        {/* Host Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Host Name*"
                                value={formData.hostName}
                                onChange={(e) => handleInputChange('hostName', e.target.value)}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-all duration-200 ${errors.hostName
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-gray-200 focus:border-pink-400'
                                    }`}
                            />
                            {errors.hostName && <p className="text-red-500 text-xs mt-1">{errors.hostName}</p>}
                        </div>

                        {/* Date and Day */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Date*"
                                    value={formData.date ? new Date(formData.date).toLocaleDateString() : ''}
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    readOnly
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-all duration-200 cursor-pointer ${errors.date
                                        ? 'border-red-400'
                                        : 'border-gray-200 hover:border-pink-300'
                                        }`}
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}

                                {/* Custom Calendar */}
                                {showCalendar && (
                                    <div className="absolute top-full right-0 mt-2 bg-white border-2 rounded-xl shadow-xl z-20 w-80">
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
                                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-1">
                                                {getDaysInMonth(currentMonth).map((day, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleDateSelect(day)}
                                                        disabled={!day}
                                                        className={`h-9 w-9 text-sm rounded-lg flex items-center justify-center transition-all duration-200 ${day ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'
                                                            } ${isSelectedDate(day)
                                                                ? 'text-white font-semibold shadow-lg transform scale-110'
                                                                : 'text-gray-700'
                                                            }`}
                                                        style={{
                                                            backgroundColor: isSelectedDate(day) ? primaryColor : 'transparent'
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
                            <input
                                type="text"
                                placeholder="Day"
                                value={formData.day}
                                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none text-sm bg-gray-50"
                                readOnly
                            />
                        </div>

                        {/* Meeting Agenda */}
                        <div>
                            <input
                                type="text"
                                placeholder="Meeting Agenda*"
                                value={formData.meetingAgenda}
                                onChange={(e) => handleInputChange('meetingAgenda', e.target.value)}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-all duration-200 ${errors.meetingAgenda
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-gray-200 focus:border-pink-400'
                                    }`}
                            />
                            {errors.meetingAgenda && <p className="text-red-500 text-xs mt-1">{errors.meetingAgenda}</p>}
                        </div>

                        {/* Meeting Room */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Meeting Room*"
                                value={formData.meetingRoom}
                                onChange={(e) => handleInputChange('meetingRoom', e.target.value)}
                                onFocus={() => setShowRoomDropdown(true)}
                                onBlur={() => setTimeout(() => setShowRoomDropdown(false), 200)}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-sm transition-all duration-200 ${errors.meetingRoom
                                    ? 'border-red-400 focus:border-red-500'
                                    : 'border-gray-200 focus:border-pink-400'
                                    }`}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            {showRoomDropdown && (
                                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
                                    {meetingRooms.map(room => (
                                        <div
                                            key={room}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors"
                                            onClick={() => {
                                                handleInputChange('meetingRoom', room);
                                                setShowRoomDropdown(false);
                                            }}
                                        >
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {room}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.meetingRoom && <p className="text-red-500 text-xs mt-1">{errors.meetingRoom}</p>}
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-4">
                        <div className="flex justify-between gap-4">
                            <div className="space-y-2 flex-1">
                                <h3 className="text-gray-700 font-medium text-sm flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Start Time
                                </h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                                        className="flex-1 px-3 py-2 text-center border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-400"
                                    />
                                    <div className="flex rounded-lg overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange('startPeriod', 'AM')}
                                            className={`px-3 py-2 text-xs font-medium transition-colors ${formData.startPeriod === 'AM'
                                                ? 'text-white'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                            style={{
                                                backgroundColor: formData.startPeriod === 'AM' ? primaryColor : undefined
                                            }}
                                        >
                                            AM
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange('startPeriod', 'PM')}
                                            className={`px-3 py-2 text-xs font-medium transition-colors ${formData.startPeriod === 'PM'
                                                ? 'text-white'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                            style={{
                                                backgroundColor: formData.startPeriod === 'PM' ? primaryColor : undefined
                                            }}
                                        >
                                            PM
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 flex-1">
                                <h3 className="text-gray-700 font-medium text-sm flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    End Time
                                </h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                                        className="flex-1 px-3 py-2 text-center border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-pink-400"
                                    />
                                    <div className="flex rounded-lg overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange('endPeriod', 'AM')}
                                            className={`px-3 py-2 text-xs font-medium transition-colors ${formData.endPeriod === 'AM'
                                                ? 'text-white'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                            style={{
                                                backgroundColor: formData.endPeriod === 'AM' ? primaryColor : undefined
                                            }}
                                        >
                                            AM
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleInputChange('endPeriod', 'PM')}
                                            className={`px-3 py-2 text-xs font-medium transition-colors ${formData.endPeriod === 'PM'
                                                ? 'text-white'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                }`}
                                            style={{
                                                backgroundColor: formData.endPeriod === 'PM' ? primaryColor : undefined
                                            }}
                                        >
                                            PM
                                        </button>
                                    </div>
                                </div>
                                {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Create Invite Button */}
                    <button
                        onClick={handleCreateInvite}
                        className="w-full text-white py-4 rounded-xl font-semibold text-lg mt-8 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95"
                        style={{ backgroundColor: primaryColor }}
                    >
                        Create Invite
                    </button>
                </div>

                {/* Success Popup */}
                {showSuccessPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-pulse">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Success! 🎉</h3>
                                <p className="text-gray-600">
                                    Meeting invite has been successfully created for <strong>{formData.studentName}</strong>
                                </p>
                                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                                    <p><strong>📅 Date:</strong> {formData.date} ({formData.day})</p>
                                    <p><strong>🕐 Time:</strong> {formData.startTime} {formData.startPeriod} - {formData.endTime} {formData.endPeriod}</p>
                                    <p><strong>🏢 Room:</strong> {formData.meetingRoom}</p>
                                    <p><strong>📋 Agenda:</strong> {formData.meetingAgenda}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-medium transition-colors hover:bg-blue-600"
                                    >
                                        Share
                                    </button>
                                    <button
                                        onClick={resetForm}
                                        className="flex-1 text-white py-3 rounded-xl font-medium transition-colors hover:opacity-90"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        Create New
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