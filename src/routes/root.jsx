// import "./root.css";
import { useMediaQuery } from "react-responsive";
import "./script.jsx";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import LiveJobs from "../homePageComponents/listJobs";
import LiveJobsMobile from "../homePageComponents/listJobsMobile";
import { useUser } from "../global/userContext"; // Import the useUser hook
import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";

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
        <LiveJobsMobile />
      </>
    );
  }
}

function Signup() {
  const { user, setUser } = useUser(); // Access user and setUser from the context

  function handleSignOut(event) {
    setUser({});
    Cookies.remove("username");
    document.getElementById("signInDiv").style.display = "flex";
  }

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Decrypt the JWT token and store it in cookie
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser((user) => userObject);
    document.getElementById("signInDiv").style.display = "none";

    // Store user data in Cookies
    Cookies.set("username", response.credential);
  }

  useEffect(() => {
    // Define a function to initialize and render Google sign-in when the Google API is available
    const initializeGoogleSignIn = () => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        // Initialize Google sign-in
        google.accounts.id.initialize({
          client_id:
            "897781012043-l9ss1oc74d7rhobhgej62o9a4eo2e8ee.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });

        // Render the Google sign-in button
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
        });

        // google.accounts.id.prompt();

        const username = Cookies.get("username");
        if (username === undefined) {
          console.log("The cookie is empty (does not exist).");
        } else {
          console.log("Cookie JWT token: " + username);
          let userObject = jwtDecode(username);
          setUser((user) => userObject);
          document.getElementById("signInDiv").style.display = "none";
        }
      } else {
        // Google API is not available yet, retry in a short interval
        setTimeout(initializeGoogleSignIn, 100);
      }
    };

    // Call the initialization function
    initializeGoogleSignIn();
  }, [setUser]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (props) => {
    props.preventDefault();

    console.log(email + " " + password);
  };

  return (
    <>
      <div
        id="signInDiv"
        style={{ display: "flex", justifyContent: "center" }}
      ></div>

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
          <h2>Sign In</h2>
          <div className="signupPrompt">
            <label className="smallLabel">Don't have an account yet?</label>
            <a className="smallLabel">Sign up</a>
          </div>

          {/* {error && <Alert variant="danger">{error}</Alert>} */}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="smallLabel">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="passwordLabel">
                <label htmlFor="password" className="smallLabel">
                  Password
                </label>
                <a className="smallLabel">Forgot password?</a>
              </div>

              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="signInBtn">
              Sign In
            </button>
          </form>
        </>
      )}

      <div className="w-100 text-center mt-2">
        {/* Already have an account? <Link to="/login">Log In</Link> */}
      </div>
    </>
  );
}

function NavBar() {
  const { user, setUser } = useUser(); // Access user and setUser from the context
  const navigate = useNavigate();
  const changePage = () => {
    navigate("/postJob");
  };

  return (
    <nav className="nav">
      <a className="site-title" onClick={changePage}>
        Job-X
      </a>
      <ul>
        <div className="dropdown" data-dropdown>
          <button
            className="nav_btn_left"
            data-dropdown-button
            onClick={changePage}
          >
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
          <div className="dropdownMenu"></div>
        </div>
      </ul>
    </nav>
  );
}

export default Root;
