import axios from 'axios';
import { GET_CURRENT_ADMIN_TOURNAMENTS, TOURNAMENTS_ADMIN_LOADING } from '../actions/types';

// Get current profile 
// TODO:  mirar la direcction donde se guarden los torneos activos del backend
export const getCurrentAdminTournaments = () => dispatch => {
    dispatch(setTournamentsLoading());

    axios.get('/admin/tournaments')
        .then(res =>
            dispatch({
                type: GET_CURRENT_TOURNAMENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CURRENT_TOURNAMENTS,
                payload: {}

            })
        );
};
// Profile loading
export const setTournamentsLoading = () => {
    return {
        type: TOURNAMENTS_LOADING
    };
};
