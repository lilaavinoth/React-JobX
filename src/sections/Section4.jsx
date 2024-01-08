import { useState } from "react";
import { Chip } from "@mui/material";

const Section4 = ({ prevSection, nextSection }) => {
  const [payType, setPayType] = useState("Range");
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [rate, setRate] = useState("per year");
  const [amount, setAmount] = useState("");
  const [supplementalPayChips, setSupplementalPayChips] = useState([]);
  const [benefitsChips, setBenefitsChips] = useState([]);

  const handleSupplementalChipClick = (chipLabel) => {
    if (supplementalPayChips.includes(chipLabel)) {
      // If chip is already selected, remove it
      setSupplementalPayChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipLabel)
      );
    } else {
      // If chip is not selected, add it
      setSupplementalPayChips((prevChips) => [...prevChips, chipLabel]);
    }
  };

  const handleBenefitsChipClick = (chipLabel) => {
    if (benefitsChips.includes(chipLabel)) {
      // If chip is already selected, remove it
      setBenefitsChips((prevChips) =>
        prevChips.filter((chip) => chip !== chipLabel)
      );
    } else {
      // If chip is not selected, add it
      setBenefitsChips((prevChips) => [...prevChips, chipLabel]);
    }
  };

  const payTypeList = [
    { label: "Range" },
    { label: "Starting amount" },
    { label: "Maximum amount" },
    { label: "Exact amount" },
  ];

  const rateList = [
    { label: "per hour" },
    { label: "per day" },
    { label: "per week" },
    { label: "per month" },
    { label: "per year" },
  ];

  const benefitsChipList = [
    "Health insurance",
    "Paid time off",
    "Dental insurance",
    "401(k)",
    "Vision insurance",
    "Flexible schedule",
    "Tution reimbursement",
    "Life insurance",
    "401(k) matching",
    "Retirement plan",
    "Referral program",
    "Employee discount",
    "Flexible spending account",
    "Health savings account",
    "Relocation assistance",
    "Parental leave",
    "Professional development assistance",
    "Employee assistance program",
    "Other",
  ];

  const supplementalPayChipList = [
    "Signing bonus",
    "Commission pay",
    "Bonus pay",
    "Tips",
    "Other",
  ];
  return (
    <>
      <div className="section4">
        <h2>Add compensation</h2>

        <label>What is the pay?</label>
        <p>Show pay by</p>

        <select
          id="payType"
          value={payType}
          onChange={(e) => setPayType(e.target.value)}
        >
          {payTypeList.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>

        {payType == "Range" ? (
          <>
            <div className="rangeDiv">
              <div className="minMax">
                <p>Minimum</p>
                <input
                  id="minimum"
                  type="number"
                  maxLength={10}
                  value={minimum}
                  onChange={(e) => setMinimum(e.target.value)}
                />
              </div>

              <div className="centerVertical">
                <p>to</p>
              </div>

              <div className="minMax">
                <p>Maximum</p>
                <input
                  id="maximum"
                  type="number"
                  maxLength={10}
                  value={maximum}
                  onChange={(e) => setMaximum(e.target.value)}
                />
              </div>

              <div>
                <p>Rate</p>
                <select
                  id="rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                >
                  {rateList.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="rangeDiv">
              <div className="minMax">
                <p>Amount</p>
                <input
                  id="amount"
                  type="number"
                  maxLength={10}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <p>Rate</p>
                <select
                  id="rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                >
                  {rateList.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <p>Do you offer any of the following supplemental pay?</p>
        <div>
          {supplementalPayChipList.map((chipLabel) => (
            <Chip
              key={chipLabel}
              label={chipLabel}
              color={
                supplementalPayChips.includes(chipLabel)
                  ? "secondary"
                  : "primary"
              }
              onClick={() => handleSupplementalChipClick(chipLabel)}
              style={{ margin: "4px" }}
            />
          ))}
        </div>

        <p>Are any of the following benefits offered?</p>
        <div>
          {benefitsChipList.map((chipLabel) => (
            <Chip
              key={chipLabel}
              label={chipLabel}
              color={
                benefitsChips.includes(chipLabel) ? "secondary" : "primary"
              }
              onClick={() => handleBenefitsChipClick(chipLabel)}
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

export default Section4;
