import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [errors, setErrors] = useState({});
    const [showOtpInput, setShowOtpInput] = useState(false);

    const validateEmail = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReset = (e) => {
        e.preventDefault();
        if (!validateEmail()) return;

        // Simulate OTP being sent
        setShowOtpInput(true);
        setEmail(""); // Optional: clear email after submission
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        if (!otp || otp.length < 4) {
            setErrors({ otp: "Enter a valid 4-digit OTP" });
            return;
        }

        // Simulate OTP verification
        navigate("/login"); // Redirect to login immediately
    };

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-8">
            <div className="w-full max-w-sm">
                <button
                    className="w-10 h-10 flex items-center justify-center bg-[#ECECEC] text-black rounded-full hover:bg-gray-200 transition"
                    onClick={() => navigate("/login")}
                >
                    <IoIosArrowBack size={20} />
                </button>

                <div className="flex flex-col gap-4 my-6">
                    <p className="font-poppins font-normal text-[18px] leading-[19.1px] tracking-[0px] antialiased text-[#1E1E1E]">
                        Forgot password
                    </p>
                    <p className="font-poppins font-normal text-[14px] leading-[19.1px] tracking-[0px] antialiased">
                        {showOtpInput
                            ? "Enter the OTP sent to your email"
                            : "Please enter your email to reset the password"}
                    </p>
                </div>

                <form className="rounded-3xl space-y-5">
                    {!showOtpInput ? (
                        <div className="space-y-2">
                            <label className="font-poppins text-[14px]">Your Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full px-4 py-3 pr-12 bg-[#F3F3F3] border-2 rounded-xl focus:outline-none transition-all duration-200 ${errors.email
                                            ? "border-red-300 focus:border-red-500"
                                            : "border-gray-200 focus:border-primary"
                                        }`}
                                    placeholder="Enter your email"
                                />
                                <IoMailOutline className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                            <button
                                onClick={handleReset}
                                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                            >
                                Reset Password
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <label className="font-poppins text-[14px]">Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className={`w-full px-4 py-3 bg-[#F3F3F3] border-2 rounded-xl focus:outline-none transition-all duration-200 ${errors.otp
                                        ? "border-red-300 focus:border-red-500"
                                        : "border-gray-200 focus:border-primary"
                                    }`}
                                placeholder="Enter 4-digit OTP"
                            />
                            {errors.otp && (
                                <p className="text-sm text-red-500 mt-1">{errors.otp}</p>
                            )}
                            <button
                                onClick={handleOtpSubmit}
                                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
