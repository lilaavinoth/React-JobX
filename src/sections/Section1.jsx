import { useState } from "react";
import PhoneInput from "react-phone-number-input";

const Section1 = ({ nextSection }) => {
  const [companyName, setCompanyName] = useState("");
  const [noOfEmployees, setnoOfEmployees] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const options = [
    { label: "1 to 49" },
    { label: "50 to 149" },
    { label: "150 to 249" },
    { label: "500 to 749" },
    { label: "750 to 999" },
    { label: "1000+" },
  ];

  const handleSubmit = () => {
    console.log(companyName);
  };
  return (
    <>
      <div className="section1">
        <h2>Create an employer account</h2>
        <p>
          You haven't posted a job before, so you'll need to create an employer
          account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="employeer_account_creation">
            <label htmlFor="companyName">Your company name</label>
            <input
              id="companyName"
              maxLength={50}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label htmlFor="noOfEmployees">
              Number of employees in your company
            </label>
            <select
              id="noOfEmployees"
              value={noOfEmployees}
              onChange={(e) => setnoOfEmployees(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>

            <label htmlFor="firstName">Your first name</label>
            <input
              id="firstName"
              maxLength={30}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Your last name</label>
            <input
              id="lastName"
              maxLength={30}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="phoneNo">Your phone no</label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="GB"
              value={phoneNo}
              onChange={setPhoneNo}
              limitMaxLength={true}
            />
          </div>
        </form>
        <button onClick={nextSection}>Save and continue</button>
      </div>
    </>
  );
};

export default Section1;
