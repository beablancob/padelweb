// YA NO ME HACE FALTA ESTE COMPONENTE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";
import "../../assets/Style.css";

// NO QUIERO ESTO, QUIERO EDITAR UN RESULTADO DE UN PARTIDO

class Grupo extends Component {
  componentDidMount() {
    const { id, numGrupo } = this.props.match.params;
    console.log(id);
  }
  render() {
    const { torneoAdmin, loading2 } = this.props.torneosActivosAdmin;
    console.log("+++++++++++++++++++++++++++", this.props.match.params);
    const { id, numGrupo } = this.props.match.params;

    console.log(">>>>>>>>>>>>", loading2, torneoAdmin);

    let gruposContent;
    let m = 20;
    if (loading2) {
      gruposContent = <Spinner />;
    } else {
      if (torneoAdmin === null) {
        gruposContent = <p>Todavía no hay información de la ronda</p>;
      } else {
        console.log(torneoAdmin.tournament);
        let table = [];
        let numeroGrupo = numGrupo - 1;

        let j = 0;
        let couples = torneoAdmin.tournament.couples;
        let createTable = () => {
          for (var i = 0; i < couples.length; i++) {
            let children = [];
            if (numeroGrupo === couples[i].grupoActual) {
              j++;
              children.push(
                <td key={j} className="text-left">
                  {couples[i].user1Name} {couples[i].user1LastName}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-left">
                  {couples[i].user2Name} {couples[i].user2LastName}
                </td>
              );
              children.push(
                <td key={j} className="text-center">
                  {couples[i].puntos}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].partidosJugados}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].partidosGanados}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].partidosPerdidos}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-left">
                  {couples[i].setsGanados}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-left">
                  {couples[i].setsPerdidos}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].juegosGanados}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].juegosPerdidos}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].diferenciaSets}
                </td>
              );
              j++;
              children.push(
                <td key={j} className="text-center">
                  {couples[i].diferenciaJuegos}
                </td>
              );
              j++;
              m++;
              table.push(
                <tr key={m} className="table">
                  {children}
                </tr>
              );
              m++;
            }
          }
          console.log("table en Grupos", table);
          return table;
        };

        gruposContent = (
          <div>
            <h2>Grupo {numGrupo} de la ronda en juego</h2>

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
                  <th className="text-center">Diferencia Sets </th>
                  <th className="text-center">Diferencia Juegos </th>
                </tr>
              </thead>
              <tbody>{createTable()}</tbody>
            </table>
          </div>
        );
      }
    }

    return (
      <div className="info-torneo">
        <div className="container">{gruposContent}</div>
      </div>
    );
  }
}
Grupo.propTypes = {
  torneosActivosAdmin: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match
});

export default connect(mapStateToProps, { miRondaInfo })(withRouter(Grupo));
