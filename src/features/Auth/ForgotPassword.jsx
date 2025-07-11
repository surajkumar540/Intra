import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleReset = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // Here you would typically make an API call to send the OTP
      // Example API call (replace with your actual endpoint):
      /*
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      */

      // For demonstration, we'll simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to verification page with email in state
      navigate("/otp-verification", { state: { email } });
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrors({ email: "Failed to send OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
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
          <p className="font-poppins font-normal text-lg leading-none text-[#333333]">
            Forgot password
          </p>

          <p className="font-poppins font-normal text-sm leading-none text-[#989898]">
            Please enter your email to reset the password
          </p>
        </div>

        <form className="rounded-3xl pt-6 space-y-5" onSubmit={handleReset}>
          <div className="space-y-2">
            <label className="font-openSans font-semibold text-[16px] leading-[19.1px] tracking-[-0.48px]">
              Your Email
            </label>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 pr-12 mb-6 border-[#F3F3F3] border-2 rounded-xl focus:outline-none transition-all duration-200 ${errors.email
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
                  }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}

            <Button
              onClick={handleReset}
              disabled={isLoading}
              className="w-full text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm font-medium">Sending...</span>
                </div>
              ) : (
                <>
                  <span>Reset Password</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;