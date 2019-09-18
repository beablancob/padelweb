import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_USER1,
  GET_USER2,
  GET_MI_RONDA_INFO
} from "../actions/types";

const initialState = {
  torneoInfo: null,
  user1: null,
  user2: null,
  miRondaInformacion: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT_INFO:
      return {
        ...state,
        torneoInfo: action.payload
      };
    case GET_USER1:
      console.log("USER 1", action.payload);
      return {
        ...state,
        user1: action.payload
      };
    case GET_USER2:
      return {
        ...state,
        user2: action.payload
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
