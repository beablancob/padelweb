import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  miRondaInfo,
  infoTorneoComenzadoParticipo
} from "../../actions/torneoInfoAction";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";

class Clasificacion extends Component {
  render() {
    const {
      torneoInformacion,
      loadingTorneo,
      miRondaInformacion
    } = this.props.torneoInfo;
    console.log(torneoInformacion);
    let torneo = torneoInformacion.tournament;
    console.log(torneo.tournament);
    let couples = torneo.couples;
    let j = 0;
    let m = 500;
    let numGrupos;
    for (let i = 0; i < couples.length - 1; i++) {
      numGrupos = couples[i].grupoActual;

      if (couples[i + 1].grupoActual > numGrupos) {
        numGrupos = couples[i + 1].grupoActual;
      }
      numGrupos += 1;
    }

    console.log("numero de grupos del torneo", numGrupos);

    let createTables = parejas => {
      let table = [];
      // Outer loop to create parent
      for (let i = 0; i < parejas.length; i++) {
        let children = [];
        //Inner loop to create children
        j++;
        children.push(
          <td key={j} className="text-left">
            {parejas[i].user1Name} {parejas[i].user1LastName}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-left">
            {parejas[i].user2Name} {parejas[i].user2LastName}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].puntos}
          </td>
        );
        j++;

        children.push(
          <td key={j} className="text-center">
            {parejas[i].partidosJugados}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-left">
            {parejas[i].partidosGanados}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].partidosPerdidos}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].setsGanados}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].setsPerdidos}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].juegosGanados}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].juegosPerdidos}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].diferenciaJuegos}
          </td>
        );
        j++;
        children.push(
          <td key={j} className="text-center">
            {parejas[i].diferenciaSets}
          </td>
        );
        j++;
        m++;

        //Create the parent and add the children
        table.push(
          <tr key={m} className="table">
            {children}
          </tr>
        );
        m++;
      }
      return table;
    };
    let generateTable = parejas => {
      console.log("************", parejas[0].grupoActual);
      let clasifContent = (
        <div>
          <h4>Grupo {parejas[0].grupoActual + 1}</h4>

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
            <tbody>{createTables(parejas)}</tbody>
          </table>
        </div>
      );

      return clasifContent;
    };

    let tables = [];
    for (let i = 0; i < numGrupos; i++) {
      let grupo = couples.filter(obj => {
        return obj.grupoActual === i;
      });
      console.log("grupo--------------", grupo);
      tables.push(generateTable(grupo));
    }

    console.log("TABLA DE CLASIFICACIÓN", tables);

    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Clasificación de la ronda actualmente en juego</h2>

          {tables}
        </div>
      </div>
    );
  }
}

Clasificacion.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  auth: state.auth
});

export default connect(mapStateToProps, {
  miRondaInfo,
  infoTorneoComenzadoParticipo
})(withRouter(Clasificacion));
