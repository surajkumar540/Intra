// 1. AppointmentCard.jsx - Reusable card component
import React from "react";

const AppointmentCard = ({
  icon: Icon,
  title,
  count,
  onClick,
  variant = "default",
}) => {
  const baseClasses =
    "rounded-xl p-4 cursor-pointer hover:opacity-90 transition-all font-semibold text-sm relative overflow-hidden w-full sm:min-w-[165px] sm:max-w-[165px] min-h-[171px]";

  const variantClasses = {
    primary: "text-white bg-dual-gradient",
    secondary: "bg-[#E9E9E9] hover:bg-gray-200",
  };

  const textClasses = {
    primary: "text-[#F0F0F0]",
    secondary: "text-[#333333]",
  };

  const countClasses = {
    primary: "text-white",
    secondary: "text-[#000000]",
  };

  const iconClasses = {
    primary: "text-white",
    secondary: "text-gray-600",
  };

  return (
    <div
      className={`${baseClasses} ${
        variantClasses[variant] || variantClasses.secondary
      }`}
      onClick={onClick}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 opacity-100"></div>
      )}
      <div className="relative flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <Icon
            className={`w-6 h-6 ${
              iconClasses[variant] || iconClasses.secondary
            } ${title.includes("Upcoming") ? "transform scale-x-[-1]" : ""}`}
          />
        </div>
        <div className="space-y-2">
          <p
            className={`text-[16px] font-medium font-poppins ${
              textClasses[variant] || textClasses.secondary
            }`}
          >
            {title}
          </p>
          <p
            className={`text-[34px] leading-none font-semibold font-poppins ${
              countClasses[variant] || countClasses.secondary
            }`}
          >
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
