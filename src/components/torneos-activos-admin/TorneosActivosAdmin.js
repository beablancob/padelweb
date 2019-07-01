import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentAdminTournaments } from '../../actions/torneosActivosAdminActions';
import Spinner from '../common/Spinner';
import '../../assets/Style.css';

class TorneosActivosAdmin extends Component {

    componentDidMount() {
        this.props.getCurrentAdminTournaments();
    };
    render() {
        const { user } = this.props.auth;
        const { torneosAdmin, loading } = this.props.torneosActivosAdmin;

        let torneosContent;

        if (loading) {
            torneosContent = <Spinner />;
        } else {
            console.log(torneosAdmin, "CACA");

            if (torneosAdmin === null) {
                console.log("El admin no tiene torneos activos")
                // User is logged 
                torneosContent = (
                    < div >
                        <p className="lead text-muted">Bienvenido {user.name} </ p>
                        <p>Todavía no has organizado ningún torneo. ¡Anímate a ello!</p>

                    </div>
                )

            } else {
                console.log("El admin tiene algun torneo activo", torneosAdmin.tournaments.length);
                var listTorneos;
                console.log("Torneos: ", torneosAdmin.tournaments)
                listTorneos = torneosAdmin.tournaments.map((comp) =>
                    <li key={comp} id="tips-span">{comp}</li>
                );
                torneosContent = (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Lugar</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{listTorneos.nombre}</td>
                                    <td>{listTorneos.place}</td>
                                    <td>{listTorneos.state}</td>
                                </tr>
                            </tbody>

                        </table>

                    </div>
                )
            }


        }
        return (
            <div className="dashboard" >
                <div className="container-app">
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
TorneosActivosAdmin.propTypes = {
    getCurrentAdminTournaments: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    torneosActivosAdmin: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    torneosActivosAdmin: state.torneosActivosAdmin,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentAdminTournaments })(TorneosActivosAdmin);