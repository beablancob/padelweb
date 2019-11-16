// YA NO ME HACE FALTA ESTE COMPONENTE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { parejaContrincante } from "../../actions/resultadoPartidoAction";
import { infoTorneoComenzadoParticipo } from "../../actions/torneoInfoAction";

class ResultadoPartidoPareja extends Component {
  // componentDidMount() {
  //   const { torneoInformacion } = this.props.torneoInfo;
  //   let torneoId = torneoInformacion.tournament.id;
  //   console.log(torneoId);
  //   this.props.infoTorneoComenzadoParticipo(torneoId);
  // }
  render() {
    const { torneoInformacion } = this.props.torneoInfo;
    let torneoInfo = torneoInformacion;
    const { user } = this.props.auth;
    let table = [];
    let miParejaId;
    let miGrupo;
    let k = 0;
    let parejasContent;
    let createTable = () => {
      for (var i = 0; i < torneoInfo.tournament.couples.length; i++) {
        let parejasGrupo = [];
        console.log(
          "kdjhfsfh",
          torneoInfo.tournament.couples[i].user1Id,
          user.id
        );
        if (
          torneoInfo.tournament.couples[i].user1Id === user.id ||
          torneoInfo.tournament.couples[i].user2Id === user.id
        ) {
          miParejaId = torneoInfo.tournament.couples[i].id;
          miGrupo = torneoInfo.tournament.couples[i].grupoActual;
        }
        if (miGrupo != null) {
          if (torneoInfo.tournament.couples[i].grupoActual === miGrupo) {
            let myLink =
              "torneo-apuntado-info/resultado-partido" +
              torneoInfo.tournament.couples[i].id;
            parejasGrupo.push(
              <td key={k} className="text-center">
                <Link className="link-parejas" to={myLink}>
                  {torneoInfo.tournament.couples[i].user1Name}{" "}
                  {torneoInfo.tournament.couples[i].user1LastName} y{" "}
                  {torneoInfo.tournament.couples[i].user2Name}{" "}
                  {torneoInfo.tournament.couples[i].user2LastName}
                </Link>
              </td>
            );

            k++;
          }
        }
        table.push(
          <tr key={i} className="table">
            {parejasGrupo}
          </tr>
        );
      }
      return table;
    };

    parejasContent = (
      <div>
        <table className="text-align text-center">
          <thead>
            <tr>
              <th>Parejas de tu grupo</th>
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
        </table>
      </div>
    );

    return (
      <div>
        <h1>Elige la pareja contra la que has jugado</h1>
        {parejasContent}
      </div>
    );
  }
}
ResultadoPartidoPareja.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  infoTorneoComenzadoParticipo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  auth: state.auth
});

export default connect(mapStateToProps, { infoTorneoComenzadoParticipo })(
  withRouter(ResultadoPartidoPareja)
);
