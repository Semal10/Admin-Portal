import React, { useState } from "react";
import {
  useHistory
} from "react-router-dom";

const Form = ({
  user,
  setUser,
  password,
  setPassword,
  userError,
  setUserError,
  passwordError,
  setPasswordError,
  isUser,
  setIsUser,
}) => {

  const history = useHistory();
  const [toggle, setToggle] = useState(false);
    
  const clearInputs = () => {
    setUser('');
    setPassword('');
  };

  const clearErrors = () => {
    setUserError('');
    setPasswordError('');
  };

  const handleLogin = () => {
      if(user=='semal@gmail.com' && password=='semal'){
        setIsUser(true);
        history.push('/dashboard');
      }
  }

  const handleSignup = () => {

  }
  
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
              <button onClick={handleLogin}>Sign in</button>
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
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Have an account?
                <span
                  onClick={() => {
                    setToggle(!toggle)
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
