import {
  GET_CURRENT_ADMIN_TOURNAMENTS,
  TOURNAMENTS_ADMIN_LOADING,
  GET_CURRENT_ADMIN_TOURNAMENT
} from "../actions/types";

const initialState = {
  torneosAdmin: null,
  loading: false,
  torneoAdmin: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case TOURNAMENTS_ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_ADMIN_TOURNAMENTS:
      return {
        ...state,
        torneosAdmin: action.payload,
        loading: false
      };
    case GET_CURRENT_ADMIN_TOURNAMENT:
      return {
        ...state,
        torneoAdmin: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
