// rcc
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../../assets/Style.css";

class Torneosbaruser extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/rondasuser">
                Rondas
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
                <ul className="navbar-nav ml-auto">
                  <li className="sidebarCollapse nav-icon3">
                    <span></span>
                    <span></span>
                    <span></span>
                  </li>
                  <li className="nav-item">
                    <Link to="/parejas">Parejas</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/ranking">Ranking</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contacto">Contacto</Link>
                  </li>
                </ul>{" "}
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
}
//Si tiene dispatch, lo añado aqui como una funcion. Sino, no.
Torneosbaruser.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Torneosbaruser);
