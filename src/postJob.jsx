import { useState } from "react";
import "./postJob.css";
import "react-phone-number-input/style.css";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";

function PostJob() {
  const [currentSection, setCurrentSection] = useState(1);
  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };
  const handlePrev = () => {
    setCurrentSection(currentSection - 1);
  };
  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return <Section1 nextSection={handleNext} />;
      case 2:
        return <Section2 nextSection={handleNext} prevSection={handlePrev} />;
      case 3:
        return <Section3 nextSection={handleNext} prevSection={handlePrev} />;
      case 4:
        return <Section4 nextSection={handleNext} prevSection={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="backgrounds">{renderSection()}</div>
    </>
  );
}

export default PostJob;
