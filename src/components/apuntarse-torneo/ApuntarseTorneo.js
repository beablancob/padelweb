import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { registrarseTorneo } from "../../actions/apuntarseTorneoAction";
import "../../assets/Style.css";

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
    const { torneoSelected } = this.props.apuntarseTorneo;
    const { error } = this.state;
    let torneo = torneoSelected;
    console.log("El torneo seleccionado es:", torneo);

    let registerCodeData = torneo.registerCode;
    console.log("Register", registerCodeData);
    this.state.registerCodeData = registerCodeData;
    //this.setState({ registerCodeData: registerCodeData });

    return (
      <div className="apuntarse-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Apúntate a {torneo.name}</h1>
            <p className="lead text-center">
              Rellena el email de tu pareja, recuerda que tiene que estar
              registrado.
            </p>
            <form onSubmit={this.onSubmit.bind(this)}>
              <TextFieldGroup
                placeholder="Nombre de tu pareja"
                name="emailUser2"
                value={this.state.emailUser2}
                onChange={this.onChange}
                error={error}
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
          </div>
        </div>
      </div>
    );
  }
}

ApuntarseTorneo.propTypes = {
  registrarseTorneo: PropTypes.func.isRequired,
  apuntarseTorneo: PropTypes.object.isRequired,
  error: PropTypes.object
};
const mapStateToProps = state => ({
  apuntarseTorneo: state.apuntarseTorneo,
  error: state.error
});
export default connect(
  mapStateToProps,
  { registrarseTorneo }
)(withRouter(ApuntarseTorneo));
