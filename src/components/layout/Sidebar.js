import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const { admin } = this.props.profile;
    const { isAuthenticated, user } = this.props.auth;

    const asUser = (
      <div className="sidenav">
        <ul className="list-unstyled components">
          <li className="nav-item">
            <Link className="nav-link" to="/torneos-activos-user">
              Torneos públicos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-tournament">
              Organizar un torneo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ap-priv">
              Registrarse a un torneo privado
            </Link>
          </li>
        </ul>
      </div>
    );

    const asAdmin = (
      <div className="sidenav">
        <ul className="list-unstyled components">
          <li className="nav-item">
            <Link className="nav-link" to="/mis-torneos">
              Torneos en los que participo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/torneos-activos-admin">
              Torneos organizados por mi
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/edit-profile">
              Ajustes de perfil
            </Link>
          </li>
        </ul>
      </div>
    );
    let us = null;
    if (isAuthenticated) {
      if (admin) {
        us = asAdmin;
      } else {
        us = asUser;
      }
    }
    return <div>{us}</div>;
  }
}
Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps)(Sidebar);
