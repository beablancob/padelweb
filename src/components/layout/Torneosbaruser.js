// rcc
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

class Torneosbaruser extends Component {
  render() {
    console.log("El componente se usa ¡barra de torneos!");
    console.log("------------x------------", this.props.match.params);

    const { isAuthenticated } = this.props.auth;
    const { id } = this.props.match.params;
    let myLink1 = "/torneo-apuntado-info/" + id + "/parejas";
    let myLink2 = "/torneo-apuntado-info/" + id + "/clasificacion";
    let myLink3 = "/torneo-apuntado-info/" + id + "/grupo-actual";
    let myLink4 = "/torneo-apuntado-info/" + id + "/clasificacion-general";

    if (isAuthenticated) {
      return (
        <nav className="navbar-torneo">
          <NavLink exact to={myLink1}>
            Parejas
          </NavLink>
          <NavLink exact to={myLink2}>
            Clasificación de la ronda actual
          </NavLink>
          <NavLink exact to={myLink3}>
            Grupo actual
          </NavLink>
          <NavLink exact to={myLink4}>
            Clasificación General
          </NavLink>
        </nav>
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

{
  // return (
  //   <Router>
  //     <MDBNavbar color="default-color" dark expand="md">
  //       <MDBNavbarBrand>
  //         <strong className="white-text">Navbar</strong>
  //       </MDBNavbarBrand>
  //       <MDBNavbarToggler onClick={this.toggleCollapse} />
  //       <MDBCollapse id="navbarCollapse3" navbar>
  //         <MDBNavbarNav left>
  //           <MDBNavItem active>
  //             <Link to="/torneo-apuntado-info/parejas">Parejas</Link>
  //           </MDBNavItem>
  //           <MDBNavItem>
  //             <MDBDropdown>
  //               <MDBDropdownToggle>
  //                 <div className="d-none d-md-inline">Rondas</div>
  //               </MDBDropdownToggle>
  //               <MDBDropdownMenu className="dropdown-default">
  //                 <Link to="/clasificacion">Mi clasificación</Link>
  //                 <MDBDropdownItem href="#!">Partidos</MDBDropdownItem>
  //                 <MDBDropdownItem href="#!">Grupos</MDBDropdownItem>
  //               </MDBDropdownMenu>
  //             </MDBDropdown>
  //           </MDBNavItem>
  //           <MDBNavItem>
  //             <Link to="#!">Ranking</Link>
  //           </MDBNavItem>
  //           <MDBNavItem>
  //             <Link to="#!">Contacto</Link>
  //           </MDBNavItem>
  //         </MDBNavbarNav>
  //       </MDBCollapse>
  //     </MDBNavbar>
  //   </Router>
  // );
  // ---------x -------
  // <Navbar expand="lg" variant="light" bg="light">
  //         <Container>
  //           <Nav className="mr-auto">
  //             <Link to="/rondas">Rondas</Link>
  //             <Link to="/parejas">Parejas</Link>
  //             <Link to="/ranking">Ranking</Link>
  //             <Link to="/contacto">Contacto</Link>
  //           </Nav>
  //         </Container>
  //       </Navbar>
  /* <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
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
          </nav> */
}
