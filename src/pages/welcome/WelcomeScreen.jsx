import { useState } from "react";
import WelcomeFlow from "./WelcomeFlow";
import smartImg from "../../assets/unofficial/smart-attendance.png";
import parentImg from "../../assets/unofficial/parent-communication.png";
import reportImg from "../../assets/unofficial/student-reports.png";
import { useNavigate } from "react-router-dom"
const slides = [
  {
    image: smartImg,
    title: "Smart Attendance  Tracking",
    description: "Easily mark and manage student attendance<br>in just a few taps.",
  },
  {
    image: parentImg,
    title: "Seamless Parent Communication",
    description: "Instantly connect with parents<br>via messages and alerts.",
  },
  {
    image: reportImg,
    title: "Student Reports at Your Fingertips",
    description: "Access real-time student performance<br>anytime, anywhere.",
  },
];

const WelcomeScreen = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/login")
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
