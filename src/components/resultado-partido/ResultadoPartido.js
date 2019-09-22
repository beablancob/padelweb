import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class ResultadoPartido extends Component {
  //No funciona, en clasificación tb lo tengo q arreglar

  render() {
    const { torneoInfo, miRondaInformacion } = this.props.torneoApuntadoInfo;
    const { parejaSelected } = this.props.resultadoPartido;
    const { user } = this.props.auth;

    console.log("Esta es la info del torneo ", torneoInfo);
    console.log(torneoInfo.tournament.couples);

    let miParejaId;

    for (var i = 0; torneoInfo.tournament.couples.length - 1; i++) {
      if (
        torneoInfo.tournament.couples[i].user1Name === user.id ||
        torneoInfo.tournament.couples[i].user2Name === user.id
      ) {
        miParejaId = torneoInfo.tournament.couples[i].id;
        break;
      }
    }

    let ResultadoPartidoContent;
    let table = [];
    let j = 0;
    let couple1;
    let grupo;
    for (var i = 0; torneoInfo.tournament.couples.length - 1; i++) {
      if (
        torneoInfo.tournament.couples[i].user1Name === user.id ||
        torneoInfo.tournament.couples[i].user2Name === user.id
      ) {
        grupo = torneoInfo.tournament.couples[i].grupo;
      }
    }

    let createTable = () => {
      for (var i = 0; torneoInfo.tournament.couples.length - 1; i++) {
        let children = [];
        console.log("hola", i, torneoInfo.tournament.couples[i].user1Name);
        console.log("adios", torneoInfo.tournament.couples[i].user2Name);

        children.push(
          <td key={j} className="text-left">
            {torneoInfo.tournament.couples[i].user1Name}
          </td>
        );
        j++;
        children.push(
          <td key={j}>{torneoInfo.tournament.couples[i].user2Name}</td>
        );
        j++;

        table.push(
          <tr key={i} className="text-center">
            {children}
          </tr>
        );
      }

      return table;
    };

    ResultadoPartidoContent = (
      <div>
        <table>
          <thead>
            <tr>
              <th>Parejas </th>
              <th>Set 1 </th>
              <th>Set 2 </th>
              <th>Set 3 </th>
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
        </table>
      </div>
    );
    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Sube el resultado de la jornada actual</h2>

          {ResultadoPartidoContent}
        </div>
      </div>
    );
  }
}
ResultadoPartido.propTypes = {
  torneoApuntadoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  resultadoPartido: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoApuntadoInfo: state.torneoApuntadoInfo,
  auth: state.auth,
  resultadoPartido: state.resultadoPartido
});

export default connect(mapStateToProps)(ResultadoPartido);
