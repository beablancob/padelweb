//MIRAR COMO PONER EL TIPO DEL TELEFONO???????

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState(
            { [e.target.name]: e.target.value }
        );
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
        console.log("Errores: ", this.state.errors);
        this.props.registerUser(newUser);
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
                            <h1 className="display-4 text-center">Regístrate</h1>
                            <p className="lead text-center">Crea tu propia cuenta</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Nombre"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}

                                />
                                <TextFieldGroup
                                    placeholder="Apellido"
                                    name="surname"
                                    value={this.state.surname}
                                    onChange={this.onChange}
                                    error={errors.surname}

                                />

                                <TextFieldGroup
                                    placeholder="Teléfono"
                                    name="phone"
                                    type="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    error={errors.phone}

                                />
                                <TextFieldGroup
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}

                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}

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
                </div>
            </div>
        )
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register));