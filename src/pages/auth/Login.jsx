import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { GoEyeClosed } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import entraLogo from "../../assets/offical/entraBlackLogo.png"
import { useNavigate } from "react-router-dom";

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
    setFakePassword('*'.repeat(input.length));
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
                  className={`w-full px-4 py-3 text-primary pr-12 bg-[#F3F3F3] border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                    }`}
                  placeholder="Enter your email"
                />
                <IoMailOutline className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  {showPassword ? <GoEyeClosed className="w-5 h-5" /> : <AiFillEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-md text-red-500 flex items-center gap-1 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password Row */}
            <div className="flex items-center justify-between">
              {/* Remember Me - Left Side */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300  rounded-md"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer font-popins font-semibold">
                  Remember me
                </label>
              </div>

              {/* Forgot Password - Right Side */}
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80  transition-colors font-popins"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;