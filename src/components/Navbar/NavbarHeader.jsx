// NavbarHeader.jsx
import React from "react";
import { CircleUser, Settings, ChevronLeft } from "lucide-react";

const NavbarHeader = ({
  logo,
  logoAlt = "Logo",
  logoStyle = {},
  showArrow = false,
  onArrowClick,
  text = "",
  textStyle = {},
  icons = [], // Array of icon objects: [{ icon: IconComponent, onClick: fn, label: string }]
  className = "",
  children,
  backgroundColor = "bg-primary",
  textColor = "text-white",
  style = {}, // Support for inline styles
  // Legacy props for backward compatibility
  showUserIcon = false,
  showSettingsIcon = false,
  onUserClick,
  onSettingsClick,
}) => {
  // Combine legacy icons with new dynamic icons
  const allIcons = [...icons];

  // Add legacy icons if specified
  if (showUserIcon) {
    allIcons.push({
      icon: CircleUser,
      onClick: onUserClick,
      label: "User profile",
    });
  }

  if (showSettingsIcon) {
    allIcons.push({
      icon: Settings,
      onClick: onSettingsClick,
      label: "Settings",
    });
  }

  return (
    <div className="sticky top-0 z-50" style={{ backgroundColor: "#FE697D" }}>
      <div
        className={` ${backgroundColor} ${textColor} ${className}  z-40`}
        style={style}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 overflow-hidden max-w-full">
            {/* Arrow Icon (when logo is present) */}
            {showArrow && (
              <button
                onClick={onArrowClick}
                className="p-1"
                aria-label="Go back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Logo */}
            {logo && (
              <div className="max-w-[126px] h-[48px] overflow-hidden flex items-center shrink-0">
                <img
                  src={logo}
                  alt={logoAlt}
                  className="object-contain h-full w-auto"
                  style={{
                    opacity: 1,
                    ...logoStyle,
                  }}
                />
              </div>
            )}

            {/* Text (when no logo or alongside logo) */}
            {text && (
              <div
                className="font-medium text-lg truncate"
                style={{
                  maxWidth: "100%",
                  ...textStyle,
                }}
              >
                {text}
              </div>
            )}

            {/* Custom children */}
            {children && <div className="flex items-center">{children}</div>}
          </div>

          {/* Dynamic Action Icons */}
          <div className="flex items-center space-x-3">
            {allIcons.map((iconConfig, index) => {
              const IconComponent = iconConfig.icon;
              return (
                <button
                  key={index}
                  onClick={iconConfig.onClick}
                  className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                  aria-label={iconConfig.label || `Icon ${index + 1}`}
                >
                  <IconComponent className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
