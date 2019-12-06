import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

class ClasifGeneral extends Component {
  render() {
    console.log("hola");
    const {
      roundsLoading,
      rounds,
      loading2,
      torneoAdmin
    } = this.props.torneosActivosAdmin;

    let clasificacionGeneralContent;
    console.log("CLASIFICACION GENERAL ADMIN", torneoAdmin);

    if (loading2) {
      clasificacionGeneralContent = <Spinner />;
    } else {
      console.log(
        "**********************Estoy en ClasificacionGeneral, info del torneo ",
        torneoAdmin
      );
      console.log(torneoAdmin.tournament.couples);
      let table = [];
      let j = 0;
      let createTable = () => {
        let torneo = torneoAdmin.tournament;
        for (var i = 0; i < torneo.couples.length; i++) {
          let children = [];
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].user1Name} {torneo.couples[i].user1LastName}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].user2Name} {torneo.couples[i].user2LastName}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].puntos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].partidosJugados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].partidosGanados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].partidosPerdidos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].setsGanados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].setsPerdidos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].juegosGanados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].juegosPerdidos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].diferenciaJuegos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneo.couples[i].diferenciaSets}
            </td>
          );
          j++;

          table.push(
            <tr key={i} className="table">
              {children}
            </tr>
          );
        }
        console.log("table en ClasificacionGeneral", table);
        return table;
      };

      clasificacionGeneralContent = (
        <div>
          <table>
            <thead>
              <tr>
                <th className="text-right">Pareja </th>
                <th className="text-center"> </th>
                <th className="text-center">Puntos </th>
                <th className="text-center">Partidos Jugados </th>
                <th className="text-center">Partidos Ganados </th>
                <th className="text-center">Partidos Perdidos </th>
                <th className="text-center">Sets Ganados</th>
                <th className="text-center">Sets Perdidos </th>
                <th className="text-center">Juegos Ganados </th>
                <th className="text-center">Juegos Perdidos </th>
                <th className="text-center">Diferencia Juegos </th>
                <th className="text-center">Diferencia Sets </th>
              </tr>
            </thead>
            <tbody>{createTable()}</tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Clasificación general</h2>

          {clasificacionGeneralContent}
        </div>
      </div>
    );
  }
}
ClasifGeneral.propTypes = {
  torneosActivosAdmin: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match
});

export default connect(mapStateToProps)(withRouter(ClasifGeneral));