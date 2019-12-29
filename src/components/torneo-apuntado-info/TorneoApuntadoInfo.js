import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  infoTorneoComenzadoParticipo,
  miRondaInfo
} from "../../actions/torneoInfoAction";
import "../../assets/Style.css";
import Parejas from "../parejas/Parejas";
import Clasificacion from "../clasificacion/Clasificacion";
import Torneosbaruser from "../layout/Torneosbaruser";
import PrivateRoute from "../common/PrivateRoute";
import { Switch } from "react-router-dom";
import Spinner from "../common/Spinner";
import GrupoActual from "../grupo-actual/GrupoActual";
import ResultadoPartido from "../resultado-partido/ResultadoPartido";
import ClasificacionGeneral from "../clasificacion-general/ClasificacionGeneral";
import ConfirmacionResultado from "../confirmacion-resultado/ConfirmacionResultado";

class TorneoApuntadoInfo extends Component {
  componentDidMount() {
    console.log("DIDDDD**********", this.props.match.params);
    const { id } = this.props.match.params;
    this.props.infoTorneoComenzadoParticipo(id);
  }

  render() {
    const {
      torneoInformacion,
      loadingTorneo,
      miRondaInformacion
    } = this.props.torneoInfo;
    console.log("HOLAAA", torneoInformacion, miRondaInformacion);

    let infoContent;
    if (loadingTorneo) {
      infoContent = <Spinner />;
    } else {
      infoContent = (
        <div>
          <h1 className="display-4 text-center">
            Torneo {torneoInformacion.tournament.name}
          </h1>

          <Torneosbaruser />
          <Switch>
            <PrivateRoute
              path="/torneo-apuntado-info/:id/parejas/"
              component={Parejas}
            />
            <PrivateRoute
              path="/torneo-apuntado-info/:id/clasificacion/"
              component={Clasificacion}
            />
            <PrivateRoute
              exact
              path="/torneo-apuntado-info/:id/grupo-actual/:partidoId/subir-resultado"
              component={ResultadoPartido}
            />
            <PrivateRoute
              exact
              path="/torneo-apuntado-info/:id/grupo-actual/"
              component={GrupoActual}
            />
            <PrivateRoute
              exact
              path="/torneo-apuntado-info/:id/clasificacion-general/"
              component={ClasificacionGeneral}
            />

            <PrivateRoute
              exact
              path="/torneo-apuntado-info/:id/grupo-actual/:partidoId/confirmacion-resultado"
              component={ConfirmacionResultado}
            />
            {/* let myLink = "/torneo-apuntado-info/" + torneo.id + "/grupo-actual/"
            + partidos[i].id + "/subir-resultado"; */}
          </Switch>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="col-md-10 m-auto">{infoContent}</div>
        </div>
      </div>
    );
  }
}

TorneoApuntadoInfo.propTypes = {
  infoTorneoComenzadoParticipo: PropTypes.func.isRequired,
  torneoInfo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  match: state.match
});
export default connect(mapStateToProps, {
  infoTorneoComenzadoParticipo,
  miRondaInfo
})(withRouter(TorneoApuntadoInfo));
