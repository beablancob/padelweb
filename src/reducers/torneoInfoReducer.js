import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  INFO_LOADING
} from "../actions/types";

const initialState = {
  torneoInformacion: null,
  loading: false,

  miRondaInformacion: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT_INFO:
      return {
        ...state,
        torneoInformacion: action.payload,
        loading: false
      };

    case GET_MI_RONDA_INFO:
      return {
        ...state,
        miRondaInformacion: action.payload,
        torneoIniciado: true,
        loading: false
      };
    case INFO_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
