import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = (token) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
    setIsAuthenticated,
  };
};

export default useAuth;