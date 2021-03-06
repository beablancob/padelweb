import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getRoundsTournament,
  getAdminTournament
} from "../../actions/torneosActivosAdminActions";
import "../../assets/Style.css";

import PrivateRoute from "../common/PrivateRoute";
import { Switch } from "react-router-dom";
import Spinner from "../common/Spinner";
import Grupo from "../grupo/Grupo";

import Grupos from "../grupos/Grupos";
import AdminBar from "../layout/AdminBar";
import ClasifGeneralAdmin from "../clasif-general/ClasifGeneralAdmin";

class VerTorneo extends Component {
  componentDidMount() {
    console.log("DIDDDD**********", this.props.match.params);
    const { id } = this.props.match.params;
    // this.props.getRoundsTournament(id);
    this.props.getAdminTournament(id);
  }

  render() {
    const { loading2, torneoAdmin } = this.props.torneosActivosAdmin;
    // const { loading2, torneoAdmin } = this.props.torneosActivosAdmin;
    console.log("HOLAAA", torneoAdmin);

    let infoContent;

    if (loading2) {
      console.log("load2");

      infoContent = <Spinner />;
    } else {
      console.log("no load");

      infoContent = (
        <div>
          <h1 className="display-4 text-center">
            Torneo {torneoAdmin.tournament.name}
          </h1>

          <AdminBar />

          <Switch>
            <PrivateRoute
              exact
              path="/ver-torneo/:id/clasif-general/"
              component={ClasifGeneralAdmin}
            />
            <PrivateRoute
              exact
              path="/ver-torneo/:id/grupos"
              component={Grupos}
            />
            <PrivateRoute
              exact
              path="/ver-torneo/:id/grupos/:numGrupo/clasificacion"
              component={Grupo}
            />
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
// PrivateRoute path={torneoIdPath} component={Parejas} />

VerTorneo.propTypes = {
  getRoundsTournament: PropTypes.func.isRequired,
  torneosActivosAdmin: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getAdminTournament: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match
});
export default connect(mapStateToProps, {
  getRoundsTournament,
  getAdminTournament
})(withRouter(VerTorneo));
