import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { infoTorneoNoComenzadoParticipo } from "../../actions/torneoInfoAction";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";

// TODO: Poner un botón de volver
class TorneoNoComenzadoParticipo extends Component {
  componentDidMount() {
    console.log(
      "-------------------x------------------- DIDMOUNT TORNEO NO COMENZADO"
    );
    const { id } = this.props.match.params;
    console.log("COMPONENTDIDMOUNT", this.props.match.params.id);
    this.props.infoTorneoNoComenzadoParticipo(id);
  }
  render() {
    const {
      torneoInformacion,
      loadingTorneo,
      loadingRonda
    } = this.props.torneoInfo;
    console.log("***************", this.props.match);
    let torneoContent;
    if (loadingTorneo) {
      torneoContent = <Spinner />;
    } else {
      console.log("Esta es la info del torneo ", torneoInformacion);
      console.log(torneoInformacion.tournament.couples);

      let parejasContent;
      let table = [];
      let j = 0;
      let createTable = () => {
        for (var i = 0; i < torneoInformacion.tournament.couples.length; i++) {
          let children = [];
          console.log("i: ", i);
          console.log(torneoInformacion.tournament.couples.length);
          console.log(
            "hola",
            i,
            torneoInformacion.tournament.couples[i].user1Name
          );
          console.log(
            "adios",
            i,
            torneoInformacion.tournament.couples[i].user2Name
          );

          children.push(
            <td key={j} className="text-left">
              {torneoInformacion.tournament.couples[i].user1Name}
            </td>
          );
          j++;
          children.push(
            <td key={j}>{torneoInformacion.tournament.couples[i].user2Name}</td>
          );
          j++;

          table.push(
            <tr key={i} className="table">
              {children}
            </tr>
          );
        }

        return table;
      };

      torneoContent = (
        <div>
          <h1 className="display-4 text-center">
            Torneo {torneoInformacion.tournament.name}
          </h1>
          <p>El torneo todavía no ha comenzado.</p>
          <p>Te mostramos la lista de parejas apuntadas de momento</p>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Jugador 1 </th>
                  <th>Jugador 2 </th>
                </tr>
              </thead>
              <tbody>{createTable()}</tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">{torneoContent}</div>
        </div>
      </div>
    );
  }
}

TorneoNoComenzadoParticipo.propTypes = {
  infoTorneoNoComenzadoParticipo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  match: state.match
});
export default connect(mapStateToProps, { infoTorneoNoComenzadoParticipo })(
  withRouter(TorneoNoComenzadoParticipo)
);
