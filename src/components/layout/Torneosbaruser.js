// rcc
import React, { Component } from "react";
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
  constructor() {
    super();
    this.onMiRondaInfo = this.onMiRondaInfo.bind(this);
  }

  onMiRondaInfo(rondaActual, id) {
    this.props.miRondaInfo(rondaActual, id);
  }

  render() {
    console.log("El componente se usa ¡barra de torneos!");
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

        <nav className="navbar-torneo">
          <NavLink exact to="/torneo-apuntado-info/parejas">
            Parejas
          </NavLink>
          <NavLink exact to="/torneo-apuntado-info/clasificacion">
            Clasificacion
          </NavLink>
          <NavLink exact to="/torneo-apuntado-info/resultado-partido-pareja">
            Sube el resultado de un partido
          </NavLink>
        </nav>
      );
    }
  }
}
//Si tiene dispatch, lo añado aqui como una funcion. Sino, no.
Torneosbaruser.propTypes = {
  auth: PropTypes.object.isRequired,
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  torneoInfo: state.torneoInfo
});
export default connect(mapStateToProps)(Torneosbaruser);

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
