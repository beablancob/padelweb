import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, IS_ADMIN, IS_NOT_ADMIN } from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    admin: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false

            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case IS_ADMIN:
            return {
                ...state,
                admin: true
            }
        case IS_NOT_ADMIN:
            return {
                ...state,
                admin: false
            }
        default:
            return state;
    }
}

