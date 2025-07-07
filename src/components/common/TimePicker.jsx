import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

const TimePicker = ({
  // Basic props
  initialStartTime = { hour: 9, minute: 0, period: "AM" },
  initialEndTime = { hour: 5, minute: 0, period: "PM" },
  onTimeChange,

  // Styling props
  primaryColor = "#3B82F6",
  className = "",

  // Configuration props
  showEndTime = true,
  startLabel = "Start Time",
  endLabel = "End Time",
  quickSelectTimes = [
    { hour: 9, minute: 0, period: "AM", label: "9:00 AM" },
    { hour: 12, minute: 0, period: "PM", label: "12:00 PM" },
    { hour: 1, minute: 0, period: "PM", label: "1:00 PM" },
    { hour: 2, minute: 0, period: "PM", label: "2:00 PM" },
    { hour: 3, minute: 0, period: "PM", label: "3:00 PM" },
    { hour: 4, minute: 0, period: "PM", label: "4:00 PM" },
    { hour: 5, minute: 0, period: "PM", label: "5:00 PM" },
    { hour: 6, minute: 0, period: "PM", label: "6:00 PM" },
  ],

  // Validation props
  minStartTime = null, // { hour: 8, minute: 0, period: 'AM' }
  maxEndTime = null, // { hour: 10, minute: 0, period: 'PM' }

  // API props
  onApiCall = null,
  apiEndpoint = "",
  autoSave = false,
  saveDelay = 1000, // milliseconds

  // Additional props
  disabled = false,
  required = false,
  error = "",
  size = "medium", // 'small', 'medium', 'large'
}) => {
  const [formData, setFormData] = useState({
    startHour: initialStartTime.hour,
    startMinute: initialStartTime.minute,
    startPeriod: initialStartTime.period,
    endHour: initialEndTime.hour,
    endMinute: initialEndTime.minute,
    endPeriod: initialEndTime.period,
  });

  const [showTimePicker, setShowTimePicker] = useState(null);
  const [tempTime, setTempTime] = useState({
    hour: 10,
    minute: 0,
    period: "AM",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

  // Size configurations
  const sizeConfig = {
    small: {
      timeButton: "text-lg px-3 py-1 ",
      periodButton: "px-3 py-2 text-xs",
      picker: "text-2xl",
      container: "p-6",
    },
    medium: {
      timeButton: "text-2xl px-4 py-3 min-w-[120px]",
      periodButton: "px-4 py-3 text-sm",
      picker: "text-3xl",
      container: "p-8",
    },
    large: {
      timeButton: "text-3xl px-6 py-4 min-w-[140px]",
      periodButton: "px-6 py-4 text-base",
      picker: "text-4xl",
      container: "p-10",
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;

  // Update form data when initial values change
  useEffect(() => {
    setFormData({
      startHour: initialStartTime.hour,
      startMinute: initialStartTime.minute,
      startPeriod: initialStartTime.period,
      endHour: initialEndTime.hour,
      endMinute: initialEndTime.minute,
      endPeriod: initialEndTime.period,
    });
  }, [initialStartTime, initialEndTime]);

  // Convert time to 24-hour format for comparison
  const to24Hour = (hour, period) => {
    if (period === "AM") {
      return hour === 12 ? 0 : hour;
    } else {
      return hour === 12 ? 12 : hour + 12;
    }
  };

  // Validate time ranges
  const validateTime = useCallback((startTime, endTime) => {
    const startHour24 = to24Hour(startTime.hour, startTime.period);
    const endHour24 = to24Hour(endTime.hour, endTime.period);

    const startMinutes = startHour24 * 60 + startTime.minute;
    const endMinutes = endHour24 * 60 + endTime.minute;

    return endMinutes > startMinutes;
  }, []);

  // Handle API calls
  const handleApiCall = useCallback(
    async (timeData) => {
      if (!onApiCall && !apiEndpoint) return;

      setIsLoading(true);
      try {
        if (onApiCall) {
          await onApiCall(timeData);
        } else if (apiEndpoint) {
          await fetch(apiEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(timeData),
          });
        }
      } catch (error) {
        console.error("API call failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onApiCall, apiEndpoint]
  );

  // Handle time change with validation and API calls
  const handleTimeChange = useCallback(
    (newFormData) => {
      const timeData = {
        startTime: {
          hour: newFormData.startHour,
          minute: newFormData.startMinute,
          period: newFormData.startPeriod,
        },
        endTime: {
          hour: newFormData.endHour,
          minute: newFormData.endMinute,
          period: newFormData.endPeriod,
        },
      };

      // Validate time range
      if (showEndTime && !validateTime(timeData.startTime, timeData.endTime)) {
        console.warn("End time must be after start time");
        return;
      }

      // Call onChange callback
      if (onTimeChange) {
        onTimeChange(timeData);
      }

      // Handle auto-save
      if (autoSave && (onApiCall || apiEndpoint)) {
        if (saveTimeout) {
          clearTimeout(saveTimeout);
        }

        const timeout = setTimeout(() => {
          handleApiCall(timeData);
        }, saveDelay);

        setSaveTimeout(timeout);
      }
    },
    [
      showEndTime,
      validateTime,
      onTimeChange,
      autoSave,
      onApiCall,
      apiEndpoint,
      saveDelay,
      saveTimeout,
      handleApiCall,
    ]
  );

  // Effect to handle form data changes
  useEffect(() => {
    handleTimeChange(formData);
  }, [
    formData.startHour,
    formData.startMinute,
    formData.startPeriod,
    formData.endHour,
    formData.endMinute,
    formData.endPeriod,
  ]);

  const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeSelect = (type) => {
    if (disabled) return;

    if (type === "start") {
      setTempTime({
        hour: formData.startHour,
        minute: formData.startMinute,
        period: formData.startPeriod,
      });
    } else {
      setTempTime({
        hour: formData.endHour,
        minute: formData.endMinute,
        period: formData.endPeriod,
      });
    }
    setShowTimePicker(type);
  };

  const confirmTimeSelection = () => {
    if (showTimePicker === "start") {
      setFormData((prev) => ({
        ...prev,
        startHour: tempTime.hour,
        startMinute: tempTime.minute,
        startPeriod: tempTime.period,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        endHour: tempTime.hour,
        endMinute: tempTime.minute,
        endPeriod: tempTime.period,
      }));
    }
    setShowTimePicker(null);
  };

  const adjustTime = (field, increment) => {
    setTempTime((prev) => {
      let newValue = prev[field];

      if (field === "hour") {
        if (increment) {
          newValue = newValue >= 12 ? 1 : newValue + 1;
        } else {
          newValue = newValue <= 1 ? 12 : newValue - 1;
        }
      } else if (field === "minute") {
        if (increment) {
          newValue = newValue >= 59 ? 0 : newValue + 1;
        } else {
          newValue = newValue <= 0 ? 59 : newValue - 1;
        }
      }

      return {
        ...prev,
        [field]: newValue,
      };
    });
  };

  const quickTimeSelect = (hour, minute, period) => {
    setTempTime({
      hour,
      minute,
      period,
    });
  };

  const TimeDisplay = ({ label, hour, minute, period, type }) => (
    <div className="space-y-4 flex-1 relative ">
      <div className="flex items-center gap-2">
        <h3 className="text-gray-700 font-medium text-lg">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        )}
      </div>

      <div className="flex items-center gap-3 ">
        <button
          type="button"
          onClick={() => handleTimeSelect(type)}
          disabled={disabled}
          className={`font-semibold text-gray-800 bg-gray-50 rounded-lg border-2 border-gray-200 text-center hover:bg-gray-100 transition-colors focus:outline-none focus:border-pink-400 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentSize.timeButton
          } ${error ? "border-red-300" : ""}`}
        >
          {formatTime(hour, minute)}
        </button>

        <div className="flex rounded-lg overflow-hidden border-2 border-gray-200">
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              const newFormData = { ...formData };
              if (type === "start") {
                newFormData.startPeriod = "AM";
              } else {
                newFormData.endPeriod = "AM";
              }
              setFormData(newFormData);
            }}
            className={`font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              currentSize.periodButton
            } ${
              period === "AM"
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: period === "AM" ? primaryColor : undefined,
            }}
          >
            AM
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              const newFormData = { ...formData };
              if (type === "start") {
                newFormData.startPeriod = "PM";
              } else {
                newFormData.endPeriod = "PM";
              }
              setFormData(newFormData);
            }}
            className={`font-medium transition-colors border-l border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentSize.periodButton
            } ${
              period === "PM"
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: period === "PM" ? primaryColor : undefined,
            }}
          >
            PM
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {showTimePicker === type && (
        <div
          className={`absolute bottom-0 ${
            showTimePicker === "start" ? "left-0" : "right-0"
          } right-0 mt-2 bg-white border-2 rounded-lg shadow-xl z-20 min-w-[300px]`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium text-gray-800">
              Select {label}
            </h3>
            <button
              onClick={() => setShowTimePicker(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => adjustTime("hour", true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                </button>
                <div
                  className={`px-4 py-2 font-bold text-gray-800 min-w-[80px] text-center ${currentSize.picker}`}
                >
                  {tempTime.hour.toString().padStart(2, "0")}
                </div>
                <button
                  type="button"
                  onClick={() => adjustTime("hour", false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className={`font-bold text-gray-800 ${currentSize.picker}`}>
                :
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => adjustTime("minute", true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                </button>
                <div
                  className={`px-4 py-2 font-bold text-gray-800 min-w-[80px] text-center ${currentSize.picker}`}
                >
                  {tempTime.minute.toString().padStart(2, "0")}
                </div>
                <button
                  type="button"
                  onClick={() => adjustTime("minute", false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <button
                  type="button"
                  onClick={() =>
                    setTempTime((prev) => ({ ...prev, period: "AM" }))
                  }
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    tempTime.period === "AM"
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      tempTime.period === "AM" ? primaryColor : undefined,
                  }}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTempTime((prev) => ({ ...prev, period: "PM" }))
                  }
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    tempTime.period === "PM"
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      tempTime.period === "PM" ? primaryColor : undefined,
                  }}
                >
                  PM
                </button>
              </div>
            </div>

            {quickSelectTimes.length > 0 && (
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3">Quick Select:</p>
                <div className="grid grid-cols-4 gap-2">
                  {quickSelectTimes.map((time) => (
                    <button
                      key={time.label}
                      type="button"
                      onClick={() =>
                        quickTimeSelect(time.hour, time.minute, time.period)
                      }
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                        tempTime.hour === time.hour &&
                        tempTime.minute === time.minute &&
                        tempTime.period === time.period
                          ? "text-white border-pink-400"
                          : "text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      style={{
                        backgroundColor:
                          tempTime.hour === time.hour &&
                          tempTime.minute === time.minute &&
                          tempTime.period === time.period
                            ? primaryColor
                            : undefined,
                      }}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowTimePicker(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmTimeSelection}
                className="px-6 py-2 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`max-w-4xl mx-auto bg-white ${currentSize.container} ${className}`}
    >
      <div className="space-y-8">
        <div
          className={`flex gap-8 ${
            showEndTime ? "justify-between" : "justify-start"
          }`}
        >
          <TimeDisplay
            label={startLabel}
            hour={formData.startHour}
            minute={formData.startMinute}
            period={formData.startPeriod}
            type="start"
          />

          {showEndTime && (
            <TimeDisplay
              label={endLabel}
              hour={formData.endHour}
              minute={formData.endMinute}
              period={formData.endPeriod}
              type="end"
            />
          )}
        </div>
      </div>

      {showTimePicker && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowTimePicker(null)}
        />
      )}
    </div>
  );
};
export default TimePicker;
