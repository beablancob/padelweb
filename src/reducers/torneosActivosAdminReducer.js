import {
  GET_CURRENT_ADMIN_TOURNAMENTS,
  TOURNAMENTS_ADMIN_LOADING,
  GET_CURRENT_ADMIN_TOURNAMENT,
  TOURNAMENT_ADMIN_LOADING
} from "../actions/types";

const initialState = {
  torneosAdmin: null,
  loading: true,
  loading2: true,

  torneoAdmin: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case TOURNAMENT_ADMIN_LOADING:
      return {
        ...state,
        loading2: true
      };

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
        loading2: false
      };

    default:
      return state;
  }
}
