import {
  GET_CURRENT_TOURNAMENTS,
  TOURNAMENTS_LOADING,
  MY_TOURNAMENTS_LOADING,
  GET_MY_CURRENT_TOURNAMENTS
} from "../actions/types";

const initialState = {
  torneos: null,
  loading: true,
  myLoading: true,
  myTorneos: null
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
    case MY_TOURNAMENTS_LOADING:
      return {
        ...state,
        myLoading: true
      };
    case GET_MY_CURRENT_TOURNAMENTS:
      return {
        ...state,
        myTorneos: action.payload,
        myLoading: false
      };

    default:
      return state;
  }
}
