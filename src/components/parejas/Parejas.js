import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";

import Spinner from "../common/Spinner";
import { infoTorneoComenzadoParticipo } from "../../actions/torneoInfoAction";
class Parejas extends Component {
  //No funciona, en clasificación tb lo tengo q arreglar
  // componentDidMount() {
  //   this.props.infoTorneoComenzadoParticipo();
  // }
  render() {
    const { torneoInformacion, loading } = this.props.torneoInfo;
    let parejasContent;
    console.log("LOADING PAREJAS", loading);

    if (loading) {
      console.log("kjsdhfiusalfhgsuiflfghsjdhfjash", loading);
      parejasContent = <Spinner />;
    } else {
      console.log(
        "**********************Estoy en parejas, info del torneo ",
        torneoInformacion
      );
      console.log(torneoInformacion.tournament.couples);

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
            "user1name",
            i,
            torneoInformacion.tournament.couples[i].user1Name
          );
          console.log(
            "user2name",
            i,
            torneoInformacion.tournament.couples[i].user2Name
          );

          children.push(
            <td key={j} className="text-left">
              {torneoInformacion.tournament.couples[i].user1Name}{" "}
              {torneoInformacion.tournament.couples[i].user1LastName}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneoInformacion.tournament.couples[i].user2Name}{" "}
              {torneoInformacion.tournament.couples[i].user2LastName}
            </td>
          );
          j++;

          table.push(
            <tr key={i} className="table">
              {children}
            </tr>
          );
        }
        console.log("table en parejas", table);
        return table;
      };

      parejasContent = (
        <div>
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
    }

    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Lista de parejas apuntadas en el torneo</h2>

          {parejasContent}
        </div>
      </div>
    );
  }
}
Parejas.propTypes = {
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo
});

export default connect(mapStateToProps, { infoTorneoComenzadoParticipo })(
  Parejas
);
