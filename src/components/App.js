import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/authAction";
import { logoutUser } from "../actions/authAction";
import { clearCurrentProfile } from "../actions/profileActions";

import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";

import "../assets/App.css";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Torneosbaruser from "./layout/Torneosbaruser";

import Footer from "./layout/Footer";
import Landing from "./layout/Landing";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import EditProfile from "./edit-profile/EditProfile";
import TorneosActivosUser from "./torneos-activos-user/TorneosActivosUser";
import TorneosActivosAdmin from "./torneos-activos-admin/TorneosActivosAdmin";
import CreateTournament from "./create-tournament/CreateTournament";
import ApuntarseTorneo from "./apuntarse-torneo/ApuntarseTorneo";

//Con esto hacemos que aunque se refresque la página, nosotros sigamos con la sesión iniciada.
// Check for token
if (localStorage.session) {
  // Set auth token header auth
  setAuthToken(localStorage.session.jwtToken);
  // Decode token and get user info and exp
  //const decoded = jwt_decode(localStorage.session.jwtToken, "secreto");
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(localStorage.session.user));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (localStorage.session.user.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear current Profile
    store.dispatch(clearCurrentProfile());

    //Redirect to Login
    window.location.href = "/login";
  }
}

//TODO: Rondas etc que vayan dentro del switch de la torneosbaruser

{
  /* <Switch>
      <Torneosbaruser />
      Añadir aqui lo que falta de rondas
    </Switch> */
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Sidebar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/torneos-activos-user"
                  component={TorneosActivosUser}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-tournament"
                  component={CreateTournament}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/torneos-activos-admin"
                  component={TorneosActivosAdmin}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/apuntarse-torneo"
                  component={ApuntarseTorneo}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
