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

class TorneoApuntadoInfo extends Component {
  render() {
    const { torneoInformacion } = this.props.torneoInfo;
    //const { error } = this.state;

    console.log("El torneo seleccionado es:", torneoInformacion);

    //this.setState({ registerCodeData: registerCodeData });

    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">
              Torneo {torneoInformacion.tournament.name}
            </h1>

            <Torneosbaruser />
            <Switch>
              <PrivateRoute
                path="/torneo-apuntado-info/parejas"
                component={Parejas}
              />
              <PrivateRoute
                path="/torneo-apuntado-info/clasificacion"
                component={Clasificacion}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

TorneoApuntadoInfo.propTypes = {
  infoTorneoComenzadoParticipo: PropTypes.func.isRequired,
  torneoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo
});
export default connect(
  mapStateToProps,
  { infoTorneoComenzadoParticipo }
)(TorneoApuntadoInfo);
