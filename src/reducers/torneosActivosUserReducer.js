import { GET_CURRENT_TOURNAMENTS, TOURNAMENTS_LOADING } from '../actions/types';

const initialState = {
    torneos: null,
    loading: false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case TOURNAMENTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_CURRENT_TOURNAMENTS:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

