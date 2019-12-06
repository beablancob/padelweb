import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { registrarseTorneoPriv } from "../../actions/apuntarseTorneoAction";
import "../../assets/Style.css";

class ApuntarsePriv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser2: null,
      registerCodeData: null,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      registerCodeData: this.state.registerCodeData,
      emailUser2: this.state.emailUser2
    };

    console.log("Info registro", infoRegistro);
    const { error } = this.state.errors;
    console.log("errores", error);

    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    //console.log("El registerCode del torneo es: ", registerCodeData);
    this.props.registrarseTorneoPriv(infoRegistro, this.props.history);
  }
  render() {
    const { error } = this.state.errors;
    console.log("errores", error);
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Apúntate a un torneo privado
              </h1>
              <p className="lead text-center">
                Rellena el email de tu pareja y el código de registro
                correspondiente. Recuerda que tu pareja tiene que estar
                registrada en la plataforma.
              </p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="Email de tu pareja"
                  name="emailUser2"
                  value={this.state.emailUser2}
                  onChange={this.onChange}
                  info="tupareja@ejemplo.com"
                />
                <TextFieldGroup
                  placeholder="Código de registro"
                  name="registerCodeData"
                  onChange={this.onChange}
                  value={this.state.registerCodeData}
                  onChange={this.onChange}
                  info="12codigo23de245registro"
                />
                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-block mt-4 btn-verde"
                />
                <p className="errores">
                  {error ? error.error.toString() : null}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApuntarsePriv.propTypes = {
  registrarseTorneo: PropTypes.func.isRequired,
  errors: PropTypes.object
};
const mapStateToProps = state => ({
  apuntarseTorneo: state.apuntarseTorneo,
  errors: state.errors
});
export default connect(mapStateToProps, { registrarseTorneoPriv })(
  withRouter(ApuntarsePriv)
);
