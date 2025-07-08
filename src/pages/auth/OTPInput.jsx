import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OTPInput({ email = "abcd@gmail" }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value !== "" && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 5) {
      // Handle verification logic here
      console.log("OTP:", otpValue);
      alert(`OTP ${otpValue} submitted!`);
    }
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log("Resending OTP...");
    alert("OTP has been resent!");
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-white flex justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header - Fixed positioning */}
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors duration-200 active:scale-95"
          onClick={() => navigate("/forgot-password")}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col gap-4 mt-12">
          <p className="font-medium text-lg leading-tight text-gray-900">
            Check your email
          </p>

          <p className="font-poppins font-normal text-[14px] leading-[14px] tracking-[0px] text-[#989898]">
            We sent a OTP to {email} <br /> enter 5 digit code that mentioned in
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
                    className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors duration-200 hover:border-gray-300 focus:ring-0 focus:ring-offset-0"
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

              {/* Verify Button - Stable positioning */}
              <button
                onClick={handleVerify}
                disabled={!isComplete}
                className="w-full bg-primary  disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  boxSizing: "border-box",
                  minHeight: "48px",
                }}
              >
                Verify Code
              </button>

              {/* Resend Link - Stable positioning */}
              <div className="text-center">
                <span className="text-gray-500">
                  Haven't got the email yet?{" "}
                </span>
                <button
                  onClick={handleResend}
                  className="text-primary font-medium  transition-colors duration-200 focus:outline-none focus:underline active:scale-95 underline"
                  style={{
                    boxSizing: "border-box",
                  }}
                >
                  Resend email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
