import { useState } from "react";

const Section2 = ({ prevSection, nextSection }) => {
  const [jobTitle, setjobTitle] = useState("");
  const [noOfPeopleToHire, setnoOfPeopleToHire] = useState("");
  const [onGoingNeed, setonGoingNeed] = useState("");
  const [jobLocation, setjobLocation] = useState("In-person, precise location");
  const [jobStreetLocation, setjobStreetLocation] = useState("");

  const noOfHireOptions = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "10" },
    { label: "10+" },
  ];

  const jobLocationOption = [
    { label: "In-person, precise location" },
    { label: "General location, within a limited area" },
    { label: "Remote" },
    { label: "Hybrid remote" },
  ];

  const handleCheckboxChange = () => {
    setonGoingNeed(!onGoingNeed);
  };

  return (
    <>
      <div className="section2">
        <h2>Provide basic information</h2>
        <form>
          <div className="employeer_account_creation">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              id="jobTitle"
              maxLength={50}
              value={jobTitle}
              onChange={(e) => setjobTitle(e.target.value)}
            />
            <label htmlFor="noOfPeople">No of people to hire</label>
            <select
              id="noOfPeople"
              value={noOfPeopleToHire}
              onChange={(e) => setnoOfPeopleToHire(e.target.value)}
            >
              {noOfHireOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="horizontal">
              <input
                type="checkbox"
                value={onGoingNeed}
                onChange={handleCheckboxChange}
              />
              <p>I have an ongoing need to fill this role</p>
            </div>

            <label htmlFor="jobLocation">
              Which option describes this job's location?
            </label>
            <select
              id="jobLocation"
              value={jobLocation}
              onChange={(e) => setjobLocation(e.target.value)}
            >
              {jobLocationOption.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {jobLocation == "In-person, precise location" && (
              <>
                <label htmlFor="jobStreetAddress">
                  What is the street address of this location?
                </label>
                <input
                  id="jobStreetAddress"
                  maxLength={50}
                  value={jobStreetLocation}
                  onChange={(e) => setjobStreetLocation(e.target.value)}
                />
              </>
            )}
          </div>
        </form>
        {/* <button onClick={prevSection}>Prev page</button> */}
        <button onClick={nextSection}>Save and continue</button>
      </div>
    </>
  );
};

export default Section2;
