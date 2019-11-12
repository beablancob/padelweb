import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { infoTorneoComenzadoParticipo } from "../../actions/torneoInfoAction";
import "../../assets/Style.css";
import Parejas from "../parejas/Parejas";
import Clasificacion from "../clasificacion/Clasificacion";
import Torneosbaruser from "../layout/Torneosbaruser";
import { Router } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import { Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

class TorneoApuntadoInfo extends Component {
  componentDidMount() {
    console.log("DIDDDD**********", this.props.match.params);
    const { id } = this.props.match.params;
    this.props.infoTorneoComenzadoParticipo(id);
  }

  render() {
    const { torneoInformacion, loadingTorneo } = this.props.torneoInfo;

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
              path="/torneo-apuntado-info/parejas/"
              component={Parejas}
            />
            <PrivateRoute
              path="/torneo-apuntado-info/clasificacion/:id"
              component={Clasificacion}
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
  match: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  match: state.match
});
export default connect(mapStateToProps, { infoTorneoComenzadoParticipo })(
  withRouter(TorneoApuntadoInfo)
);
