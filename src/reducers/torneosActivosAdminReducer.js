import { GET_CURRENT_ADMIN_TOURNAMENTS, TOURNAMENTS_ADMIN_LOADING } from '../actions/types';

const initialState = {
    torneosAdmin: null,
    loading: false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case TOURNAMENTS_ADMIN_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_CURRENT_ADMIN_TOURNAMENTS:
            return {
                ...state,
                torneosAdmin: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

