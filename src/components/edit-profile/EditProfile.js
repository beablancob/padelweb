import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import TextFieldGroup from "../common/TextFieldGroup";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password1: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getCurrentProfile(user.id);

    // Set component fields state
    this.setState({
      name: user.name,
      lastname: user.lastname,
      password: user.password1
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // if (nextProps.profile.profile) {
    //   const profile = nextProps.profile.profile;
    //   profile.name = !isEmpty(profile.name) ? profile.name : "";
    //   profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : "";
    //   profile.password1 = !isEmpty(profile.password1) ? profile.password1 : "";

    //   // Set component fields state
    //   this.setState({
    //     name: profile.name,
    //     lastname: profile.lastname,
    //     password: profile.password1
    //   });
    // }
  }
  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteAccount();
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    };
    console.log(user);
    console.log("Errores: ", this.state.errors);
    this.props.registerUser(user);
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
    //console.log("hola usuario:", profile);
    let editProfileContent;
    if (loading) {
      editProfileContent = <Spinner />;
    } else {
      editProfileContent = (
        <form noValidate onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder={this.state.name}
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="Apellido"
            name="apellidos"
            value={this.state.lastname}
            onChange={this.onChange}
            error={errors.lastname}
          />

          <TextFieldGroup
            placeholder={this.state.email}
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          <TextFieldGroup
            placeholder="Password"
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
      );
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edita tu perfil</h1>
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
  registerUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,

  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.auth,

  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser, getCurrentProfile, deleteAccount }
)(withRouter(EditProfile));
