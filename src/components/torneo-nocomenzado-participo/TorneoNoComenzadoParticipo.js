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
    const { torneoNoComenzado, loadingTNC } = this.props.torneoInfo;
    console.log("***************", this.props.match);
    let torneoContent;
    console.log("loadingTNC", loadingTNC);
    if (loadingTNC) {
      torneoContent = <Spinner />;
    } else {
      console.log("Esta es la info del torneo ", torneoNoComenzado);
      console.log(torneoNoComenzado.tournament.couples);

      let table = [];
      let j = 0;
      let createTable = () => {
        for (var i = 0; i < torneoNoComenzado.tournament.couples.length; i++) {
          let children = [];
          console.log("i: ", i);
          console.log(torneoNoComenzado.tournament.couples.length);
          console.log(
            "hola",
            i,
            torneoNoComenzado.tournament.couples[i].user1Name
          );
          console.log(
            "adios",
            i,
            torneoNoComenzado.tournament.couples[i].user2Name
          );

          children.push(
            <td key={j} className="text-center">
              {torneoNoComenzado.tournament.couples[i].user1Name}
            </td>
          );
          j++;
          children.push(
            <td key={j}>{torneoNoComenzado.tournament.couples[i].user2Name}</td>
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
            Torneo {torneoNoComenzado.tournament.name}
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
      <div className="dashboard">
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
