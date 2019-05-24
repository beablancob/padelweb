import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/Style.css';
import { Link } from 'react-router-dom';

class Sidebar extends Component {


    render() {
        const { admin } = this.props.profile;
        const { isAuthenticated, user } = this.props.auth;

        const loggedIn = (

            <div className="sidenav">
                <ul className="list-unstyled components">
                    <li className="nav-item">
                        <Link className="nav-link" to="/torneos-act-u">Torneos activos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/edit-profile">Ajustes de perfil</Link>
                    </li>
                </ul>
            </div>

        );

        const asUser = (
            <div className="sidenav">
                <ul className="list-unstyled components">
                    <li className="nav-item">
                        <Link className="nav-link" to="/torneos-act-u">Torneos activos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/edit-profile">Ajustes de perfil</Link>
                    </li>
                </ul>
            </div>
        )

        const asAdmin = (
            <div className="sidenav">
                <ul className="list-unstyled components">
                    <li className="nav-item">
                        <Link className="nav-link" to="/torneos-activos-admin">Torneos activos organizados por mi</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/org-torn">Organizar un torneo</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/edit-profile">Ajustes de perfil</Link>
                    </li>
                </ul>
            </div>
        )
        let us = null;
        if (isAuthenticated) {
            if (admin) {
                us = asAdmin;
            } else {
                us = asUser;
            }
        }
        return (
            <div>
                {us}
            </div>
        )
    }
}
Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps)(Sidebar);

