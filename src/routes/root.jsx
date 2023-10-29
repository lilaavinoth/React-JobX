import "./root.css";
import { useMediaQuery } from "react-responsive";
import "./script.jsx";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import LiveJobs from "../homePageComponents/listJobs";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "../global/userContext"; // Import the useUser hook
import "firebase/firestore";
// import firebase from "firebase/app"
import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  doc,
} from "firebase/firestore";

// Your Firebase project configuration
initializeApp({
  apiKey: "AIzaSyAmCr-J9jsk1y0TqHavRr9ouE3BAbJy5mU",
  authDomain: "jobx-global.firebaseapp.com",
  projectId: "jobx-global",
  storageBucket: "jobx-global.appspot.com",
  messagingSenderId: "897781012043",
  appId: "1:897781012043:web:8cbe08b431aa82b96d9fce",
  measurementId: "G-NVTX90XTZD",
});

function Root() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (isBigScreen) {
    // function buttonText() {
    //   if (Object.keys(user).length == 0) {
    //     return "Login"
    //   }
    // }
    // <GetCities database={db}/>

    return (
      <>
        <NavBar />
        <LiveJobs />
      </>
    );
  } else if (isMobile) {
    return (
      <>
        <NavBar />
        <LiveJobs />
        {/* <div id="signInDiv"></div>
        {Object.keys(user).length != 0 && (
          <button onClick={(e) => handleSignOut(e)}> Sign out</button>
        )}

        {user && (
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        )} */}
      </>
    );
  }
}

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  {
    /* if we have no user {} in useState, display signin button
        if we have a user {someUserData} in useState, hide the signin button
        and display the user picuture and other stuff  */
  }

  // const [user, setUser] = useState({});
  const { user, setUser } = useUser(); // Access user and setUser from the context

  function handleSignOut(event) {
    setUser({});
    Cookies.remove("username");
    document.getElementById("signInDiv").hidden = false;
  }

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Decrypt the JWT token and store it in cookie
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser((user) => userObject);
    document.getElementById("signInDiv").hidden = true;

    // Store user data in Cookies
    Cookies.set("username", response.credential);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "897781012043-l9ss1oc74d7rhobhgej62o9a4eo2e8ee.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    // google.accounts.id.prompt();

    // Get the value of the 'username' cookie
    const username = Cookies.get("username");
    if (username === undefined) {
      console.log("The cookie is empty (does not exist).");
    } else {
      console.log("Cookie JWT token: " + username);

      let userObject = jwtDecode(username);
      setUser((user) => userObject);
      document.getElementById("signInDiv").hidden = true;
    }
  }, [setUser]);

  return (
    <>
      <Card>
        <Card.Body>
          <div id="signInDiv"></div>

          {Object.keys(user).length != 0 && (
            <div className="loggedInUser">
              <img src={user.picture} className="profilePicture"></img>
              <p>{user.name}</p>
            </div>
          )}

          {Object.keys(user).length != 0 && (
            <button className="signOutBtn" onClick={(e) => handleSignOut(e)}>
              Sign out
            </button>
          )}

          {Object.keys(user).length == 0 && (
            <>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {/* Already have an account? <Link to="/login">Log In</Link> */}
      </div>
    </>
  );
}

function NavBar() {
  const { user, setUser } = useUser(); // Access user and setUser from the context

  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Job-X
      </a>
      <ul>
        <div className="dropdown" data-dropdown>
          <button className="nav_btn_left" data-dropdown-button>
            Post Job
          </button>
          <div className="dropdownMenu">line1 line2</div>
        </div>
        <div className="dropdown" data-dropdown>
          <button className="nav_btn_right" data-dropdown-button>
            {Object.keys(user).length == 0 ? "Login" : "Account"}
          </button>
          <div className="dropdownMenu">
            <Signup className="loginForm" />
          </div>
          <div className="dropdownMenu">line2 line3</div>
        </div>
      </ul>
    </nav>
  );
}

export default Root;
