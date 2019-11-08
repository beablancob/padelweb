import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class Grupos extends Component {
  //No funciona, en clasificación tb lo tengo q arreglar
  // componentDidMount() {
  //   this.props.infoTorneoComenzadoParticipo();
  // }
  render() {
    const {
      torneoInformacion,
      miRondaInformacion,
      loading
    } = this.props.torneoInfo;

    console.log(
      ">>>>>>>>>>>><Estoy en Grupos, info de la ronda<<<<<<<<<<<<<",
      miRondaInformacion
    );

    let gruposContent;

    if (loading) {
      gruposContent = <Spinner />;
    } else {
      if (miRondaInformacion === null) {
        <p>No hay todavía información de la ronda</p>;
      } else {
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
              <caption>Grupo 1</caption>
              <thead>
                <tr>
                  <th>Componente 1 </th>
                  <th>Componente 2 </th>
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
Grupos.propTypes = {
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo
});

export default connect(mapStateToProps)(Grupos);
