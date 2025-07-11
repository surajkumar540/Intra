import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import entraLogo from "../../assets/offical/entraBlackLogo.png";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";

const Login = ({ setAuth }) => {
  const navigate = useNavigate();

  const [fakePassword, setFakePassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFakePasswordChange = (e) => {
    const input = e.target.value;
    // Keep track of actual password length
    setPassword(input); // real password if needed
    setFakePassword("*".repeat(input.length));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);

        //  authentication flag
        localStorage.setItem("auth", "true");

        //  Set authentication flag
        setAuth(true);
        //  Navigate to dashboard
        navigate("/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo/Brand Section */}
        <div className="flex justify-center mb-8">
          <img src={entraLogo} alt={"image"} />
        </div>

        {/* Login Form */}
        <div className=" rounded-3xl p-6  ">
          <div className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 text-[16px] leading-[100%] text-[#989898] font-normal font-poppins pr-12 bg-[#F3F3F3] border-2 border-[#E1E1E1] rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                    }`}
                  placeholder="Enter your email"
                />

                <IoMailOutline className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898]" />
              </div>
              {errors.email && (
                <p className="text-md text-red-500 flex items-center gap-1 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full text-primary px-4 py-3 pr-12 bg-[#F3F3F3] border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                    }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <GoEyeClosed className="w-5 h-5" />
                  ) : (
                    <AiFillEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-md text-red-500 flex items-center gap-1 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password Row */}
            <div className="flex items-center justify-between pb-[20px]">
              {/* Remember Me - Left Side */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300  rounded-md"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[14px] leading-[100%] text-[#000000B2] cursor-pointer font-poppins font-normal"
                >
                  Remember me
                </label>
              </div>

              {/* Forgot Password - Right Side */}
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80  transition-colors font-poppins"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm font-medium">Logging in...</span>
                </div>
              ) : (
                <>
                  <span>Login</span>
                </>
              )}
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
