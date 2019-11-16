import {
  SET_SELECTED_TOURNAMENT,
  APUNTARSE_LOADING,
  REGISTRO_ADMIN_LOADING,
  SET_SELECTED_ADMIN_TOURNAMENT
} from "../actions/types";

const initialState = {
  torneoSelected: null,
  loading: true,
  torneoAdminSelected: null,
  loadingAdmin: true
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
    case REGISTRO_ADMIN_LOADING:
      return {
        ...state,
        loadingAdmin: true
      };
    case SET_SELECTED_ADMIN_TOURNAMENT:
      console.log("Estas en el reducer ADMIN", action.payload);
      return {
        ...state,
        torneoAdminSelected: action.payload,
        loadingAdmin: false
      };

    default:
      return state;
  }
}
