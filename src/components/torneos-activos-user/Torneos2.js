import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getCurrentUser } from "../../actions/authAction";
import { getCurrentTournaments } from "../../actions/torneosActivosUserActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";
import { seleccionTorneo } from "../../actions/apuntarseTorneoAction";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class TorneosPublicos extends Component {
  constructor() {
    super();
    this.state = {
      torneo: "",
      errors: {}
    };
    this.onTorneoApuntarseClick = this.onTorneoApuntarseClick.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentTournaments();
  }

  onTorneoApuntarseClick(torneoId) {
    this.props.seleccionTorneo(torneoId, this.props.history);
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
      console.log("torneos públicos", torneos);
      if (torneos === null) {
        // User is logged
        torneosContent = (
          <div>
            <p className="lead text-muted">Bienvenido/a {user.name} </p>
            <p>
              No hay ningún torneo activo de momento, ¡anímate y organiza uno
              como administrador!
            </p>
          </div>
        );
      } else {
        if (torneos.tournaments.length === 0) {
          torneosContent = (
            <div>
              <p className="lead text-muted">Bienvenido/a {user.name}</p>
              <p>
                No hay ningún torneo activo de momento, ¡anímate y organiza uno
                como administrador!
              </p>
            </div>
          );
        } else {
          let listTorneos = torneos.tournaments;
          let table = [];
          var j = 0;
          var p = 0;
          createTable = () => {
            for (var i = 0; i < listTorneos.length; i++) {
              let children = [];
              // 1. No existen parejas en el torneo público
              if (listTorneos[i].couples.length === 0) {
                console.log(
                  "<<<<< no existen parejas en el torneo ",
                  i,
                  " ",
                  listTorneos[i].name
                );
                children.push(
                  <td key={j} className="text-left">
                    {listTorneos[i].name}
                  </td>
                );
                j++;
                children.push(<td key={j}>{listTorneos[i].numeroParejas}</td>);
                j++;
                children.push(<td key={j}>{listTorneos[i].numeroRondas}</td>);
                j++;
                let myLink = "/apuntarse-torneo/" + listTorneos[i].id;
                children.push(
                  <td key={j} id="pepe">
                    <Link className="link-button" to={myLink}>
                      Apúntate a este torneo
                    </Link>
                  </td>
                );
              } else {
                for (var k = 0; k < listTorneos[i].couples.length; k++) {
                  if (
                    listTorneos[i].couples.length < listTorneos[i].numeroParejas
                  ) {
                    console.log("--------Análisis torneo", listTorneos[i].name);
                    console.log(
                      "user.id:",
                      user.id,
                      "user1Id: ",
                      listTorneos[i].couples[k].user1Id,
                      "user2Id: ",
                      listTorneos[i].couples[k].user2Id
                    );

                    if (
                      listTorneos[i].couples[k].user1Id !== user.id &&
                      listTorneos[i].couples[k].user2Id !== user.id
                    ) {
                      console.log(
                        ">>>>>>>>>>el usuario no pertenece a este torneo"
                      );
                      p++;
                      console.log("valor de p", p);
                      console.log(
                        "couples.length",
                        listTorneos[i].couples.length
                      );

                      if (p === listTorneos[i].couples.length) {
                        p = 0;
                        if (listTorneos[i].rondaActual === 0) {
                          console.log(
                            "<<<<<<<<LA RONDA ACTUAL ES 0, ME PUEDO APUNTAR!!!!!!>>>>>>>>>>>>"
                          );
                          children.push(
                            <td key={j} className="text-left">
                              {listTorneos[i].name}
                            </td>
                          );
                          j++;
                          children.push(
                            <td key={j}>{listTorneos[i].numeroParejas}</td>
                          );

                          j++;
                          children.push(
                            <td key={j}>{listTorneos[i].numeroRondas}</td>
                          );
                          j++;
                          console.log(
                            "-------------------x------------------- torneos2"
                          );
                          let myLink = "/apuntarse-torneo/" + listTorneos[i].id;
                          children.push(
                            <td key={j}>
                              <Link className="link-button" to={myLink}>
                                Apúntate a este torneo
                              </Link>
                            </td>
                          );

                          break;
                        }
                      }
                    }
                  }
                }
                p = 0;
              }

              //Create the parent and add the children
              table.push(
                <tr key={i} className="table">
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
                    {/* <th>Ronda actual </th> */}
                    <th>Número de rondas </th>
                    <th>Apúntate </th>
                  </tr>
                </thead>
                <tbody className="pepe">{createTable()}</tbody>
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
              <h1 className="display-4">Torneos públicos</h1>
              <p className="lead text-muted">Bienvenido/a {user.name}</p>
              {torneosContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TorneosPublicos.propTypes = {
  seleccionTorneo: PropTypes.func.isRequired,
  getCurrentTournaments: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  torneosActivosUser: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosUser: state.torneosActivosUser,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentTournaments,
  seleccionTorneo
})(withRouter(TorneosPublicos));
