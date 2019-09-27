import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { parejaContrincante } from "../../actions/resultadoPartidoAction";

class ResultadoPartidoPareja extends Component {
  //No funciona, en clasificación tb lo tengo q arreglar
  constructor() {
    super();
    this.onSeleccionPareja = this.onSeleccionPareja.bind(this);
  }
  onSeleccionPareja(pareja) {
    this.props.parejaContrincante(pareja, this.props.history);
  }
  render() {
    const { torneoInfo, miRondaInformacion } = this.props.torneoApuntadoInfo;
    const { user } = this.props.auth;
    console.log("hola caracola");
    console.log("Esta es la info del torneo ", torneoInfo);
    console.log(torneoInfo.tournament.couples);
    let table = [];
    let miParejaId;
    let miGrupo;
    let j = 0;
    let createTable = () => {
      for (var i = 0; torneoInfo.tournament.couples.length - 1; i++) {
        let parejasGrupo = [];

        if (
          torneoInfo.tournament.couples[i].user1Name === user.id ||
          torneoInfo.tournament.couples[i].user2Name === user.id
        ) {
          miParejaId = torneoInfo.tournament.couples[i].id;
          miGrupo = torneoInfo.tournament.couples[i].grupoActual;
        }
        if (miGrupo != null) {
          if (
            torneoInfo.tournament.couples[i].user1Name != user.id &&
            torneoInfo.tournament.couples[i].user2Name != user.id
          ) {
            if (torneoInfo.tournament.couples[i].grupoActual === miGrupo) {
              parejasGrupo.push(
                <td
                  key={j}
                  onClick={this.seleccionPareja.bind(
                    this,
                    torneoInfo.tournament.couples[i]
                  )}
                >
                  {torneoInfo.tournament.couples[i].user1Name}y
                  {torneoInfo.tournament.couples[i].user2Name}
                </td>
              );
              j++;
            }
          }
        }
        table.push(
          <tr key={i} className="text-center">
            {parejasGrupo}
          </tr>
        );
      }
      return table;
    };

    parejasContent = (
      <div>
        <table>
          <thead>
            <tr>
              <th>Parejas</th>
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
        </table>
      </div>
    );

    return (
      <div>
        <h1>Elige la pareja contra la que has jugado de tu grupo</h1>
        {parejasContents}
      </div>
    );
  }
}
ResultadoPartidoPareja.propTypes = {
  torneoApuntadoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoApuntadoInfo: state.torneoApuntadoInfo,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(ResultadoPartidoPareja));
