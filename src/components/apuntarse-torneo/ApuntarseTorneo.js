import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import {
  registrarseTorneo,
  seleccionTorneo
} from "../../actions/apuntarseTorneoAction";
import "../../assets/Style.css";
import Spinner from "../common/Spinner";

class ApuntarseTorneo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser2: "",
      registerCodeData: "",
      errors: {}
    };
    // this.props.apuntarseTorneo.loading = true;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.seleccionTorneo(id);
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

    const infoRegistro = {
      registerCodeData: this.state.registerCodeData
    };
    const email = {
      emailUser2: this.state.emailUser2
    };

    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    //console.log("El registerCode del torneo es: ", registerCodeData);
    this.props.registrarseTorneo(infoRegistro, email, this.props.history);
  }
  render() {
    const { torneoSelected, loading } = this.props.apuntarseTorneo;
    const { error } = this.state.errors;
    let torneo = torneoSelected;
    console.log("**********", error);

    let apuntarseContent;
    if (loading) {
      console.log("loading");
      apuntarseContent = <Spinner />;
    } else {
      let registerCodeData = torneo.tournament.registerCode;
      this.state.registerCodeData = registerCodeData;
      apuntarseContent = (
        <div>
          <h1 className="display-4 text-center">
            Apúntate a {torneo.tournament.name}
          </h1>
          <p className="lead text-center">
            Rellena el email de tu pareja, recuerda que tiene que estar
            registrado en la plataforma.
          </p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextFieldGroup
              placeholder="Nombre de tu pareja"
              name="emailUser2"
              value={this.state.emailUser2}
              onChange={this.onChange}
              info="tupareja@ejemplo.com"
            />
            <TextFieldGroup
              placeholder="RegisterCode"
              name="registerCodeData"
              onChange={this.onChange}
              value={this.state.registerCodeData}
              type="hidden"
            />
            <input
              type="submit"
              value="Enviar"
              className="btn btn-info btn-block mt-4"
            />
            <p className="errores">{error ? error.error.toString() : null}</p>
          </form>
        </div>
      );
    }
    return (
      <div className="apuntarse-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">{apuntarseContent}</div>
        </div>
      </div>
    );
  }
}

ApuntarseTorneo.propTypes = {
  registrarseTorneo: PropTypes.func.isRequired,
  seleccionTorneo: PropTypes.func.isRequired,
  apuntarseTorneo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  errors: PropTypes.object
};
const mapStateToProps = state => ({
  apuntarseTorneo: state.apuntarseTorneo,
  match: state.match,
  errors: state.errors
});
export default connect(mapStateToProps, { registrarseTorneo, seleccionTorneo })(
  withRouter(ApuntarseTorneo)
);
