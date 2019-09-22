import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_USER1,
  GET_USER2,
  GET_MI_RONDA_INFO
} from "../actions/types";

const initialState = {
  torneoInfo: null,

  miRondaInformacion: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT_INFO:
      return {
        ...state,
        torneoInfo: action.payload
      };

    case GET_MI_RONDA_INFO:
      return {
        ...state,
        miRondaInformacion: action.payload
      };

    default:
      return state;
  }
}
