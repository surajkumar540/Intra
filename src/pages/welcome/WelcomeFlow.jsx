import { IoIosArrowForward } from "react-icons/io";
import ProgressDots from "../../components/welcome/ProgressDot";

const WelcomeFlow = ({ image, title, description, total, activeIndex, onNext }) => {
  return (
    <div className="h-screen flex items-center justify-center px-4 py-4 ">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8 max-h-full ">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-auto mb-6 rounded-lg object-contain max-h-48" />

        {/* Title */}
        <h2 className="text-[28px] md:text-[36px] leading-10 font-bold font-poppins text-[#333333CC] tracking-normal mb-3">
          {title.split(" ").map((word, i) => (
            <span key={i}>
              {word}
              {i === 1 ? <br className="hidden md:block" /> : " "}
            </span>
          ))}
        </h2>


        {/* Description */}
        <p className="text-[18px] md:text-[24px] text-[#929292] font-light font-poppins leading-6 tracking-normal mb-6">
          {description.split("<br>").map((line, i) => (
            <span key={i}>
              {line}
              <br className="hidden md:block" />
            </span>
          ))}
        </p>


        {/* Footer: Dots + Arrow */}
        <div className="flex items-center justify-between">
          <ProgressDots total={total} activeIndex={activeIndex} />

          <button
            onClick={onNext}
            className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeFlow;