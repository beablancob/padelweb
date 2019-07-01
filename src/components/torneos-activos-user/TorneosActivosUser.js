import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentTournaments } from '../../actions/torneosActivosUserActions';
import Spinner from '../common/Spinner';
import '../../assets/Style.css';


class TorneosActivosUser extends Component {
    componentDidMount() {
        this.props.getCurrentTournaments();
    }
    render() {
        const { user } = this.props.auth;
        const { torneos, loading } = this.props.torneosActivosUser;

        let torneosContent;
        console.log(loading);
        //   console.log(torneos.length());
        if (loading) {
            torneosContent = <Spinner />;
        } else {
            if (torneos === null) {
                console.log("Hola bea");
                // User is logged 
                torneosContent = (
                    < div >
                        <p className="lead text-muted">Bienvenido {user.name} </ p>
                        <p>No hay ningún torneo activo de momento, ¡anímate y organiza uno como administrador!</p>
                    </div>
                )

            } else {
                var listTorneos;
                console.log("Torneos: ", this.props.torneos)
                listTorneos = this.props.torneos.map((comp) =>
                    <li key={comp} id="tips-span">{comp}</li>
                );
                // User is logged 
                torneosContent = (
                    <div>
                        <table>
                            <tr>
                                <th>Nombre</th>
                                <th>Lugar</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>{listTorneos.nombre}</td>
                                <td>{listTorneos.place}</td>
                                <td>{listTorneos.state}</td>
                            </tr>
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
TorneosActivosUser.propTypes = {
    getCurrentTournaments: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    torneosActivosUser: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    torneosActivosUser: state.torneosActivosUser,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentTournaments })(TorneosActivosUser);