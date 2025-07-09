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
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                                <div className="text-center justify-center items-center w-full space-y-4">
                                    <div className="flex items-center justify-center">
                                        <div
                                            className="rounded-full bg-[#473F970D] w-[80px] h-[80px] flex items-center justify-center"
                                            style={{ opacity: 1 }}
                                        >
                                            <div
                                                className="rounded-full w-[47.62px] h-[47.62px] flex items-center justify-center bg-green-400"
                                                style={{ opacity: 1 }}
                                            >
                                                <Check className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center font-medium text-[20px] leading-[100%] font-[Poppins] pt-6">
                                        The meeting has been cancelled successfully
                                    </p>

                                    <div className="flex gap-3 pt-8">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 text-white py-3 rounded-xl transition-colors hover:opacity-90 bg-primary"

                                        >
                                            Go back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CancelMeetingPopup;