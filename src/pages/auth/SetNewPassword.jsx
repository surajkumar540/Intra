import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoEyeClosed } from "react-icons/go";
import { AiFillEye } from "react-icons/ai";
import PasswordUpdateSuccess from "./PasswordUpdateSuccess";

function SetNewPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from location state
    const email = location.state?.email || "your email";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [updated, setUpdated] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // If no email in state, redirect back to forgot password
        if (!location.state?.email) {
            navigate("/forgot-password");
            return;
        }
    }, [navigate, location.state]);

    const validatePassword = () => {
        const newErrors = {};

        // Password validation
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!/(?=.*[a-z])/.test(password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/(?=.*\d)/.test(password)) {
            newErrors.password = "Password must contain at least one number";
        } else if (!/(?=.*[@$!%*?&])/.test(password)) {
            newErrors.password = "Password must contain at least one special character";
        }

        // Confirm password validation
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResetPassword = async () => {
        if (!validatePassword()) return;

        setIsLoading(true);

        try {
            // Here you would typically make an API call to reset the password
            // Example API call (replace with your actual endpoint):
            /*
            const response = await fetch('/api/reset-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                email: location.state?.email, 
                password: password 
              }),
            });
            
            if (!response.ok) {
              throw new Error('Failed to reset password');
            }
            
            const data = await response.json();
            */

            // For demonstration, we'll simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Password reset successfully!");
            setUpdated(true);
            localStorage.setItem("passwordUpdated", "true");
            // navigate("/login");

        } catch (error) {
            console.error("Password reset failed:", error);
            setErrors({ general: "Failed to reset password. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const isPasswordUpdated = localStorage.getItem("passwordUpdated");
        if (isPasswordUpdated) {
            navigate("/welcome");
        }
    }, [navigate]);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Clear errors when user starts typing
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: "" }));
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Clear errors when user starts typing
        if (errors.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "" }));
        }
    };

    if (updated) {
        return <PasswordUpdateSuccess />
    }

    return (
        <div className="min-h-screen bg-white flex justify-center px-4 py-8">
            <div className="w-full max-w-sm">
                {/* Header - Fixed positioning */}
                <button
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors duration-200 active:scale-95"
                    onClick={() => navigate("/forgot-password")}
                    disabled={isLoading}
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="flex flex-col gap-4 mt-12">
                    <p className="font-medium text-lg leading-tight text-gray-900">
                        Set new password
                    </p>

                    <p className="font-poppins font-normal text-[14px] leading-[14px] tracking-[0px] text-[#989898]">
                        Create a new password. Ensure it differs from previous ones for security
                    </p>
                </div>

                {/* Main Content - Fixed layout */}
                <div className="py-8 w-full">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {/* General Error Message */}
                            {errors.general && (
                                <div className="text-center">
                                    <p className="text-sm text-red-500">{errors.general}</p>
                                </div>
                            )}

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="font-openSans font-semibold text-[16px] leading-[19.1px] tracking-[-0.48px]">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        disabled={isLoading}
                                        className={`w-full text-primary px-4 py-3 pr-12 bg-[#F3F3F3] border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.password
                                            ? "border-red-300 focus:border-red-500"
                                            : "border-gray-200 focus:border-primary"
                                            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                    >
                                        {showPassword ? (
                                            <GoEyeClosed className="w-5 h-5" />
                                        ) : (
                                            <AiFillEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <label className="font-openSans font-semibold text-[16px] leading-[19.1px] tracking-[-0.48px]">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        disabled={isLoading}
                                        className={`w-full text-primary px-4 py-3 pr-12 bg-[#F3F3F3] border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.confirmPassword
                                            ? "border-red-300 focus:border-red-500"
                                            : "border-gray-200 focus:border-primary"
                                            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                    >
                                        {showConfirmPassword ? (
                                            <GoEyeClosed className="w-5 h-5" />
                                        ) : (
                                            <AiFillEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">Password must contain:</p>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className={`text-sm ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                                            At least 8 characters
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${/(?=.*[a-z])/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className={`text-sm ${/(?=.*[a-z])/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            One lowercase letter
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${/(?=.*[A-Z])/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className={`text-sm ${/(?=.*[A-Z])/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            One uppercase letter
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${/(?=.*\d)/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className={`text-sm ${/(?=.*\d)/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            One number
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${/(?=.*[@$!%*?&])/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className={`text-sm ${/(?=.*[@$!%*?&])/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                            One special character
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Reset Password Button */}
                            <button
                                onClick={handleResetPassword}
                                disabled={isLoading || !password || !confirmPassword}
                                className="w-full bg-primary disabled:bg-primary/40 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                style={{
                                    boxSizing: "border-box",
                                    minHeight: "48px",
                                }}
                            >
                                {isLoading ? "Updating Password..." : updated ? "Password Updated" : "Update Password"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetNewPassword