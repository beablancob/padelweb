import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import {
  registrarAdminTorneo,
  seleccionTorneoAdmin
} from "../../actions/apuntarseTorneoAction";
import "../../assets/Style.css";
import Spinner from "../common/Spinner";

class RegistrarPareja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser2: "",
      emailUser1: "",
      errors: {}
    };
    // this.props.RegistrarPareja.loading = true;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("-------------------x------------------- RegistrarPareja");

    console.log("DID MOUNT", this.props.match);

    this.props.seleccionTorneoAdmin(id);
    console.log("DIDDDDDD", id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { torneoAdminSelected } = this.props.apuntarseTorneo;
    const torneoId = torneoAdminSelected.tournament.id;
    const email = {
      emailUser1: this.state.emailUser1,
      emailUser2: this.state.emailUser2
    };
    console.log("parámetros:", email, torneoId);

    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    //console.log("El registerCode del torneo es: ", registerCodeData);
    this.props.registrarAdminTorneo(torneoId, email, this.props.history);
  }
  render() {
    const { torneoAdminSelected, loadingAdmin } = this.props.apuntarseTorneo;
    const { error } = this.state.errors;
    console.log("---------", error);
    let torneo = torneoAdminSelected;

    let apuntarseContent;
    if (loadingAdmin) {
      console.log("loading");
      apuntarseContent = <Spinner />;
    } else {
      apuntarseContent = (
        <div>
          <h1 className="display-4 text-center">
            Apúntate a {torneo.tournament.name}
          </h1>
          <p className="lead text-center">
            Rellena el email de las parejas, recuerda que tienen que estar
            registrados en la plataforma.
          </p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextFieldGroup
              placeholder="Nombre del jugador 1"
              name="emailUser1"
              value={this.state.emailUser1}
              onChange={this.onChange}
              info="pareja1@ejemplo.com"
            />
            <TextFieldGroup
              placeholder="Nombre del jugador 2"
              name="emailUser2"
              value={this.state.emailUser2}
              onChange={this.onChange}
              info="pareja2@ejemplo.com"
            />
            <input
              type="submit"
              value="Enviar"
              className="btn btn-info btn-block mt-4 btn-verde"
            />
            <p className="errores">{error ? error.error.toString() : null}</p>
          </form>
        </div>
      );
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="col-md-8 m-auto">{apuntarseContent}</div>
        </div>
      </div>
    );
  }
}

RegistrarPareja.propTypes = {
  registrarAdminTorneo: PropTypes.func.isRequired,
  seleccionTorneoAdmin: PropTypes.func.isRequired,
  apuntarseTorneo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.object
};
const mapStateToProps = state => ({
  apuntarseTorneo: state.apuntarseTorneo,
  match: state.match,
  errors: state.errors
});
export default connect(mapStateToProps, {
  registrarAdminTorneo,
  seleccionTorneoAdmin
})(withRouter(RegistrarPareja));
