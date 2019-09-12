import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getCurrentUser } from "../../actions/authAction";
import { getCurrentTournaments } from "../../actions/torneosActivosUserActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";
import { seleccionTorneo } from "../../actions/apuntarseTorneoAction";
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';

class TorneosActivosUser extends Component {
  constructor() {
    super();
    this.state = {
      torneo: "",
      errors: {}
    };
    this.onSeleccionTorneoClick = this.onSeleccionTorneoClick.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentTournaments();
  }

  onSeleccionTorneoClick(torneoData) {
    this.props.seleccionTorneo(torneoData, this.props.history);
  }
  render() {
    const { user } = this.props.auth;
    const { torneos, loading } = this.props.torneosActivosUser;
    let createTable;
    // this.props.getCurrentUser(user.id);
    console.log("el id del usuario es:", user.id);
    let torneosContent;
    console.log("Se esta cargando la pagina", loading);
    //   console.log(torneos.length());
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
              No hay ningún torneo activo de momento, ¡anímate y organiza uno
              como administrador!
            </p>
          </div>
        );
      } else {
        if (torneos.tournaments.length === 0) {
          console.log("Nombre del usuario:", user.name);
          torneosContent = (
            <div>
              <p className="lead text-muted">Bienvenido {user.name}</p>
              <p>Todavía no has organizado ningún torneo. ¡Anímate a ello!</p>
            </div>
          );
        } else {

          console.log("Existen torneos publicos: ", torneos.tournaments.length);

          let listTorneos = torneos.tournaments;
          let table = [];
          var j = 0;
          createTable = () => {
            for (var i = 0; i < listTorneos.length; i++) {
            let children = [];
                children.push(
                  <td key={j} className="text-left">
                    {listTorneos[i].name}
                  </td>
                );
                j++;
                children.push(<td key={j}>{listTorneos[i].numeroParejas}</td>);
                j++;
                children.push(<td key={j}>{listTorneos[i].rondaActual}</td>);
                j++;
                children.push(<td key={j}>{listTorneos[i].numeroRondas}</td>);
                j++;
                if (listTorneos[i].rondaActual === 0) {
                  children.push(
                    <td key={j}>
                      <Button outline color="info"
                        onClick={this.onSeleccionTorneoClick.bind(
                          this,
                          listTorneos[i]
                        )}
                        className="btn"
                      >
                        Apúntate a este torneo
                      </Button>
                    </td>
                  );
                } else {
                  //TODO: Boton para ver cómo va el torneo publico
                  children.push(<td key={j}>El torneo está en juego</td>);
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
              <p>Estos son los torneos públicos de este momento. Puedes animarte a organizar uno actuando como admin.</p>
              <table>
                <thead>
                  <tr>
                    <th>Nombre </th>
                    <th>Número de parejas </th>
                    <th>Ronda actual </th>
                    <th>Número de rondas </th>
                    <th>Apúntate </th>
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
              <h1 className="display-4">Torneos públicos</h1>
              <p className="lead text-muted">Bienvenido {user.name}</p>
              {torneosContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TorneosActivosUser.propTypes = {
  seleccionTorneo: PropTypes.func.isRequired,
  getCurrentTournaments: PropTypes.func.isRequired,
  // getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  torneosActivosUser: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosUser: state.torneosActivosUser,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentTournaments, seleccionTorneo }
)(withRouter(TorneosActivosUser));
