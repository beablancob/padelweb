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
import { Button } from "reactstrap";

class TorneosActivosAdmin extends Component {
  constructor() {
    super();
    this.state = {
      torneo: "",
      errors: {}
    };
    this.onEditarTorneoClick = this.onEditarTorneoClick.bind(this);
    this.onTorneoEnJuegoClick = this.onTorneoEnJuegoClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentAdminTournaments();
  }
  onEditarTorneoClick(torneoId) {
    this.props.selectEditarTorneo(torneoId, this.props.history);
  }
  onTorneoEnJuegoClick(torneoId) {
    //this.props.seleccionTorneo(torneoId, this.props.history);
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
        // User is logged
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
                children.push(
                  <td key={j}>
                    <Button
                      outline
                      color="success"
                      onClick={this.onEditarTorneoClick.bind(
                        this,
                        listTorneos[i]
                      )}
                      className="btn"
                    >
                      Editar torneo
                    </Button>
                  </td>
                );
                j++;
              } else {
                children.push(
                  <td key={j}>
                    <Button
                      outline
                      color="info"
                      onClick={this.onTorneoEnJuegoClick.bind(
                        this,
                        listTorneos[i]
                      )}
                      className="btn"
                    >
                      Info del torneo en juego
                    </Button>
                  </td>
                );
                j++;
              }

              //Create the parent and add the children
              table.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );
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

export default connect(
  mapStateToProps,
  { getCurrentAdminTournaments, selectEditarTorneo }
)(TorneosActivosAdmin);
