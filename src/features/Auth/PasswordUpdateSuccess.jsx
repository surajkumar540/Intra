import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/UI/Button';
export default function PasswordUpdateSuccess() {
  const navigate = useNavigate();



  useEffect(() => {
    localStorage.removeItem("passwordUpdated");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-8 max-w-sm w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <BadgeCheck className="w-8 h-8 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="font-poppins font-normal text-[18px] leading-[100%] tracking-[0px] text-[#333333] text-center mb-2">
          New Password Updated
        </h1>


        {/* Description */}
        <p className="font-openSans font-normal text-[16px] leading-[24px] tracking-[0px] text-[#989898] text-center mb-6">
          Congratulations! Your password has been changed. Click continue to login
        </p>


        {/* Continue Button */}

        <Button
          onClick={() => navigate("/login")}
          className="w-full text-white py-3 rounded-2xl font-medium mt-6 flex items-center justify-center space-x-2 hover:opacity-90 bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>Log In</span>
        </Button>
      </div>
    </div>
  );
}