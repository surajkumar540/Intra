import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpField from "../../components/OTP/OtpField";
import Button from "../../components/UI/Button";

const VerifyOtp = () => {
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

        <OtpField otp={otp} setOtp={setOtp} email={email} />

        <Button
              onClick={handleVerify}
              disabled={!isComplete}
              className="w-full text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {!isComplete ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm font-medium">Verifying...</span>
                </div>
              ) : (
                <>
                  <span>Verify Code</span>
                </>
              )}
            </Button>
      </div>
    </div>
  );
};

export default VerifyOtp;
