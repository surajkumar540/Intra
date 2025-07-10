import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccess() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/set-new-password");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Password Reset</h1>

        <p className="text-gray-600 text-sm">
          Your password has been successfully reset.<br />
          Click confirm to set a new password.
        </p>

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
