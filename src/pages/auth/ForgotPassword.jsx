import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

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

    // Here you would typically make an API call to send the OTP
    // For demonstration, we'll just navigate with the email

    // Navigate to verification page with email in state
    navigate("/otp-verification", {
      state: { email: email },
    });
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

        <div className="flex flex-col gap-4 mt-12">
          <p className="font-poppins font-normal text-[18px] leading-[19.1px] tracking-[0px] antialiased text-[#1E1E1E]">
            Forgot password
          </p>

          <p className="font-poppins font-normal text-[14px] leading-[14px] tracking-[0px] text-[#989898]">
            Please enter your email to reset the password
          </p>
        </div>

        <form className="rounded-3xl  pt-6 space-y-5">
          <div className="space-y-2">
            <label className="font-openSans font-semibold text-[16px] leading-[19.1px] tracking-[-0.48px]">
              Your Email
            </label>

            <div className="relative ">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 pr-12  mb-6 border-[#F3F3F3] border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
            <button
              onClick={handleReset}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
