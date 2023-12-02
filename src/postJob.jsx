import { useState } from "react";
import "./postJob.css";
import "react-phone-number-input/style.css";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";

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
        return <Section3 prevSection={handlePrev} />;
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

function Section3(props) {
  return (
    <>
      <div className="section3">
        <p>This is section 3</p>
        <button onClick={props.prevSection}>Prev page</button>
      </div>
    </>
  );
}

export default PostJob;
