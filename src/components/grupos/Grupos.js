// YA NO ME HACE FALTA ESTE COMPONENTE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";
import "../../assets/Style.css";

class Grupos extends Component {
  render() {
    const {
      roundsLoading,
      rounds,
      loading2,
      torneoAdmin
    } = this.props.torneosActivosAdmin;

    console.log(
      ">>>>>>>>>>>><Estoy en Grupos, info de la ronda<<<<<<<<<<<<<",
      torneoAdmin
    );
    const { id } = this.props.match.params;

    let gruposContent;

    if (loading2) {
      gruposContent = <Spinner />;
    } else {
      if (torneoAdmin === null) {
        gruposContent = <p>Todavía no hay información del torneo</p>;
      } else {
        console.log("HEY YOU", torneoAdmin.tournament);
        let couples = torneoAdmin.tournament.couples;
        let numGrupos;
        for (let i = 0; i < couples.length - 1; i++) {
          numGrupos = couples[i].grupoActual;
          if (couples[i + 1].grupoActual > numGrupos) {
            numGrupos = couples[i + 1].grupoActual;
          }
          numGrupos += 1;
        }
        let createTable = () => {
          let table = [];
          let k = 0;
          let m = 0;

          for (let i = 0; i < numGrupos; i++) {
            let children = [];
            let numGrupo = i + 1;
            let myLink =
              "/ver-torneo/" + id + "/grupos/" + numGrupo + "/clasificacion";
            children.push(
              <td key={k} className="grupos">
                <Link className="link-button" to={myLink}>
                  {`Grupo ${numGrupo}`}
                </Link>
              </td>
            );
            k++;

            k = 0;
            table.push(<tr key={m}>{children}</tr>);
            m++;
          }
          m = 0;
          return table;
        };
        gruposContent = (
          <table>
            <tbody>{createTable()}</tbody>
          </table>
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
  torneosActivosAdmin: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin
});

export default connect(mapStateToProps, { miRondaInfo })(withRouter(Grupos));
