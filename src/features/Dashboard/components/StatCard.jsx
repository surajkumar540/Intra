import React from "react";

const StatCard = ({ label, value, onClick, variant = "secondary" }) => {
  const baseClasses =
    "rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden";

  const variantStyles = {
    primary: {
      className: "text-white hover:opacity-90 bg-dual-gradient",
      textColor: "text-gray-200",
    },
    secondary: {
      className: "hover:bg-gray-300",
      textColor: "text-gray-800",
      style: {
        width: "165px",
        height: "76px",
        background:
          "linear-gradient(0deg, #E8E8E8, #E8E8E8), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
        opacity: 1,
      },
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={`${baseClasses} ${currentVariant.className}`}
      style={currentVariant.style}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>
      <div className="relative z-2 h-full">
        <div
          className={`flex items-center justify-between h-full text-sm ${currentVariant.textColor} font-poppins`}
        >
          <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
            {label}
          </p>
          <p className="font-poppins font-medium text-[18px] leading-[100%] tracking-[0%]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
