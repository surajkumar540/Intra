import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();


  // ✅ Get email from location.state
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);


  //   useEffect(() => {
  //     if (!email) {
  //       navigate("/forgot-password");
  //     }
  //   }, [email, navigate]);

  const isComplete = otp.every((val) => val !== "");

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 5) {
      console.log("Verified OTP:", otpValue);
      // Proceed with API or navigation
    }
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="max-w-sm w-full space-y-6">
        <h1 className="text-xl font-semibold text-center">Enter OTP</h1>

        <OtpInput otp={otp} setOtp={setOtp} email={email} />

        <button
          onClick={handleVerify}
          disabled={!isComplete}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${isComplete ? "bg-primary" : "bg-primary/40 cursor-not-allowed"
            }`}
        >
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
