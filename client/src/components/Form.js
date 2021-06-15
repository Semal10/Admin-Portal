import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_ORIGIN } from "../config";
import { useHistory } from "react-router-dom";

const Form = ({
  user,
  setUser,
  password,
  setPassword,
  userError,
  setUserError,
  passwordError,
  setPasswordError,
  userState,
  setUserState,
}) => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (userState.type === "Failure") {
      history.push("/login");
    } else if (userState.type === "Success") {
      history.push("/dashboard");
    } else {
      return <div>Loading...</div>;
    }
  }, [userState]);

  const clearInputs = () => {
    setUser("");
    setPassword("");
  };

  const clearErrors = () => {
    setUserError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    axios
      .post(
        `${SERVER_ORIGIN}users/login`,
        {
          email: user,
          password: password,
        },
        { withCredentials: true }
      )
      .then(
        (response) => {
          if (response.data) {
            axios
              .get(`${SERVER_ORIGIN}users/whoami`, {
                withCredentials: true,
                credentials: true
              })
              .then((response) => {
                setUserState({
                  type: "Success",
                  role: response.data.role,
                });
              })
              .catch((err) => {
                setUserState({
                  type: "Failure",
                  role: "none",
                });
              });
            history.push("/dashboard");
          } else {
            setUserError("Credentials does not match");
            setPasswordError("Credentials does not match");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSignup = () => {
    axios
      .post(
        `${SERVER_ORIGIN}users/signup`,
        {
          email: user,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setToggle(!toggle);
        clearInputs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={user}
          placeholder="Email"
          onChange={(e) => setUser(e.target.value)}
        />
        <p className="errorMsg">{userError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>

        {toggle ? (
          <>
            <div className="btnContainer">
              <button onClick={handleLogin}>
                <span style={{ fontSize: "1.5em" }}>Sign in</span>
              </button>
              <p>
                Don't have an account?
                <span
                  onClick={() => {
                    setToggle(!toggle);
                    clearInputs();
                    clearErrors();
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="btnContainer">
              <button onClick={handleSignup}>
                <span style={{ fontSize: "1.5em" }}>Sign up</span>
              </button>
              <p>
                Have an account?
                <span
                  onClick={() => {
                    setToggle(!toggle);
                    clearInputs();
                    clearErrors();
                  }}
                >
                  Sign in
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Form;
