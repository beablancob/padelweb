import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class Parejas extends Component {
  //No funciona, en clasificación tb lo tengo q arreglar

  render() {
    const { torneoInfo } = this.props.torneoApuntadoInfo;

    console.log("Esta es la info del torneo ", torneoInfo);
    console.log(torneoInfo.tournament.couples);

    let parejasContent;
    let table = [];
    let j = 0;

    let createTable = () => {
      for (var i = 0; torneoInfo.tournament.couples.length; i++) {
        let children = [];
        console.log("hola", torneoInfo.tournament.couples[i].user1Name);
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
    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">
              Lista de parejas apuntadas en el torneo
            </h2>

            {parejasContent}
          </div>
        </div>
      </div>
    );
  }
}
Parejas.propTypes = {
  torneoApuntadoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoApuntadoInfo: state.torneoApuntadoInfo
});

export default connect(mapStateToProps)(Parejas);
