import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getAdminTournament } from "../../actions/torneosActivosAdminActions";

class VerParejasAdmin extends Component {
  //No funciona, en clasificación tb lo tengo q arreglar
  // componentDidMount() {
  //   this.props.infoTorneoComenzadoParticipo();
  // }
  render() {
    const {
      torneoAdmin,
      loading2,
      miRondaInformacion
    } = this.props.torneosActivosAdmin;

    console.log(">>>>>>>>>>>>>>", torneoAdmin);
    let parejasContent;
    console.log("LOADING PAREJAS", loading2);

    if (loading2) {
      console.log("kjsdhfiusalfhgsuiflfghsjdhfjash", loading2);
      parejasContent = <Spinner />;
    } else {
      console.log(
        "**********************Estoy en parejas, info del torneo ",
        torneoAdmin
      );
      console.log(torneoAdmin.tournament.couples);

      let table = [];
      let j = 0;
      let createTable = () => {
        for (var i = 0; i < torneoAdmin.tournament.couples.length; i++) {
          let children = [];
          console.log("i: ", i);
          console.log(torneoAdmin.tournament.couples.length);
          console.log(
            "user1name",
            i,
            torneoAdmin.tournament.couples[i].user1Name
          );
          console.log(
            "user2name",
            i,
            torneoAdmin.tournament.couples[i].user2Name
          );

          children.push(
            <td key={j} className="text-left">
              {torneoAdmin.tournament.couples[i].user1Name}{" "}
              {torneoAdmin.tournament.couples[i].user1LastName}
            </td>
          );
          j++;
          children.push(
            <td key={j} className="text-left">
              {torneoAdmin.tournament.couples[i].user2Name}{" "}
              {torneoAdmin.tournament.couples[i].user2LastName}
            </td>
          );
          let idPareja = torneoAdmin.tournament.couples[i].id;
          let id = torneoAdmin.tournament.id;
          j++;
          // Añadir a APP
          let myLink =
            "/torneos-activos-admin/" +
            id +
            "/ver-parejas/" +
            idPareja +
            "/editar-pareja";
          children.push(
            <td key={k} className="grupos">
              <Link className="link-button" to={myLink}>
                Editar
              </Link>
            </td>
          );

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
                <th className="text-center">Jugador 1 </th>
                <th className="text-center">Jugador 2 </th>
                <th className="text-center">Editar pareja </th>
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
VerParejasAdmin.propTypes = {
  torneosActivosAdmin: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getAdminTournament: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match
});

export default connect(mapStateToProps, { getAdminTournament })(
  withRouter(VerParejasAdmin)
);
