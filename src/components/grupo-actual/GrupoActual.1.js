import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import { miRondaInfo } from "../../actions/torneoInfoAction";
//import { infoTorneoComenzadoParticipo } from "../../actions/torneoInfoAction";

class GrupoActual extends Component {
  // TODO: TENGO QUE PEDIR LA INFORMACIÓN DE MI RONDA QUE ES DONDE ESTÁN LOS PARTIDOS!!
  componentDidMount() {
    const { torneoInformacion } = this.props.torneoInfo;

    miRondaInfo(torneoInformacion);
    console.log("DIDD");
  }
  render() {
    const {
      torneoInformacion,
      loadingTorneo,
      loadingRonda,
      miRondaInformacion
    } = this.props.torneoInfo;
    const { user } = this.props.auth;
    console.log("miRonda", "loading ronda", miRondaInformacion, loadingRonda);
    let parejasContent;

    if (loadingTorneo) {
      parejasContent = <Spinner />;
    } else {
      console.log(torneoInformacion.tournament.couples);
      let torneo = torneoInformacion.tournament;
      let miGrupo;

      for (var i = 0; i < torneo.couples.length - 1; i++) {
        if (
          torneo.couples[i].user1Id === user.id ||
          torneo.couples[i].user2Id === user.id
        ) {
          miGrupo = torneo.couples[i].grupoActual;
          console.log("Tengo grupo de mi usuario: ", miGrupo);
          let table = [];
          let j = 0;
          let createTable = () => {
            for (var i = 0; i < torneo.couples.length - 1; i++) {
              console.log(torneo.couples[i].grupoActual, miGrupo);
              let children = [];
              console.log("i: ", i);
              console.log(torneo.couples.length);
              console.log("user1name", i, torneo.couples[i].user1Name);
              console.log("user2name", i, torneo.couples[i].user2Name);
              if (torneo.couples[i].grupoActual === miGrupo) {
                children.push(
                  <td key={j} className="text-left">
                    {torneo.couples[i].user1Name}{" "}
                    {torneo.couples[i].user1LastName}
                  </td>
                );
                j++;
                children.push(
                  <td key={j} className="text-left">
                    {torneo.couples[i].user2Name}{" "}
                    {torneo.couples[i].user2LastName}
                  </td>
                );
                j++;
                children.push(
                  <td key={j} className="text-left">
                    {torneo.couples[i].user2Name}{" "}
                    {torneo.couples[i].user2LastName}
                  </td>
                );
                j++;

                table.push(
                  <tr key={i} className="table">
                    {children}
                  </tr>
                );
              }
            }
            console.log("table en parejas", table);
            return table;
          };

          parejasContent = (
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="text-center">Jugador 1 </th>
                    <th className="text-center">Jugador 2 </th>
                    <th className="text-center">Resultado</th>
                    <th className="text-center">Jugador 3 </th>
                    <th className="text-center">Jugador 4 </th>
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
              <h2>Lista de parejas apuntadas al torneo</h2>

              {parejasContent}
            </div>
          </div>
        );
      }
    }
  }
}

GrupoActual.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(GrupoActual));
