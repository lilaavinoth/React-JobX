import { Chip } from "@mui/material";
import { useState } from "react";

const Section3 = ({ prevSection, nextSection }) => {
  const [selectedTypeChips, setSelectedTypeChips] = useState([]);
  const [selectedScheduleChips, setSelectedScheduleChips] = useState([]);


  const handleJTypeChipClick = (chipLabel) => {
    if (selectedTypeChips.includes(chipLabel)) {
      // If chip is already selected, remove it
      setSelectedTypeChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipLabel)
      );
    } else {
      // If chip is not selected, add it
      setSelectedTypeChips((prevChips) => [...prevChips, chipLabel]);
    }
  };

  const handleJScheduleChipClick = (chipLabel) => {
    if (selectedScheduleChips.includes(chipLabel)) {
      // If chip is already selected, remove it
      setSelectedScheduleChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipLabel)
      );
    } else {
      // If chip is not selected, add it
      setSelectedScheduleChips((prevChips) => [...prevChips, chipLabel]);
    }
  };

  const jobTypeChips = [
    "Full time",
    "Part time",
    "Contract",
    "Temporary",
    "Internship",
  ];

  const jobScheduleChips = [
    "4 hour shift",
    "8 hour shift",
    "10 hour shift",
    "12 hour shift",
    "Monday to Friday",
    "Day shift",
    "Night shift",
    "Evening shift",
    "No nights",
    "Overnight shift",
    "Weekend availability",
    "Weekends only",
    "No weekends",
    "On call",
    "Holidays",
    "Choose your own hours",
    "After school",
    "Overtime",
    "Other",
  ];

  return (
    <>
      <div className="section3">
        <h2>Include details</h2>
        <label>What is the job type?</label>

        <div>
          {jobTypeChips.map((chipLabel) => (
            <Chip
              key={chipLabel}
              label={chipLabel}
              color={
                selectedTypeChips.includes(chipLabel) ? "secondary" : "primary"
              }
              onClick={() => handleJTypeChipClick(chipLabel)}
              style={{ margin: "4px" }}
            />
          ))}
        </div>

        <label>What is the schedule for this job?</label>

        <div>
          {jobScheduleChips.map((chipLabel) => (
            <Chip
              key={chipLabel}
              label={chipLabel}
              color={
                selectedScheduleChips.includes(chipLabel) ? "secondary" : "primary"
              }
              onClick={() => handleJScheduleChipClick(chipLabel)}
              style={{ margin: "4px" }}
            />
          ))}
        </div>

        <button onClick={prevSection}>Prev page</button>
        <button onClick={nextSection}>Save and continue</button>
      </div>
    </>
  );
};

export default Section3;
