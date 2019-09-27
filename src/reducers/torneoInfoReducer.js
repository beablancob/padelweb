import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO
} from "../actions/types";

const initialState = {
  torneoInformacion: null,

  miRondaInformacion: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT_INFO:
      return {
        ...state,
        torneoInformacion: action.payload
      };

    case GET_MI_RONDA_INFO:
      return {
        ...state,
        miRondaInformacion: action.payload,
        torneoIniciado: true
      };

    default:
      return state;
  }
}
