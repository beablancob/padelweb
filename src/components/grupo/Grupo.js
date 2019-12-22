import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { miRondaInfo } from "../../actions/torneoInfoAction";
import "../../assets/Style.css";

// NO QUIERO ESTO, QUIERO EDITAR UN RESULTADO DE UN PARTIDO

class Grupo extends Component {
  componentDidMount() {
    const { id, numGrupo } = this.props.match.params;
    console.log(id, numGrupo);
  }
  render() {
    const { torneoAdmin, loading2 } = this.props.torneosActivosAdmin;
    console.log("+++++++++++++++++++++++++++", this.props.match.params);
    const { id, numGrupo } = this.props.match.params;

    console.log(">>>>>>>>>>>>", loading2, torneoAdmin);

    let gruposContent;
    let m = 20;
    if (loading2) {
      gruposContent = <Spinner />;
    } else {
      if (torneoAdmin === null) {
        gruposContent = <p>Todavía no hay información de la ronda</p>;
      } else {
        console.log(torneoAdmin.tournament);
        let table = [];
        let numeroGrupo = numGrupo - 1;

        let j = 0;
        let partidos = torneoAdmin.tournament.partidos;
        let couples = torneoAdmin.tournament.couples;
        let createTable = () => {
          let table = [];

          // Outer loop to create parent
          for (let i = 0; i < partidos.length; i++) {
            let children = [];
            //Inner loop to create children
            if (partidos[i].numeroGrupo === numeroGrupo) {
              children.push(
                <td key={j} className="text-center">
                  {partidos[i].user1Name} {partidos[i].user1LastName}{" "}
                  {partidos[i].user2Name} {partidos[i].user2LastName}
                </td>
              );
              j++;
              if (partidos[i].jugado === null || partidos[i].jugado === false) {
                children.push(
                  <td key={j} className="text-center">
                    Partido sin jugar
                  </td>
                );
                j++;
                // let myLink =
                //   "/ver-torneo/" +
                //   torneoAdmin.id +
                //   "/grupos/" +
                //   partidos[i].id +
                //   "/clasificacion/subir-resultado";
                // children.push(
                //   <td key={j} className="td-link">
                //     <Link className="resultado-button" to={myLink}>
                //       Subir resultado
                //     </Link>
                //   </td>
                // );
              } else {
                children.push(
                  <td key={j} className="text-center">
                    {partidos[i].set1Couple1}-{partidos[i].set1Couple2}{" "}
                    {partidos[i].set2Couple1}-{partidos[i].set2Couple2}{" "}
                    {partidos[i].set3Couple1}-{partidos[i].set3Couple2}
                  </td>
                );
                j++;
                // let myLink =
                //   "/ver-torneo/" +
                //   torneoAdmin.id +
                //   "/grupos/" +
                //   partidos[i].id +
                //   "/clasificacion/editar-resultado";
                // children.push(
                //   <td key={j} className="td-link">
                //     <Link className="resultado-button" to={myLink}>
                //       {partidos[i].set1Couple1}-{partidos[i].set1Couple2}{" "}
                //       {partidos[i].set2Couple1}-{partidos[i].set2Couple2}{" "}
                //       {partidos[i].set3Couple1}-{partidos[i].set3Couple2}
                //     </Link>
                //   </td>
                // );
              }
              children.push(
                <td key={j} className="text-center">
                  {partidos[i].user3Name} {partidos[i].user3LastName}{" "}
                  {partidos[i].user4Name} {partidos[i].user4LastName}
                </td>
              );
              j++;

              //Create the parent and add the children
              table.push(<tr className="table">{children}</tr>);
            }
          }
          return table;
        };

        gruposContent = (
          <div>
            <h2>Grupo {numGrupo} de la ronda en juego</h2>

            <table>
              <thead>
                <tr>
                  <th className="text-center">Pareja 1 </th>
                  <th className="text-center">Resultado </th>
                  <th className="text-center">Pareja 2 </th>
                </tr>
              </thead>
              <tbody>{createTable()}</tbody>
            </table>
          </div>
        );

        return (
          <div className="info-torneo">
            <div className="container">{gruposContent}</div>
          </div>
        );
      }
    }
  }
}
Grupo.propTypes = {
  torneosActivosAdmin: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match
});

export default connect(mapStateToProps, { miRondaInfo })(withRouter(Grupo));
