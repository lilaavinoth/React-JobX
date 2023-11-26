// import { useUser } from "../global/userContext";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "../routes/root.css";
import { useUser } from "../global/userContext"; // Import the useUser hook


function Model({ status, setStatus, jobData }) {
  const closeModel = () => {
    setStatus(false);
  };

  if (!status) return null;

  const { user, setUser } = useUser(); // Access user and setUser from the context

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Set a short delay to apply the initial transition effect
    const delayTimeout = setTimeout(() => {
      setIsRendered(true);
    }, 0);

    return () => clearTimeout(delayTimeout); // Clear the timeout if the component unmounts
  }, []);

  if (Object.keys(user).length == 0) {
    const handleSignIn = () => {
      // Handle sign-in success for this route
      // ...
    };
    return (
      <>
        <div
          className={`modal-overlay ${isRendered && status ? "active" : ""}`}
          onClick={closeModel}
        />
        <div
          className={`modal-content ${isRendered && status ? "active" : ""}`}
        >
          <button className="closeBtn" onClick={closeModel}>
            close
          </button>
          <Signup />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`modal-overlay ${isRendered && status ? "active" : ""}`}
          onClick={closeModel}
        />
        <div
          className={`modal-content ${isRendered && status ? "active" : ""}`}
        >
          {/* <button className="closeBtn" onClick={closeModel}>
            close
          </button>
          <h2>Hello, this is your modal content!</h2>
          <p>This is a paragraph inside the modal.</p>{" "}
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>{" "}
          </ul> */}
        </div>
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


export default Model;
