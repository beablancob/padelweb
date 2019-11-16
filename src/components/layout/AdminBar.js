import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown, Form, Container, Button } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";
import "../../assets/Style.css";

import "../../assets/Style.css";

class AdminBar extends Component {
  render() {
    console.log("El componente se usa ¡barra de torneos!");
    console.log("------------x------------", this.props.match.params);

    const { isAuthenticated } = this.props.auth;
    const { id } = this.props.match.params;
    let myLink1 = "/ver-torneo/" + id + "/grupos";

    let myLink2 = "/ver-torneo/" + id + "/clasificacion-general";

    if (isAuthenticated) {
      return (
        <nav className="navbar-torneo">
          <NavLink exact to={myLink1}>
            Grupos
          </NavLink>

          <NavLink exact to={myLink2}>
            Clasificación General
          </NavLink>
        </nav>
      );
    }
  }
}
//Si tiene dispatch, lo añado aqui como una funcion. Sino, no.
AdminBar.propTypes = {
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  torneoInfo: state.torneoInfo,
  match: state.match
});
export default connect(mapStateToProps)(withRouter(AdminBar));
