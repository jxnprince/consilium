import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavbarLeft from "./components/NavBar";
import SplashLayout from './components/layouts/splash'
import EngineerDashboard from './components/layouts/eDashboard'
import ArtistDashboard from './components/layouts/aDashboard'
import ProjectDashboard from './components/layouts/pDashboard'
import SongDashboard from './components/layouts/sDashboard'
import Modal from './components/Modal'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
    }, [dispatch]);


  return (
    <BrowserRouter>
      <Modal />

      <Switch>
        <Route path="/" exact={true}>
          <NavbarLeft />
          <SplashLayout />
        </Route>
        <ProtectedRoute path="/users/:artistId" exact={true}>
          <NavbarLeft />
          <ArtistDashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:artistId/artists" exact={true}>
          <NavbarLeft />
          <EngineerDashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:artistId/projects/:projectId" exact={true}>
          <NavbarLeft />
          <ProjectDashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:artistId/projects/:projectId/tracks/:trackId" exact={true}>
          <NavbarLeft />
          <SongDashboard />
        </ProtectedRoute>
        <Route>
          <NavbarLeft />
          <h1>Looks like this page doesn't exist...</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
