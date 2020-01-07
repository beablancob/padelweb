import {
  GET_CURRENT_ADMIN_TOURNAMENTS,
  TOURNAMENTS_ADMIN_LOADING,
  GET_CURRENT_ADMIN_TOURNAMENT,
  TOURNAMENT_ADMIN_LOADING,
  ROUNDS_LOADING,
  GET_ADMIN_TOURNAMENT_ROUNDS,
  PAREJAS_TORNEO,
  PAREJAS_LOADING
} from "../actions/types";

const initialState = {
  torneosAdmin: null,
  loading: true,
  loading2: true,
  roundsLoading: true,
  rounds: null,
  torneoAdmin: null,
  parejas: null,
  loadingP: true
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ROUNDS_LOADING:
      return {
        ...state,
        roundsLoading: true
      };
    case TOURNAMENT_ADMIN_LOADING:
      return {
        ...state,
        loading2: true
      };
    case PAREJAS_LOADING:
      return {
        ...state,
        loadingP: true
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
    case PAREJAS_TORNEO:
      return {
        ...state,
        parejas: action.payload,
        loadingP: false
      };

    case GET_CURRENT_ADMIN_TOURNAMENT:
      return {
        ...state,
        torneoAdmin: action.payload,
        loading2: false
      };
    case GET_ADMIN_TOURNAMENT_ROUNDS:
      return {
        ...state,
        rounds: action.payload,
        roundsLoading: false
      };

    default:
      return state;
  }
}
