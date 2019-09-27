import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../assets/Style.css";
import { infoTorneoComenzadoNoParticipo } from "../../actions/torneoInfoAction";

// TODO: Poner un botón de volver
class TorneoComenzadoNoParticipo extends Component {
  render() {
    const { torneoInformacion } = this.props.torneoInfo;

    console.log("Esta es la info del torneo ", torneoInformacion);
    console.log(torneoInformacion.tournament.couples);

    let parejasContent;
    let table = [];
    let j = 0;
    let createTable = () => {
      for (
        var i = 0;
        i < torneoInformacion.tournament.couples.length - 1;
        i++
      ) {
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
          <td key={j} className="text-center">
            {torneoInformacion.tournament.couples[i].user1Name}
          </td>
        );
        j++;
        children.push(
          <td key={j}>{torneoInformacion.tournament.couples[i].user2Name}</td>
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

    parejasContent = (
      <div className="text-center">
        <table>
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

    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">
              Torneo {torneoInformacion.tournament.name}
            </h1>
            <p>El torneo todavía no ha comenzado.</p>
            <div className="row">
              <div className="col-6">
                <p>Lista de parejas apuntadas de momento</p>
                {parejasContent}
              </div>

              <div className="col-6 verde text-center">
                <p>Ronda actual</p>
                <p className="text-center">
                  {torneoInformacion.tournament.rondaActual}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

TorneoComenzadoNoParticipo.propTypes = {
  infoTorneoNoComenzadoParticipo: PropTypes.func.isRequired,
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo
});
export default connect(
  mapStateToProps,
  { infoTorneoComenzadoNoParticipo }
)(TorneoComenzadoNoParticipo);
