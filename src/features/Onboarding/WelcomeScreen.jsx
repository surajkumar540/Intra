import { useState, useEffect } from "react";
import WelcomeFlow from "../Onboarding/WelcomeFlow";
import smartImg from "../../assets/unofficial/smart-attendance.png";
import parentImg from "../../assets/unofficial/parent-communication.png";
import reportImg from "../../assets/unofficial/student-reports.png";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: smartImg,
    title: "Smart Attendance  Tracking",
    description:
      "Easily mark and manage student attendance <br>in just a few taps.",
  },
  {
    image: parentImg,
    title: "Seamless  Parent Communication",
    description: "Instantly connect with parents <br>via messages and alerts.",
  },
  {
    image: reportImg,
    title: "Student Reports  at  Your Fingertips",
    description: "Access real-time student performance <br>anytime, anywhere.",
  },
];

const WelcomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const navigate = useNavigate();

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < slides.length - 1) {
          return prevIndex + 1;
        } else {
          // Stop auto-sliding when we reach the last slide
          setIsAutoSliding(false);
          return prevIndex;
        }
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  const handleNext = () => {
    // Stop auto-sliding when user clicks next
    setIsAutoSliding(false);
    
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/login");
    }
  };

  return (
    <WelcomeFlow
      image={slides[index].image}
      title={slides[index].title}
      description={slides[index].description}
      total={slides.length}
      activeIndex={index}
      onNext={handleNext}
    />
  );
};

export default WelcomeScreen;