import { SET_SELECTED_TOURNAMENT, APUNTARSE_LOADING } from "../actions/types";

const initialState = {
  torneoSelected: null,
  loading: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case APUNTARSE_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_SELECTED_TOURNAMENT:
      console.log("Estas en el reducer", action.payload);
      return {
        ...state,
        torneoSelected: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
