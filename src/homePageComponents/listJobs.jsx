import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import "font-awesome/css/font-awesome.min.css";

function LiveJobs() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // localStorage.clear();
    // Check if cached data exists in localStorage
    const cachedData = localStorage.getItem("liveJobsData");

    if (cachedData) {
      // If cached data exists, parse it and set it in the state
      setDocuments(JSON.parse(cachedData));
    } else {
      console.log("fetched from firebase");
      // If no cached data, fetch data from Firestore
      const firestore = getFirestore();
      const fetchData = async () => {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, "liveJobs"),
            where("subItemId", "!=", null),
            where("status", "==", "live")
          )
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(data);

        // Cache the fetched data in localStorage
        localStorage.setItem("liveJobsData", JSON.stringify(data));
      };
      fetchData();
    }
  }, []);

  const [dataToPass, setDataToPass] = useState(null);

  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

  useEffect(() => {
    if (documents.length > 0 && selectedDocumentId === null) {
      setSelectedDocumentId(documents[0].id);
    }
  }, [documents, selectedDocumentId]);

  useEffect(() => {
    if (documents.length > 0 && dataToPass === null) {
      setDataToPass(documents[0]);
    }
  }, [documents, dataToPass]);

  return (
    <>
      <div className="container">
        <div className="left-partition">
          {documents.map((document) => (
            <SingleElement
              key={document.id}
              data={document}
              setDataToPass={setDataToPass}
              isSelected={selectedDocumentId === document.id}
              onDocumentClick={setSelectedDocumentId}
            />
          ))}
        </div>
        <div className="right-partition">
          <FullJobDescDisplay dataToPass={dataToPass} />
        </div>
      </div>
      <div className="bottomContainer"></div>
    </>
  );
}

function FullJobDescDisplay(props) {
  return (
    <>
      <div className="jobFullDisplay">
        <div className="jobFullHeading">
          <div>
            {<GenerateCustomImageText word={props.dataToPass?.companyName} />}
          </div>
          <div>
            {<h2>{props.dataToPass?.jobTitle}</h2> ?? "no data"}
            {<p>{props.dataToPass?.companyName}</p> ?? "no data"}
          </div>
        </div>
        <div className="basicJobData">
          <div className="basicJobDataSingle">
            <i className="fa fa-map-marker"></i>
            {<p>{props.dataToPass?.townCity}</p> ?? "no data"}
          </div>
          <div className="basicJobDataSingle">
            {
              <JobDateCalculator
                jobTimeStamp={props.dataToPass?.timestamp ?? "no data"}
              />
            }
          </div>
          <div>
            {props.dataToPass?.payType === "Range" ? (
              <ShowPayRangeFull datashare={props.dataToPass} />
            ) : (
              <ShowPayExceptRangeFull datashare={props.dataToPass} />
            )}
          </div>
          <div>
            <ShowJobBenefits datashare={props.dataToPass?.benefits} />
            <ShowJobSchedule datashare={props.dataToPass?.jobSchedule} />
            <ShowSupplementalPay
              datashare={props.dataToPass?.supplementalPay}
            />
          </div>
        </div>
        <div className="jobFullDesc">
          {<p>{props.dataToPass?.jobDesc ?? "no data"}</p>}
        </div>
      </div>
    </>
  );
}

function ShowSupplementalPay(props) {
  return (
    <>
      <div className="benefitsList">
        <h3 className="listHeading">Supplemental Pay</h3>
        {props.datashare &&
          props.datashare.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </>
  );
}

function ShowJobSchedule(props) {
  return (
    <>
      <div className="benefitsList">
        <h3 className="listHeading">Job Schedule</h3>
        {props.datashare &&
          props.datashare.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </>
  );
}

function ShowJobBenefits(props) {
  return (
    <>
      <div className="benefitsList">
        <h3 className="listHeading">Benefits</h3>
        {props.datashare &&
          props.datashare.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </>
  );
}

function JobDateCalculator(props) {
  if (props.jobTimeStamp === "no data") {
    return <p>No Data</p>;
  } else {
    console.log(typeof props.jobTimeStamp, props.jobTimeStamp);
    const [timePassed, setTimePassed] = useState(null);
    useEffect(() => {
      if (props.jobTimeStamp) {
        // Convert Firestore Timestamp to JavaScript Date object
        const timestamp = new Date(
          props.jobTimeStamp.seconds * 1000 +
            props.jobTimeStamp.nanoseconds / 1000000
        ).getTime();

        const currentTime = new Date().getTime();
        const timeDifference = currentTime - timestamp;

        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursPassed = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesPassed = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        if (daysPassed > 0) {
          setTimePassed(
            `${daysPassed} ${daysPassed === 1 ? "day" : "days"} ago`
          );
        } else if (hoursPassed > 0) {
          setTimePassed(
            `${hoursPassed} ${hoursPassed === 1 ? "hour" : "hours"} ago`
          );
        } else {
          setTimePassed(
            `${minutesPassed} ${minutesPassed === 1 ? "minute" : "minutes"} ago`
          );
        }
      }
    }, [props.jobTimeStamp]);

    return (
      <div>
        <p>Job posted: {timePassed}</p>
        {/* Your other components and content */}
      </div>
    );
  }
}

function GenerateCustomImageText(props) {
  let companyWords = props.word?.substring(0, 2) ?? "ni";
  return (
    <>
      <div className="customImageStyle">{companyWords}</div>
    </>
  );
}

function ShowPayRange(props) {
  return (
    <>
      <div className="paydisplayBox">
        <p>
          £{props.datashare.data.min} to £{props.datashare.data.max}{" "}
          {props.datashare.data.minMaxRate}
        </p>
      </div>
    </>
  );
}

function ShowPayExceptRange(props) {
  return (
    <>
      <div className="paydisplayBox">
        <p>
          £{props.datashare.data.amount} {props.datashare.data.amountRate}
        </p>
      </div>
    </>
  );
}

function ShowPayRangeFull(props) {
  return (
    <>
      <div className="paydisplayBox">
        <p>
          £{props.datashare?.min} to £{props.datashare?.max}{" "}
          {props.datashare?.minMaxRate}
        </p>
      </div>
    </>
  );
}

function ShowPayExceptRangeFull(props) {
  return (
    <>
      <div className="paydisplayBox">
        <p>
          £{props.datashare?.amount} {props.datashare?.amountRate}
        </p>
      </div>
    </>
  );
}

function SingleElement(props) {
  const passToRight = (data) => {
    props.setDataToPass(data);
    props.onDocumentClick(props.data.id);
  };
  return (
    <>
      <div
        className={props.isSelected ? "selectedJobListCard" : "jobListCard"}
        onClick={() => {
          passToRight(props.data);
        }}
      >
        <div className="jobCardHeader">
          <p className="jobTitle_p">{props.data.jobTitle}</p>
          <p className="companyName_p">
            {props.data.companyName === null
              ? "Company Name"
              : props.data.companyName}
          </p>
        </div>
        <div className="jobTypeTown">
          <p>{props.data.jobType === null ? "" : props.data.jobType[0]}</p>
          <p>•</p>
          <p className="jobAddress_p">{props.data.townCity}</p>
        </div>
        {props.data.payType === "Range" ? (
          <ShowPayRange datashare={props} />
        ) : (
          <ShowPayExceptRange datashare={props} />
        )}
        <div className="jobDescbox">
          <p>
            {props.data.jobDesc === null
              ? ""
              : props.data.jobDesc.slice(0, 200)}
          </p>
        </div>
      </div>
    </>
  );
}

export default LiveJobs;
