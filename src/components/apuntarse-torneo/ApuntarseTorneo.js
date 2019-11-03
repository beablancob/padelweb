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
      error: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   console.log("DIDDDDDD", id);

  //   this.props.seleccionTorneo(id);
  // }
  componentWillMount() {
    const { id } = this.props.match.params;
    console.log("WILLLLLLLLLLL", id);

    this.props.seleccionTorneo(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
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
    console.log("parámetros:", infoRegistro);

    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    //console.log("El registerCode del torneo es: ", registerCodeData);
    this.props.registrarseTorneo(infoRegistro, email, this.props.history);
  }
  render() {
    const { torneoSelected, loading } = this.props.apuntarseTorneo;
    const { error } = this.state;
    let torneo = torneoSelected;

    let apuntarseContent;
    if (loading) {
      console.log("loading");
      apuntarseContent = <Spinner />;
    } else {
      console.log("El torneo seleccionado es:", torneo);
      let registerCodeData = torneo.tournament.registerCode;
      console.log("Register", registerCodeData);
      this.state.registerCodeData = registerCodeData;
      apuntarseContent = (
        <form onSubmit={this.onSubmit.bind(this)}>
          <TextFieldGroup
            placeholder="Nombre de tu pareja"
            name="emailUser2"
            value={this.state.emailUser2}
            onChange={this.onChange}
            error={error}
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
        </form>
      );
    }
    return (
      <div className="apuntarse-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">
              Apúntate a {torneo.tournament.name}
            </h1>
            <p className="lead text-center">
              Rellena el email de tu pareja, recuerda que tiene que estar
              registrado en la plataforma.
            </p>
            {apuntarseContent}
          </div>
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
  error: PropTypes.object
};
const mapStateToProps = state => ({
  apuntarseTorneo: state.apuntarseTorneo,
  match: state.match,
  error: state.error
});
export default connect(
  mapStateToProps,
  { registrarseTorneo, seleccionTorneo }
)(withRouter(ApuntarseTorneo));
