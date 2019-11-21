// YA NO ME HACE FALTA ESTE COMPONENTE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";

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

    if (loading2) {
      gruposContent = <Spinner />;
    } else {
      if (torneoAdmin === null) {
        gruposContent = <p>Todavía no hay información de la ronda</p>;
      } else {
        console.log(torneoAdmin.tournament);
        let table = [];
        let j = 0;
        let couples = torneoAdmin.tournament.couple;
        let createTable = () => {
          for (var i = 0; i < couples.length; i++) {
            let children = [];
            let numeroGrupo = numGrupo - 1;
            if (numGrupo === couples[i].grupoActual) {
              children.push(
                <td key={j} className="text-left">
                  {couples[i].grupoActual}
                </td>
              );
              children.push(
                <td key={j} className="text-left">
                  {couples[i].juegosGanados}
                </td>
              );
              table.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );
            }
          }
          console.log("table en Grupos", table);
          return table;
        };

        gruposContent = (
          <div>
            <table>
              <caption>Grupo</caption>
              <thead>
                <tr>
                  <th>Pareja </th>
                  <th>Jugadores</th>
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
        <div className="container">
          <h2>Lista de grupos de la ronda en juego</h2>

          {gruposContent}
        </div>
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
