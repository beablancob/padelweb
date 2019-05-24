import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentAdminTournaments } from '../../actions/torneosActivosAdminActions';
import Spinner from '../common/Spinner';

class TorneosActivosUser extends Component {

    componentDidMount() {
        this.props.getCurrentAdminTournaments();
    };
    render() {
        const { user } = this.props.auth;
        const { torneosAdmin, loading } = this.props.torneosAdmin;

        let torneosContent;

        if (loading) {
            torneosContent = <Spinner />;
        } else {


            if (torneosAdmin === null) {
                // User is logged 
                torneosContent = (
                    < div >
                        <p className="lead text-muted">Bienvenido {user.name} </ p>
                        <p>Todavía no has organizado ningún torneo. ¡Anímate a ello!</p>

                    </div>
                )

            } else {
                torneosContent = (
                    <div>
                        <table>
                            <tr>
                                <th>Nombre</th>
                                <th>Lugar</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>{torneosAdmin.nombre}</td>
                                <td>{torneosAdmin.place}</td>
                                <td>{torneosAdmin.state}</td>
                            </tr>
                        </table>

                    </div>
                )
            }


        }
        return (
            <div className="dashboard" >
                <div className="container">
                    <div className="row">
                        <div className="col md-12">
                            <h1 className="display-4">Torneos</h1>
                            {torneosContent}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
TorneosActivosUser.propTypes = {
    getCurrentAdminTournaments: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    torneosAdmin: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    torneosAdmin: state.torneosAdmin,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentAdminTournaments })(TorneosActivosUser);