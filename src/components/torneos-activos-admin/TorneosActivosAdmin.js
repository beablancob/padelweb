// Hacer link a torneo comenzado

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentAdminTournaments,
  selectEditarTorneo
} from "../../actions/torneosActivosAdminActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class TorneosActivosAdmin extends Component {
  constructor() {
    super();
    this.state = {
      torneo: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentAdminTournaments();
  }

  render() {
    const { user } = this.props.auth;
    const { torneosAdmin, loading } = this.props.torneosActivosAdmin;
    let createTable;

    let torneosContent;
    if (loading) {
      torneosContent = <Spinner />;
    } else {
      console.log(torneosAdmin, "CACA");

      if (torneosAdmin === null) {
        console.log("El admin no tiene torneos activos");
        torneosContent = (
          <div>
            <p className="lead text-muted">Bienvenido {user.name} </p>
            <p>Todavía no has organizado ningún torneo. ¡Anímate a ello!</p>
          </div>
        );
      } else {
        if (torneosAdmin.tournaments.length === 0) {
          torneosContent = (
            <div>
              <p className="lead text-muted">Bienvenido {user.name} </p>
              <p>Todavía no has organizado ningún torneo. ¡Anímate a ello!</p>
            </div>
          );
        } else {
          console.log(
            "El admin tiene algun torneo activo: ",
            torneosAdmin.tournaments.length
          );

          let listTorneos = torneosAdmin.tournaments;
          let table = [];
          var j = 0;
          var m = 100;

          console.log("El torneo 0, nombre", listTorneos[0].name);

          createTable = () => {
            for (var i = 0; i < listTorneos.length; i++) {
              let children = [];

              children.push(
                <td key={j} className="text-left">
                  {listTorneos[i].name}
                </td>
              );

              j++;
              children.push(<td key={j}>{listTorneos[i].registerCode}</td>);
              console.log("El torneo i, nombre", listTorneos[i].name);
              j++;

              if (listTorneos[i].rondaActual === 0) {
                let myLink = "/editar-torneo/" + listTorneos[i].id;
                children.push(
                  <td key={j}>
                    <Link className="link-button" to={myLink}>
                      Editar torneo
                    </Link>
                  </td>
                );
                j++;
                let myLink2 = "/registro-pareja/" + listTorneos[i].id;

                children.push(
                  <td key={j}>
                    <Link className="link-button" to={myLink2}>
                      Añadir pareja
                    </Link>
                  </td>
                );
                j++;
                // children.push(
                //   <td key={j}>
                //     <Button
                //       outline
                //       color="success"
                //       onClick={this.onEditarTorneoClick.bind(
                //         this,
                //         listTorneos[i]
                //       )}
                //       className="btn"
                //     >
                //       Editar torneo
                //     </Button>
                //   </td>
                // );
                j++;
              } else {
                console.log("listTorneosid", listTorneos[i].id);
                let myLink = "/ver-torneo/" + listTorneos[i].id;
                children.push(
                  <td key={j}>
                    <Link className="link-button" to={myLink}>
                      Info del torneo en juego
                    </Link>
                  </td>
                );
                j++;
                children.push(<td key={j}>Torneo comenzado</td>);
                j++;
              }

              //Create the parent and add the children
              table.push(
                <tr key={m} className="table">
                  {children}
                </tr>
              );
              m++;
            }
            return table;
          };

          torneosContent = (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Codigo de registro</th>
                    <th>Información</th>
                    <th>Registrar pareja</th>
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
              <h1 className="display-4">Torneos organizados por ti</h1>
              {torneosContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TorneosActivosAdmin.propTypes = {
  getCurrentAdminTournaments: PropTypes.func.isRequired,
  selectEditarTorneo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  torneosActivosAdmin: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentAdminTournaments,
  selectEditarTorneo
})(withRouter(TorneosActivosAdmin));
