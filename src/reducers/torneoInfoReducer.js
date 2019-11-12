import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  TORNEO_LOADING,
  RONDA_LOADING
} from "../actions/types";

const initialState = {
  torneoInformacion: null,
  loadingTorneo: true,
  loadingRonda: true,

  miRondaInformacion: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT_INFO:
      return {
        ...state,
        torneoInformacion: action.payload,
        loadingTorneo: false
      };

    case GET_MI_RONDA_INFO:
      return {
        ...state,
        miRondaInformacion: action.payload,
        loadingRonda: false
      };
    case TORNEO_LOADING:
      return {
        ...state,
        loadingTorneo: true
      };
    case RONDA_LOADING:
      return {
        ...state,
        loadingRonda: true
      };

    default:
      return state;
  }
}
