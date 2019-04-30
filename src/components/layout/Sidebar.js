import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/Style.css';

class Sidebar extends Component {

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const loggedIn = (

            <div class="sidenav">
                <a href="#torneos" className="torneos">Lista de torneos activos</a>
                <a href="#ajustes">Ajustes</a>
            </div>
        );
        return (
            <div>
                {isAuthenticated ? loggedIn : null}
            </div>
        )
    }
}
Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Sidebar);

