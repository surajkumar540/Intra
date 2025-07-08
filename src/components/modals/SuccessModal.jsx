import { Check } from "lucide-react";

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Success!", 
  message = "The operation was completed successfully",
  primaryColor = "#FE697D",
  buttonText = "Go Back"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center justify-center items-center w-full space-y-4">
          <div className="flex items-center justify-center">
            <div
              className="rounded-full bg-[#473F970D] w-[80px] h-[80px] flex items-center justify-center"
              style={{ opacity: 1 }}
            >
              <div
                className="rounded-full w-[47.62px] h-[47.62px] flex items-center justify-center bg-green-400"
                style={{ opacity: 1 }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-center font-medium text-[20px] leading-[100%] font-[Poppins] pt-6">
            {message}
          </p>

          <div className="flex gap-3 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-white py-3 rounded-xl transition-colors hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}