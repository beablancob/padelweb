import { SET_SELECTED_TOURNAMENT } from "../actions/types";

const initialState = {
  torneoSelected: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_TOURNAMENT:
      console.log("Estas en el reducer", action.payload);
      return {
        ...state,
        torneoSelected: action.payload
      };

    default:
      return state;
  }
}
