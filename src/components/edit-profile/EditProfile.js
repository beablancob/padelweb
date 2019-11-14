import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import {
  getCurrentProfile,
  deleteAccount,
  editedUser
} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password1: "",
      password2: "",
      id: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { user } = this.props.auth;
    // Set component fields state
    this.setState({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password1: user.password1
    });
    console.log("hey", this.state.password1);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onDeleteClick(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    this.props.deleteAccount(user.id, this.props.history);
  }
  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const userId = { id: user.id };
    const editedUser = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    };
    console.log("datos q envio a actions", userId, editedUser);
    console.log("Errores: ", this.state.errors);
    this.props.editedUser(userId, editedUser);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //npm i classnames para instalar isInvalid y toda la pesca
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { errors } = this.state; //const errors = this.state.errors es lo mismo!!
    //Las clases form-control etc van a estar siempre. Las is-invalid solo existen cuando hay un error, en el array de errores del estado.
    //Errors.name

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edita tu perfil</h1>

              <form noValidate onSubmit={this.onSubmit}>
                <label>Nombre</label>
                <TextFieldGroup
                  placeholder={this.state.name}
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <label>Apellido</label>
                <TextFieldGroup
                  placeholder={this.state.lastname}
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                />
                <label>Correo electrónico</label>
                <TextFieldGroup
                  placeholder={this.state.email}
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <label>Nueva contraseña</label>
                <TextFieldGroup
                  placeholder={this.state.password1}
                  name="password1"
                  type="password"
                  value={this.state.password1}
                  onChange={this.onChange}
                  error={errors.password1}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
          <div style={{ marginBottom: "60px" }} />
          <div className="row">
            <button
              style={{ marginLeft: "200px" }}
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  editedUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,

  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.auth,

  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {
  editedUser,
  getCurrentProfile,
  deleteAccount
})(withRouter(EditProfile));
