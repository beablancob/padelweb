import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentTournaments } from '../../actions/torneosActivosUserActions';
import Spinner from '../common/Spinner';

class TorneosActivosUser extends Component {
    componentDidMount() {
        this.props.getCurrentTournaments();
    }
    render() {
        const { user } = this.props.auth;
        const { torneos, loading } = this.props.torneos;

        let torneosContent;

        if (torneos === null || loading) {
            torneosContent = <Spinner />;
        } else {

            // User is logged 
            torneosContent = (
                < div >
                    <p className="lead text-muted">Welcome {user.name} </ p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            )

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
    getCurrentTournaments: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    torneos: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    torneos: state.torneos,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentTournaments })(TorneosActivosUser);