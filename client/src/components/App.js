import "../styles/index.css";
import Form from "./Form";
import Dashboard from "./Dashboard";
import Home from './Home';
import React, { useState, useEffect } from "react";
import axios from 'axios';
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
  const [userState, setUserState] = useState({type:'Loading',role:'none'});

  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8080/users/whoami',{withCredentials:true}).then(response => {
      setUserState({
        type:'Success',
        role: response.data.role
      });
    }).catch(err => {
      setUserState({
        type:'Failure',
        role:'none'
      });
    });
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <Home userState={userState}/>
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
              userState={userState}
              setUserState={setUserState}
            />
          </Route>
          <Route exactpath="/dashboard">
            <Dashboard userState={userState}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
