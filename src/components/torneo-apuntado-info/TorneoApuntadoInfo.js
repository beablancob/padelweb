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
import { Router } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import { Switch } from "react-router-dom";
import Spinner from "../common/Spinner";
import Grupos from "../grupos/Grupos";
import Grupo from "../grupo/Grupo";
import ResultadoPartidoPareja from "../resultado-partido-pareja/ResultadoPartidoPareja";

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
            Torneo " {torneoInformacion.tournament.name} "
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
              path="/torneo-apuntado-info/grupos/"
              component={Grupos}
            />
            <PrivateRoute
              path="/torneo-apuntado-info/subir-resultado/"
              component={ResultadoPartidoPareja}
            />
            <PrivateRoute
              path="/torneo-apuntado-info/grupos/:idtorneo/:idgrupo/"
              component={Grupo}
            />
          </Switch>
        </div>
      );
    }

    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-10 m-auto">{infoContent}</div>
        </div>
      </div>
    );
  }
}
// PrivateRoute path={torneoIdPath} component={Parejas} />

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
