import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import Dashboard from "./Dashboard";
import Home from './Home';
import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUser, setIsUser] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!isUser && history) {
      history.push("/login");
    }
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <Home isUser={isUser}/>
          </Route>
          <Route exact path="/login">
            <Form
              user={user}
              setUser={setUser}
              password={password}
              setPassword={setPassword}
              userError={userError}
              setUserError={setUserError}
              passwordError={passwordError}
              setPasswordError={setPasswordError}
              isUser={isUser}
              setIsUser={setIsUser}
            />
          </Route>
          <Route exactpath="/dashboard">
            <Dashboard isUser={isUser}/>
          </Route>
        </Switch>
      </Router>
      {/* <Form
        user={user}
        setUser={setUser}
        password={password}
        setPassword={setPassword}
        userError={userError}
        setUserError={setUserError}
        passwordError={passwordError}
        setPasswordError={setPasswordError}
        isUser={isUser}
        setIsUser={setIsUser}
      /> */}
    </div>
  );
};

export default App;
