import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { infoTorneo } from "../../actions/torneoApuntadoInfoAction";
import "../../assets/Style.css";
import Parejas from "../parejas/Parejas";
import Torneosbaruser from "../layout/Torneosbaruser";
import { Router } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import { Switch } from "react-router-dom";

class TorneoApuntadoInfo extends Component {
  render() {
    const { torneoInfo } = this.props.torneoApuntadoInfo;
    //const { error } = this.state;

    console.log("El torneo seleccionado es:", torneoInfo);

    //this.setState({ registerCodeData: registerCodeData });

    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">
              Torneo {torneoInfo.tournament.name}
            </h1>

            <Torneosbaruser />
            <Switch>
              <PrivateRoute
                path="/torneo-apuntado-info/parejas"
                component={Parejas}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

TorneoApuntadoInfo.propTypes = {
  infoTorneo: PropTypes.func.isRequired,
  torneoApuntadoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoApuntadoInfo: state.torneoApuntadoInfo
});
export default connect(
  mapStateToProps,
  { infoTorneo }
)(TorneoApuntadoInfo);
