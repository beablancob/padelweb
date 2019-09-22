import { SET_PAREJA_CONTRINCANTE } from "../actions/types";

const initialState = {
  parejaSelected: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PAREJA_CONTRINCANTE:
      console.log("Estas en el reducer", action.payload);
      return {
        ...state,
        parejaSelected: action.payload
      };

    default:
      return state;
  }
}
