import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  TORNEO_COMENZADO_LOADING,
  TORNEO_NO_COMENZADO_LOADING,
  SET_TORNEO_NC_INFO,
  RONDA_LOADING,
  GET_PREVIOUS_ROUND,
  PREVIOUS_ROUNDS_LOADING
} from "../actions/types";

const initialState = {
  torneoInformacion: null,
  loadingTorneo: true,
  loadingRonda: true,
  torneoNoComenzado: null,
  loadingTNC: true,
  miRondaInformacion: null,
  previousRound: null,
  loadingRound: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT_INFO:
      return {
        ...state,
        torneoInformacion: action.payload,
        loadingTorneo: false
      };
    case SET_TORNEO_NC_INFO:
      return {
        ...state,
        torneoNoComenzado: action.payload,
        loadingTNC: false
      };

    case GET_MI_RONDA_INFO:
      return {
        ...state,
        miRondaInformacion: action.payload,
        loadingRonda: false
      };
    case TORNEO_COMENZADO_LOADING:
      return {
        ...state,
        loadingTorneo: true
      };
    case TORNEO_NO_COMENZADO_LOADING:
      return {
        ...state,
        loadingTNC: true
      };
    case RONDA_LOADING:
      return {
        ...state,
        loadingRonda: true
      };
    case GET_PREVIOUS_ROUND:
      return {
        ...state,
        previousRound: action.payload,
        loadingRound: false
      };
    case PREVIOUS_ROUNDS_LOADING:
      return {
        ...state,
        loadingRound: true
      };

    default:
      return state;
  }
}
