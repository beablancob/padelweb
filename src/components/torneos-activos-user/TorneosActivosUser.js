import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentTournaments } from "../../actions/torneosActivosUserActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";
import { Link } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class TorneosActivosUser extends Component {
  componentDidMount() {
    this.props.getCurrentTournaments();
  }
  render() {
    const { user } = this.props.auth;
    const { torneos, loading } = this.props.torneosActivosUser;

    let torneosContent;
    console.log("Se esta cargando la pagina", loading);
    //   console.log(torneos.length());
    if (loading) {
      torneosContent = <Spinner />;
    } else {
      console.log("CACACA", torneos);
      if (torneos === null) {
        console.log("Hola bea");
        console.log("Nombre del usuario:", user.name);

        // User is logged
        torneosContent = (
          <div>
            <p className="lead text-muted">Bienvenido </p>
            <p>
              No hay ningún torneo activo de momento, ¡anímate y organiza uno
              como administrador!
            </p>
          </div>
        );
      } else {
        if (torneos.tournaments.length === 0) {
          console.log("Nombre del usuario:", user.name);
          torneosContent = (
            <div>
              <p className="lead text-muted">Bienvenido </p>
              <p>Todavía no has organizado ningún torneo. ¡Anímate a ello!</p>
            </div>
          );
        } else {
          console.log("Existen torneos publicos: ", torneos.tournaments.length);

          var listTorneos;
          // let arrayQuizz = action.payload.quizzes;
          // for (let i=0; i<arrayQuizz.length-1; i++){
          //   if (action.payload.quizzes[i].answer === action.payload.quizzes[i].userAnswer){
          //   total =  total+1;
          listTorneos = torneos.tournaments;

          console.log("Torneos: ", torneos);

          torneosContent = (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre </th>
                    <th>Número de parejas </th>
                    <th>Ronda actual </th>
                    <th>Número de rondas </th>
                    <th>Apúntate </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="text-left">{listTorneos[0].name}</td>
                    <td>{listTorneos[0].numeroParejas}</td>
                    <td>{listTorneos[0].rondaActual}</td>
                    <td>{listTorneos[0].numeroRondas}</td>
                    <td>
                      <Link to="/apuntarse" handler={listTorneos[0]}>
                        Apúntate a este torneo
                      </Link>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="text-left">{listTorneos[1].name}</td>
                    <td>{listTorneos[1].numeroParejas}</td>
                    <td>{listTorneos[1].rondaActual}</td>
                    <td>{listTorneos[1].numeroRondas}</td>
                    <td>
                      <Link to="/apuntarse">Apúntate a este torneo</Link>
                    </td>
                  </tr>
                  {/* <tr className="text-center">
                    <td className="text-left">{listTorneos[2].name}</td>
                    <td>{listTorneos[2].numeroParejas}</td>
                    <td>{listTorneos[2].rondaActual}</td>
                    <td>{listTorneos[2].numeroRondas}</td>
                    <td>
                      <Link to="/apuntarse">Apúntate a este torneo</Link>
                    </td>
                    </tr> */}
                </tbody>
              </table>
            </div>
          );
        }
      }
    }

    return (
      <div className="dashboard">
        <div className="container-app">
          <div className="row">
            <div className="col md-12">
              <h1 className="display-4">Torneos públicos</h1>
              {torneosContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TorneosActivosUser.propTypes = {
  getCurrentTournaments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  torneosActivosUser: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosUser: state.torneosActivosUser,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentTournaments }
)(TorneosActivosUser);
