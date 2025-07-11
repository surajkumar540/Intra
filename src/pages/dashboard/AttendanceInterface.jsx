import React, { useState } from 'react';
import { Phone } from 'lucide-react';

export default function AttendanceInterface() {
    const [activeFilter, setActiveFilter] = useState('frequentAbsent');

    const students = [
        {
            id: 1,
            name: "Aman Sharma",
            rollNo: "11",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&faceindex=1",
            status: "absent"
        },
        {
            id: 2,
            name: "Priya Patel",
            rollNo: "07",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b39393f6?w=40&h=40&fit=crop&crop=face&faceindex=1",
            status: "absent"
        },
        {
            id: 3,
            name: "Rahul Kumar",
            rollNo: "15",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&faceindex=1",
            status: "absent"
        },
        {
            id: 4,
            name: "Sneha Gupta",
            rollNo: "23",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&faceindex=1",
            status: "absent"
        },
        {
            id: 5,
            name: "Arjun Singh",
            rollNo: "03",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&faceindex=1",
            status: "present"
        },
        {
            id: 6,
            name: "Kavya Reddy",
            rollNo: "19",
            avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face&faceindex=1",
            status: "present"
        }
    ];

    const filteredStudents = students.filter(student => {
        if (activeFilter === 'frequentAbsent') return student.status === 'absent';
        if (activeFilter === 'studentWith80') return student.status === 'present';
        return true;
    });

    const absentCount = students.filter(s => s.status === 'frequentAbsent').length;
    const presentCount = students.filter(s => s.status === 'studentWith80').length;

    return (
        <div className="max-w-md mx-auto rounded-t-3xl mt-2 bg-gray-50 py-4 px-4 pb-10">
            <div className="flex justify-center gap-4 my-4">
                <button
                    onClick={() => setActiveFilter('frequentAbsent')}
                    className={`w-full h-[44px] p-[10px] rounded-[40px] text-sm font-medium transition-all duration-200 flex items-center justify-center gap-[10px] font-poppins ${activeFilter === "frequentAbsent"
                        ? "text-primary border border-primary bg-[#FE697D1A]"
                        : "text-black/70 border border-black/50 hover:bg-[#FE697D1A]"
                        }`}
                >
                    Frequent Absent
                </button>

                <button
                    onClick={() => setActiveFilter('studentWith80')}
                    className={`w-full h-[44px] p-[10px] rounded-[40px] text-sm font-medium transition-all duration-200 flex items-center justify-center gap-[10px] font-poppins ${activeFilter === "studentWith80"
                        ? "text-primary border bg-[#FE697D1A] border-primary"
                        : "text-black/70 border border-black/50 hover:bg-[#FE697D1A]"
                        }`}
                >
                    {` Student with > 80% `}
                </button>
            </div>
            {/* Student Cards */}
            <div className="space-y-3">
                {filteredStudents.map((student) => (
                    <div key={student.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={student.avatar}
                                        alt={student.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 text-sm">
                                        Name - {student.name}
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        Roll No. - {student.rollNo}
                                    </div>
                                </div>
                            </div>

                            <button className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                                <Phone className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 text-center text-sm text-gray-600">
                Showing {filteredStudents.length} students
                {activeFilter === 'frequentAbsent' && ` (${absentCount} frequent absent)`}
                {activeFilter === 'studentWith80' && ` (${presentCount} with >80% attendance)`}
            </div>
        </div>
    );
}