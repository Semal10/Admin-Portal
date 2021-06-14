import React, { useState, useEffect } from "react";
import axios from "axios";
//import Cookies from 'js-cookie';

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
    console.log(userState);
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
        "http://localhost:8080/users/login",
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
              .get("http://localhost:8080/users/whoami", {
                withCredentials: true,
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

  const handleSignup = () => {};

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
              <button onClick={handleLogin}><span style={{fontSize:'1.5em'}}>Sign in</span></button>
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
              <button onClick={handleSignup}><span style={{fontSize:'1.5em'}}>Sign up</span></button>
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
