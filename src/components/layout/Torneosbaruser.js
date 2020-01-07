// rcc
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Navbar, Nav, NavDropdown, Form, Container, Button } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";
import { Nav } from "react-bootstrap";

import "../../assets/Style.css";

class Torneosbaruser extends Component {
  render() {
    console.log("El componente se usa ¡barra de torneos!");
    console.log("------------x------------", this.props.match.params);

    const { isAuthenticated } = this.props.auth;
    const { id } = this.props.match.params;
    let myLink1 = "/torneo-apuntado-info/" + id + "/parejas";
    let myLink2 = "/torneo-apuntado-info/" + id + "/clasificacion";
    let myLink3 = "/torneo-apuntado-info/" + id + "/grupo-actual";
    //let myLink4 = "/torneo-apuntado-info/" + id + "/rondas";

    if (isAuthenticated) {
      return (
        <Nav className="navbar-torneo">
          <Nav.Item>
            <Link exact className="aux-nav" to={myLink1}>
              Parejas
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link exact className="aux-nav" to={myLink2}>
              Clasificación de la ronda actual
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link exact className="aux-nav" to={myLink3}>
              Grupo actual
            </Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Link exact className="aux-nav" to={myLink4}>
              Rondas
            </Link>
          </Nav.Item> */}
        </Nav>
      );
    }
  }
}
//Si tiene dispatch, lo añado aqui como una funcion. Sino, no.
Torneosbaruser.propTypes = {
  match: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  torneoInfo: state.torneoInfo,
  match: state.match
});
export default connect(mapStateToProps)(withRouter(Torneosbaruser));
