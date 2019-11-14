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
    if (isAuthenticated) {
      return (
        // <Navbar bg="light" expand="lg">
        //   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //   <Navbar.Collapse id="basic-navbar-nav">
        //     <Nav className="mr-auto">
        //       <Nav.Link href="#home">Home</Nav.Link>
        //       <Nav.Link href="#link">Link</Nav.Link>
        //       <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.2">
        //           Another action
        //         </NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.3">
        //           Something
        //         </NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item href="#action/3.4">
        //           Separated link
        //         </NavDropdown.Item>
        //       </NavDropdown>
        //     </Nav>
        //     <Form inline>
        //       <Button variant="outline-success">Search</Button>
        //     </Form>
        //   </Navbar.Collapse>
        // </Navbar>
        // <div className="btn-group mb-4" role="group">
        //   <Link to="/torneo-apuntado-info/parejas" className="btn btn-light">
        //     <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
        //   </Link>
        //   <Link
        //     to="/torneo-apuntado-info/clasificacion"
        //     className="btn btn-light"
        //   >
        //     <i className="fab fa-black-tie text-info mr-1"></i>
        //     Add Experience
        //   </Link>
        //   <Link
        //     to="/torneo-apuntado-info/resultado-partido-pareja"
        //     className="btn btn-light"
        //   >
        //     <i className="fas fa-graduation-cap text-info mr-1"></i>
        //     Add Education
        //   </Link>
        // </div>

        <nav className="navbar-torneo">
          <NavLink exact to="/torneo-apuntado-info/:id/parejas">
            Parejas
          </NavLink>
          <NavLink exact to="/torneo-apuntado-info/clasificacion">
            Clasificacion de la ronda
          </NavLink>
          <NavLink exact to="/torneo-apuntado-info/subir-resultado/">
            Sube el resultado de un partido
          </NavLink>
          <NavLink exact to="/torneo-apuntado-info/grupos">
            Grupos de la ronda
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
