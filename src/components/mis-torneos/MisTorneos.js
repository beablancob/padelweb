import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getCurrentUser } from "../../actions/authAction";
import { getCurrentTournaments } from "../../actions/torneosActivosUserActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";
import {
  infoTorneoComenzadoParticipo,
  infoTorneoNoComenzadoParticipo,
  miRondaInfo
} from "../../actions/torneoInfoAction";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class MisTorneos extends Component {
  constructor() {
    super();
    this.state = {
      torneo: "",
      errors: {}
    };

    this.onTorneoComenzadoParticipoClick = this.onTorneoComenzadoParticipoClick.bind(
      this
    );
    this.onTorneoNoComenzadoParticipoClick = this.onTorneoNoComenzadoParticipoClick.bind(
      this
    );
  }
  componentDidMount() {
    this.props.getCurrentTournaments();
  }

  onTorneoComenzadoParticipoClick(torneoData) {
    this.props.infoTorneoComenzadoParticipo(torneoData);

    this.props.miRondaInfo(torneoData, this.props.history);
  }
  onTorneoNoComenzadoParticipoClick(torneoData) {
    this.props.infoTorneoNoComenzadoParticipo(torneoData, this.props.history);
  }

  render() {
    const { user } = this.props.auth;
    const { torneos, loading } = this.props.torneosActivosUser;
    let createTable;
    let torneosContent;
    console.log("Se esta cargando la pagina", loading);
    if (loading) {
      torneosContent = <Spinner />;
    } else {
      console.log("CACACA", torneos);
      if (torneos === null) {
        console.log("Hola bea");
        console.log("Nombre del usuario:", user);

        // User is logged
        torneosContent = (
          <div>
            <p className="lead text-muted">Bienvenido/a {user.name} </p>
            <p>
              No te has apuntado a ningún torneo todavía, ¡anímate y apúntate a
              uno u organiza uno como administrador!
            </p>
          </div>
        );
      } else {
        if (torneos.tournaments.length === 0) {
          console.log("Nombre del usuario:", user.name);

          torneosContent = (
            <div>
              <p className="lead text-muted">Bienvenido {user.name}</p>
              <p>
                Todavía no te has apuntado a ningún torneo. ¡Anímate a ello!
              </p>
            </div>
          );
        } else {
          console.log(
            "Las parejas del torneo 0 son:",
            torneos.tournaments[0].couples
          );
          let listTorneos = torneos.tournaments;
          let table = [];
          var j = 0;
          var p = 0;
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

                if (
                  listTorneos[i].couples[k].user1Id === user.id ||
                  listTorneos[i].couples[k].user2Id === user.id
                ) {
                  if (listTorneos[i].rondaActual === 0) {
                    children.push(
                      <td key={j} className="text-left">
                        {listTorneos[i].name}
                      </td>
                    );
                    j++;
                    children.push(
                      <td key={j}>{listTorneos[i].numeroParejas}</td>
                    );
                    // j++;
                    // children.push(<td key={j}>{listTorneos[i].rondaActual}</td>);
                    j++;
                    children.push(
                      <td key={j}>{listTorneos[i].numeroRondas}</td>
                    );
                    j++;
                    children.push(
                      <td key={j}>
                        <Button
                          outline
                          color="info"
                          onClick={this.onTorneoNoComenzadoParticipoClick.bind(
                            this,
                            listTorneos[i]
                          )}
                          className="btn"
                        >
                          No comenzado
                        </Button>
                      </td>
                    );
                    break;
                  } else {
                    children.push(
                      <td key={j} className="text-left">
                        {listTorneos[i].name}
                      </td>
                    );
                    j++;
                    children.push(
                      <td key={j}>{listTorneos[i].numeroParejas}</td>
                    );
                    // j++;
                    // children.push(<td key={j}>{listTorneos[i].rondaActual}</td>);
                    j++;
                    children.push(
                      <td key={j}>{listTorneos[i].numeroRondas}</td>
                    );
                    j++;
                    let myLink = "/torneo-apuntado-info/id=" + listTorneos[i];
                    children.push(
                      <td key={j}>
                        <Link className="t-comenzado-link" to={myLink}>
                          Comenzado
                        </Link>
                        <Button
                          outline
                          color="warning"
                          onClick={this.onTorneoComenzadoParticipoClick.bind(
                            this,
                            listTorneos[i]
                          )}
                          className="btn"
                        >
                          Comenzado
                        </Button>
                      </td>
                    );
                    break;
                  }
                }
              }
              table.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );
              console.log("valor de p: ", p);
            }

            return table;
          };

          torneosContent = (
            <div>
              <p>
                Estos son los torneos públicos de este momento. Puedes animarte
                a organizar uno actuando como admin.
              </p>
              <table>
                <thead>
                  <tr className="text-center">
                    <th>Nombre </th>
                    <th>Número de parejas </th>
                    <th>Número de rondas </th>
                    <th>Informacion </th>
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
              <p className="lead text-muted">Bienvenido/a {user.name}</p>
              {torneosContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MisTorneos.propTypes = {
  getCurrentTournaments: PropTypes.func.isRequired,
  infoTorneoNoComenzadoParticipo: PropTypes.func.isRequired,
  infoTorneoComenzadoParticipo: PropTypes.func.isRequired,
  miRondaInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  torneosActivosUser: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosUser: state.torneosActivosUser,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCurrentTournaments,
    infoTorneoComenzadoParticipo,
    infoTorneoNoComenzadoParticipo,
    miRondaInfo
  }
)(withRouter(MisTorneos));
