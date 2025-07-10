import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function OtpInput() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state
  const email = location.state?.email || "your email";

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // If no email in state, redirect back to forgot password
    if (!location.state?.email) {
      navigate("/forgot-password");
      return;
    }

    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [navigate, location.state]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value !== "" && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user starts typing

    // Auto-focus next input
    if (value !== "" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If current input is empty, focus previous input
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 5);

    if (digits.length > 0) {
      const newOtp = [...otp];
      digits.split("").forEach((digit, index) => {
        if (index < 5) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      const focusIndex = nextEmptyIndex === -1 ? 4 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 5) {
      setError("Please enter complete OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Here you would typically make an API call to verify the OTP
      // Example API call (replace with your actual endpoint):
      /*
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: location.state?.email, 
          otp: otpValue 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid OTP');
      }
      
      const data = await response.json();
      */

      // For demonstration, we'll simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success/failure (remove this in production)
      if (otpValue === "12345") {
        console.log("OTP verified successfully!");
        navigate("/set-new-password", { state: { email: location.state?.email } });
        setVerified(true);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Here you would typically make an API call to resend the OTP
      // Example API call (replace with your actual endpoint):
      /*
      const response = await fetch('/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: location.state?.email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to resend OTP');
      }
      */

      // For demonstration, we'll simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("OTP resent successfully!");
      alert("OTP has been resent to your email!");

      // Clear current OTP
      setOtp(["", "", "", "", ""]);
      // Focus first input
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

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
            Check your email
          </p>

          <p className="font-poppins font-normal text-[14px] leading-[14px] tracking-[0px] text-[#989898]">
            We sent an OTP to {email} <br /> Enter the 5 digit code mentioned in
            the email
          </p>
        </div>

        {/* Main Content - Fixed layout */}
        <div className="py-8 w-full">
          <div className="space-y-8">
            {/* OTP Input - Stable positioning */}
            <div className="space-y-6">
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                    className={`w-14 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none transition-colors duration-200 focus:ring-0 focus:ring-offset-0 ${error
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-primary hover:border-gray-300"
                      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                      boxSizing: "border-box",
                      margin: 0,
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-center">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              {/* Verify Button - Stable positioning */}
              <button
                onClick={handleVerify}
                disabled={!isComplete || isLoading}
                className="w-full bg-primary disabled:bg-primary/40 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  boxSizing: "border-box",
                  minHeight: "48px",
                }}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>

              {/* Resend Link - Stable positioning */}
              <div className="text-center">
                <span className="text-gray-500">
                  Haven't got the email yet?{" "}
                </span>
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-primary font-medium transition-colors duration-200 focus:outline-none focus:underline active:scale-95 underline disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxSizing: "border-box",
                  }}
                >
                  {isLoading ? "Sending..." : "Resend email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpInput;