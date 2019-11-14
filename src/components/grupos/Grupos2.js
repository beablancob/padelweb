import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";

class Grupos2 extends Component {
  componentDidMount() {
    const { torneoInformacion } = this.props.torneoInfo;
    this.props.miRondaInfo(torneoInformacion);
  }
  render() {
    const {
      torneoInformacion,
      miRondaInformacion,
      loadingRonda
    } = this.props.torneoInfo;

    console.log(
      ">>>>>>>>>>>><Estoy en Grupos, info de la ronda<<<<<<<<<<<<<",
      miRondaInformacion,
      torneoInformacion
    );

    let gruposContent;

    if (loadingRonda) {
      gruposContent = <Spinner />;
    } else {
      if (miRondaInformacion === null) {
        gruposContent = <p>Todavía no hay información de la ronda</p>;
      } else {
        console.log(miRondaInformacion.partidos);
        let table = [];
        let j = 0;
        let createTable = () => {
          for (var i = 0; i < miRondaInformacion.partidos.length - 1; i++) {
            let children = [];

            children.push(
              <td key={j} className="text-left">
                {miRondaInformacion.partidos[i].numeroGrupo}
              </td>
            );
            table.push(
              <tr key={i} className="text-center">
                {children}
              </tr>
            );
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
Grupos2.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo
});

export default connect(mapStateToProps, { miRondaInfo })(withRouter(Grupos2));
