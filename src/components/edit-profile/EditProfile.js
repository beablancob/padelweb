//MIRAR COMO PONER EL TIPO DEL TELEFONO???????

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            apellidos: '',
            email: '',
            password1: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getCurrentProfile()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {

            const profile = nextProps.profile.profile;
            profile.name = !isEmpty(profile.name) ? profile.name : '';
            profile.apellidos = !isEmpty(profile.apellidos) ? profile.apellidos : '';
            profile.password1 = !isEmpty(profile.password1) ? profile.password1 : '';

            // Set component fields state
            this.setState({
                name: profile.name,
                surname: profile.apellidos,
                password: profile.password1
            });

        }
    }
    onDeleteClick(e) {
        e.preventDefault();
        this.props.deleteAccount();

    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            apellidos: this.state.apellidos,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        };
        console.log(userData);
        console.log("Errores: ", this.state.errors);
        this.props.registerUser(userData);
    }
    onChange(e) {
        this.setState(
            { [e.target.name]: e.target.value }
        );
    }

    render() {

        //npm i classnames para instalar isInvalid y toda la pesca

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
                                    value={this.state.apellidos}
                                    onChange={this.onChange}
                                    error={errors.surname}

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
                        </div>
                    </div>
                    <div style={{ marginBottom: '60px' }} ></div>
                    <div className="row">
                        <button style={{ marginLeft: '200px' }} onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Eliminar mi cuenta</button>
                    </div>

                </div>

            </div>
        )
    }
}
EditProfile.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser, getCurrentProfile, deleteAccount })(withRouter(EditProfile));