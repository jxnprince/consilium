import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path="/login" exact={true}>
        </Route>
        <Route path="/sign-up" exact={true}>
        </Route> */}
        <ProtectedRoute path="/" exact={true}>
          <h1>Consilium Home Page</h1>
            <LoginForm />
            <SignUpForm />
        </ProtectedRoute>
      </Switch>
        <Route>
          <h1>Looks like this page doesn't exist...</h1>
        </Route>
    </BrowserRouter>
  );
}

export default App;
