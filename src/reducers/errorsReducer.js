import { GET_ERRORS } from "../actions/types";

const initialState = {
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
