import { useState, useEffect } from "react";

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

  return (
    <>
      <div className="container">
        <div className="left-partition">
          {documents.map((document) => (
            <SingleElement
              key={document.id}
              data={document}
              setDataToPass={setDataToPass}
            />
          ))}
        </div>
        <div className="right-partition">
          <FullJobDescDisplay dataToPass={dataToPass} />
        </div>
      </div>
    </>
  );
}


function FullJobDescDisplay(props) {
    return (
      <>
        <div className="jobFullDesc">
          {<p>{props.dataToPass?.jobTitle}</p> ?? "no data"}
          {<p>{props.dataToPass?.companyName}</p> ?? "no data"}
        </div>
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
  
  function SingleElement(props) {
    const passToRight = (data) => {
      props.setDataToPass(data);
    };
    return (
      <>
        <div
          className="jobListCard"
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
