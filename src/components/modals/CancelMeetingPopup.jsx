import React, { useState } from "react";
import { Check } from "lucide-react";

const CancelMeetingPopup = ({ isOpen, onClose, onConfirm, showSuccess }) => {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(reason);
        setReason(""); // Reset reason after confirmation
    };

    const handleClose = () => {
        setReason(""); // Reset reason when closing
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
                {!showSuccess ? (
                    // First popup - Confirmation
                    <>
                        <h3 className="text-[20px] leading-[100%] font-[500] font-poppins text-gray-900 mb-4">
                            Cancel your upcoming meeting?
                        </h3>

                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Your reason for cancellation..."
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                            rows={4}
                        />
                        <button
                            onClick={handleConfirm}
                            className="w-full mt-4 py-3 px-4 bg-primary text-white rounded-lg font-medium"
                        >
                            Cancel Meeting
                        </button>
                    </>
                ) : (
                    // Second popup - Success
                    <>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-6">
                                The meeting has been cancelled successfully
                            </h3>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium"
                            >
                                Go Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CancelMeetingPopup;