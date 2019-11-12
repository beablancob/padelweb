import { GET_CURRENT_TOURNAMENTS, TOURNAMENTS_LOADING } from "../actions/types";

const initialState = {
  torneos: null,
  loading: true
};
export default function(state = initialState, action) {
  switch (action.type) {
    case TOURNAMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CURRENT_TOURNAMENTS:
      return {
        ...state,
        torneos: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
