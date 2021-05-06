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
      <Modal />
      <Switch>
        <Route path="/" exact={true}>
          <h1>Consilium Home Page</h1>
        </Route>
        <ProtectedRoute path="/users/:id/" exact={true}>
          <h1>A projects belonging to a single artist</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:id/artists/" exact={true}>
          <h1>All clients belonging to as single engineer</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:id/projects/:id" exact={true}>
          <h1>All songs on a project</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:id/projects/:id/tracks/:id" exact={true}>
          <h1>All versions of a single track</h1>
        </ProtectedRoute>
        <Route>
          <h1>Looks like this page doesn't exist...</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
