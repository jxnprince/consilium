import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from "./components/NavBar";
import Modal from './components/Modal'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
    }, [dispatch]);


  return (
    <BrowserRouter>
      <NavBar />
      {/* <Modal /> */}
      <Switch>
        <Route path="/" exact={true}>
          <h1>Consilium Home Page</h1>
        </Route>
        <Route>
          <h1>Looks like this page doesn't exist...</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
