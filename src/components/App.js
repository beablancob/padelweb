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
//import TorneosActivosUser from "./torneos-activos-user/TorneosActivosUser";
import Torneos2 from "./torneos-activos-user/Torneos2";
import MisTorneos from "./mis-torneos/MisTorneos";

import TorneosActivosAdmin from "./torneos-activos-admin/TorneosActivosAdmin";
import CreateTournament from "./create-tournament/CreateTournament";
import EditarTorneo from "./editar-torneo/EditarTorneo";
import RegistrarPareja from "./registrar-pareja/RegistrarPareja";

import VerTorneo from "./administrador-torneo/ver-torneo/VerTorneo";

import ApuntarseTorneo from "./apuntarse-torneo/ApuntarseTorneo";
import ApuntarsePriv from "./ap-priv/ApuntarsePriv";

import TorneoApuntadoInfo from "./torneo-apuntado-info/TorneoApuntadoInfo";
//import Dashboard2 from "./dashboard2/Dashboard2";
import TorneoNoComenzadoParticipo from "./torneo-nocomenzado-participo/TorneoNoComenzadoParticipo";

//Con esto hacemos que aunque se refresque la página, nosotros sigamos con la sesión iniciada.
// Check for token
if (localStorage.session) {
  let session = JSON.parse(localStorage.session);
  // Set auth token header auth
  setAuthToken(session.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(session.jwtToken, "secreto");
  console.log("Token desde app", session.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(session.user));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear current Profile
    // store.dispatch(clearCurrentProfile());

    //Redirect to Login
    window.location.href = "/login";
  }
}

//TODO: Rondas etc que vayan dentro del switch de la torneosbaruser

{
  /* 
      <Torneosbaruser />
      Añadir aqui lo que falta de rondas
     */
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

                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />

                {/* <PrivateRoute
                  exact
                  path="/torneos-activos-user"
                  component={TorneosActivosUser}
                /> */}
                <PrivateRoute
                  exact
                  path="/torneos-activos-user"
                  component={Torneos2}
                />

                <PrivateRoute
                  exact
                  path="/create-tournament"
                  component={CreateTournament}
                />
                <PrivateRoute
                  exact
                  path="/ver-torneo/:id"
                  component={VerTorneo}
                />

                <PrivateRoute
                  exact
                  path="/torneos-activos-admin"
                  component={TorneosActivosAdmin}
                />

                <PrivateRoute
                  exact
                  path="/apuntarse-torneo/:id"
                  component={ApuntarseTorneo}
                />
                <PrivateRoute exact path="/ap-priv" component={ApuntarsePriv} />
                <PrivateRoute
                  exact
                  path="/editar-torneo/:id"
                  component={EditarTorneo}
                />

                <PrivateRoute
                  path="/torneo-apuntado-info/:id"
                  component={TorneoApuntadoInfo}
                />
                <PrivateRoute
                  path="/registro-pareja/:id"
                  component={RegistrarPareja}
                />
                <PrivateRoute
                  path="/torneo-nocomenzado-participo/:id"
                  component={TorneoNoComenzadoParticipo}
                />
                <PrivateRoute path="/mis-torneos" component={MisTorneos} />
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
