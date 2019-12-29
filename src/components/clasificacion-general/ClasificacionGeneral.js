import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

class ClasificacionGeneral extends Component {
  render() {
    const { torneoInformacion, loadingTorneo } = this.props.torneoInfo;

    let clasificacionGeneralContent;

    if (loadingTorneo) {
      clasificacionGeneralContent = <Spinner />;
    } else {
      console.log(
        "**********************Estoy en ClasificacionGeneral, info del torneo ",
        torneoInformacion
      );
      console.log(torneoInformacion.tournament.couples);

      let table = [];
      let j = 0;
      let createTable = () => {
        let torneo = torneoInformacion.tournament;
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
            <td key={j} className="text-center">
              {torneo.couples[i].puntos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].partidosJugados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].partidosGanados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].partidosPerdidos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].setsGanados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].setsPerdidos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].juegosGanados}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].juegosPerdidos}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].diferenciaSets}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-center">
              {torneo.couples[i].diferenciaJuegos}
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
                <th className="text-center">Diferencia de Sets </th>
                <th className="text-center">Diferencia de Juegos </th>
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
ClasificacionGeneral.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  match: state.match
});

export default connect(mapStateToProps)(withRouter(ClasificacionGeneral));
