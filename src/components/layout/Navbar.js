// rcc
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileActions";
import { isAdmin } from "../../actions/profileActions";
import { isNotAdmin } from "../../actions/profileActions";

import "../../assets/Style.css";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  onAdminClick(e) {
    e.preventDefault();
    this.props.isAdmin();
    console.log("Hola has clickado en admin", e);
  }
  onUserClick(e) {
    e.preventDefault();
    this.props.isNotAdmin();
    console.log("Adios admin, ahora eres usuario", e);
  }
  // TODO: Cuando tengan user.img entonces la meto en el login. Si el usuario no tiene, añadir la default
  render() {
    const { isAuthenticated, user } = this.props.auth;

    console.log("Nombre del usuario: ", user.name);

    const authLinks = (
      <nav className="navbar navbar-expand-sm navbar-light mb-4">
        <div className="container-fluid">
          <div id="img-pelota">Torneos de pádel</div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="sidebarCollapse nav-icon3">
                <span></span>
                <span></span>
                <span></span>
              </li>
              <li className="nav-item">
                <div className="row">
                  <Link
                    to="/torneos-activos-user"
                    className="nav-link btn-us"
                    onClick={this.onUserClick.bind(this)}
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/torneos-activos-admin"
                    className="nav-link btn-us"
                    onClick={this.onAdminClick.bind(this)}
                  >
                    Mi perfil
                  </Link>
                </div>
              </li>
              <li className="nav-item"></li>
              <li className="nav-item"></li>
              <li className="nav-item">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  {" "}
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

    const guestLinks = (
      <nav className="navbar navbar-expand-sm navbar-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div id="img-pelota"></div> Torneos de pádel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Regístrate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Inicia Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}
//Si tiene dispatch, lo añado aqui como una funcion. Sino, no.
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAdmin: PropTypes.func.isRequired,
  isNotAdmin: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  logoutUser,
  isAdmin,
  isNotAdmin,
  clearCurrentProfile
})(Navbar);
