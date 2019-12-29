import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyCurrentTournaments } from "../../actions/torneosActivosUserActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class MisTorneos extends Component {
  componentDidMount() {
    this.props.getMyCurrentTournaments();
  }
  render() {
    const { user } = this.props.auth;
    const { myTorneos, myLoading } = this.props.torneosActivosUser;
    let createTable;
    let torneosContent;
    if (myLoading) {
      torneosContent = <Spinner />;
    } else {
      if (myTorneos.msg === "No pertenece a ningún torneo") {
        torneosContent = (
          <div>
            <p className="lead text-muted">Bienvenido/a {user.name} </p>
            <p>
              No te has apuntado a ningún torneo todavía, ¡anímate a ello en
              inicio!
            </p>
          </div>
        );
      } else {
        if (myTorneos.tournaments.length === 0) {
          console.log("Nombre del usuario:", user.name);
          torneosContent = (
            <div>
              <p>
                Todavía no te has apuntado a ningún torneo. ¡Anímate a ello!
              </p>
            </div>
          );
        } else {
          let listTorneos = myTorneos.tournaments;
          let table = [];
          var j = 0;
          var p = 0;
          // Creo la tabla con "mis torneos"
          createTable = () => {
            for (var i = 0; i < listTorneos.length; i++) {
              let children = [];
              for (var k = 0; k < listTorneos[i].couples.length; k++) {
                console.log(
                  "user.id:",
                  user.id,
                  "user1Id: ",
                  listTorneos[i].couples[k].user1Id,
                  "user2Id: ",
                  listTorneos[i].couples[k].user2Id
                );
                // Si pertenezco al torneo
                if (
                  listTorneos[i].couples[k].user1Id === user.id ||
                  listTorneos[i].couples[k].user2Id === user.id
                ) {
                  children.push(
                    <td key={j} className="text-center">
                      {listTorneos[i].name}
                    </td>
                  );
                  j++;
                  children.push(
                    <td key={j}>{listTorneos[i].numeroParejas}</td>
                  );

                  j++;
                  children.push(<td key={j}>{listTorneos[i].numeroRondas}</td>);
                  j++;
                  // Si el torneo todavía no ha comenzado
                  if (listTorneos[i].rondaActual === 0) {
                    let myLink =
                      "/torneo-nocomenzado-participo/" + listTorneos[i].id;
                    children.push(
                      <td key={j} className="no-comenzado">
                        Torneo no comenzado
                      </td>
                    );
                    j++;
                    children.push(
                      <td key={j}>
                        <Link
                          className="link-button t-nocomenzado-link"
                          to={myLink}
                        >
                          + info
                        </Link>
                      </td>
                    );

                    break;
                  } else {
                    let myLink2 =
                      "/torneo-apuntado-info/" + listTorneos[i].id + "/parejas";
                    children.push(
                      <td key={j} className="comenzado">
                        Comenzado
                      </td>
                    );
                    children.push(
                      <td key={j}>
                        <Link className="t-comenzado-link" to={myLink2}>
                          + info
                        </Link>
                      </td>
                    );
                    break;
                  }
                }
              }
              table.push(
                <tr key={i} className="text-center table">
                  {children}
                </tr>
              );
              console.log("valor de p: ", p);
            }
            return table;
          };
          torneosContent = (
            <div>
              <p className="lead text-muted">Bienvenido/a {user.name}</p>
              <p>
                Estos son los torneos públicos de este momento. Puedes animarte
                a organizar uno actuando en inicio.
              </p>
              <table>
                <thead>
                  <tr className="text-center">
                    <th>Nombre </th>
                    <th>Número de parejas </th>
                    <th>Número de rondas </th>
                    <th>Estado</th>
                    <th>Información</th>
                  </tr>
                </thead>
                <tbody>{createTable()}</tbody>
              </table>
            </div>
          );
        }
      }
    }
    return (
      <div className="dashboard">
        <div className="container-app">
          <div className="row">
            <div className="col md-12">
              <h1 className="display-4">Mis torneos</h1>
              {torneosContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MisTorneos.propTypes = {
  getMyCurrentTournaments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  torneosActivosUser: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosUser: state.torneosActivosUser,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getMyCurrentTournaments
})(withRouter(MisTorneos));
