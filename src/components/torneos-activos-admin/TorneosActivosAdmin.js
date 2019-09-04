import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentAdminTournaments } from "../../actions/torneosActivosAdminActions";
import Spinner from "../common/Spinner";
import "../../assets/Style.css";
import { Link } from "react-router-dom";

class TorneosActivosAdmin extends Component {
  componentDidMount() {
    this.props.getCurrentAdminTournaments();
  }
  render() {
    const { user } = this.props.auth;
    const { torneosAdmin, loading } = this.props.torneosActivosAdmin;

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

          var listTorneos;

          listTorneos = torneosAdmin.tournaments;

          // for (let i = 0; i < listTorneos.length - 1; i++) {
          //   torneosList2 = (

          //   )
          // }
          console.log("nombre del torneo i:", listTorneos.name);
          torneosContent = (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Número de parejas</th>
                    <th>Ronda actual</th>
                    <th>Número de rondas</th>
                    <th>Nº de parejas que suben de grupo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="text-left">{listTorneos[0].name}</td>
                    <td>{listTorneos[0].numeroParejas}</td>
                    <td>{listTorneos[0].rondaActual}</td>
                    <td>{listTorneos[0].numeroRondas}</td>
                    <td>{listTorneos[0].parejasSuben}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
          // }

          // var listTorneos;
          // var torneo;
          // listTorneos = torneosAdmin.tournaments.map(id => (
          //   <li key={id}>{id}</li>
          // ));
          // torneo = listTorneos.map(comp => <li key={comp}>{comp}</li>);
          // console.log("el nombre de un torneo es", torneo.name);
          // torneosContent = (
          //   <div>
          //     <table>
          //       <thead>
          //         <tr>
          //           <th>Nombre</th>
          //           <th>Ronda actual</th>
          //           <th>Número de rondas</th>
          //           <th>Número de parejas</th>
          //           <th>Nota</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         <tr>
          //           <td>{torneo.name}</td>
          //           <td>{torneo.rondaActual}</td>
          //           <td>{torneo.numeroRondas}</td>
          //           <td>{torneo.numeroParejas}</td>
          //           <td>Si la ronda actual es 0, estás a tiempo de apuntarte</td>
          //         </tr>
          //       </tbody>
          //     </table>
          //   </div>
          // );

          // ------------------
          // var listTorneos;
          // console.log("Torneos: ", torneosAdmin.tournaments);

          // listTorneos = torneosAdmin.tournaments.map(id => (
          //   <li key={id}>{id}</li>
          // ));
          // torneosContent = (
          //   <div>
          //     <table>
          //       <thead>
          //         <tr>
          //           <th>Nombre</th>
          //           <th>Ronda actual</th>
          //           <th>Número de rondas</th>
          //           <th>Número de parejas</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         <tr>
          //           <td>{listTorneos.nombre}</td>
          //           <td>{listTorneos.rondaActual}</td>
          //           <td>{listTorneos.numeroRondas}</td>
          //           <td>{listTorneos.numeroParejas}</td>
          //         </tr>
          //       </tbody>
          //     </table>
          //   </div>
          // );
        }
      }
    }
    return (
      <div className="dashboard">
        <div className="container-app">
          <div className="row">
            <div className="col md-12">
              <h1 className="display-4">Torneos</h1>
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
  auth: PropTypes.object.isRequired,
  torneosActivosAdmin: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentAdminTournaments }
)(TorneosActivosAdmin);
