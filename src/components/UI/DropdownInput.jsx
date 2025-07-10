import React, { useState } from "react";
import {
  ChevronDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

// Your DropdownInput component (included for demonstration)
const DropdownInput = ({
  type = "text",
  label = "",
  value,
  onChange,
  onBlur,
  onFocus,
  onSelect,
  placeholder = "",
  dropdownData = [],
  showDropdown,
  setShowDropdown,
  error = "",
  icon = null,
  name,
  className = "",
  inputClassName = "",
  dropdownClassName = "",
  labelClassName = "",
  disabled = false,
  required = false,
  maxDropdownHeight = "max-h-40",
  filterData = true,
  caseSensitive = false,
  allowCustomValue = true,
  noDataMessage = "No options found",
  containerClassName = "",
  iconPosition = "right",
  ...rest
}) => {
  const [internalShowDropdown, setInternalShowDropdown] = useState(false);
  const dropdownRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Use internal state if showDropdown is not provided
  const isDropdownVisible =
    showDropdown !== undefined ? showDropdown : internalShowDropdown;
  const toggleDropdown = setShowDropdown || setInternalShowDropdown;

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible, toggleDropdown]);

  // Filter dropdown data based on input value
  const filteredData = filterData
    ? dropdownData.filter((item) => {
        const itemStr = item.toString();
        const valueStr = value?.toString() || "";
        return caseSensitive
          ? itemStr.includes(valueStr)
          : itemStr.toLowerCase().includes(valueStr.toLowerCase());
      })
    : dropdownData;

  const handleInputFocus = (e) => {
    if (!disabled) {
      onFocus?.(e);
      toggleDropdown(true);
    }
  };

  const handleInputBlur = (e) => {
    onBlur?.(e);
    // Small delay to allow dropdown clicks to register
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        toggleDropdown(false);
      }
    }, 200);
  };

  const handleOptionClick = (item) => {
    const syntheticEvent = {
      target: { name, value: item },
    };
    onChange(syntheticEvent);
    onSelect?.(item, syntheticEvent);
    toggleDropdown(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      toggleDropdown(false);
    } else if (e.key === "ArrowDown" && !isDropdownVisible) {
      toggleDropdown(true);
    }
  };

  const iconLeftPadding = icon && iconPosition === "left" ? "pl-[45px]" : "";
  const iconRightPadding = icon && iconPosition === "right" ? "pr-[45px]" : "";

  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>
      <div className={`relative ${className}`}>
        <input
          ref={inputRef}
          type={type}
          value={value || ""}
          name={name}
          onChange={onChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`${iconLeftPadding} ${iconRightPadding} ${inputClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />

        {/* Floating label */}
        {label && !value && (
          <label
            className={`absolute ${
              iconPosition === "left" ? "left-[45px]" : "left-[20px]"
            } top-[35%] pointer-events-none font-poppins font-medium text-[14px] text-[#3333334D] transition-all duration-200 ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Icon */}
        {icon && (
          <div
            className={`absolute ${
              iconPosition === "left" ? "left-3" : "right-3"
            } top-[20%] w-4 h-4 text-gray-400 pointer-events-none`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownVisible && dropdownData.length > 0 && (
        <div
          className={`absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 ${maxDropdownHeight} overflow-y-auto shadow-lg ${dropdownClassName}`}
        >
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl"
                onClick={() => handleOptionClick(item)}
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              {noDataMessage}
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      <div className="min-h-[20px]">
        {error && (
          <p className="text-red-500 pb-4 pt-2 pl-1 text-xs animate-in fade-in duration-200">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
