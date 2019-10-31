import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  IS_ADMIN,
  IS_NOT_ADMIN,
  SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  console.log("****************getCurrentProfile de profileActions");
  // Pido al backend la info del usuario
  axios.get("/users/:userId").then(res => {
    console.log("perfilInformacion;", res.data);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  });
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("¿Estás seguro? ¡Esta acción no se puede deshacer!")) {
    axios
      .delete("/users")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// isAdmin
export const isAdmin = () => {
  return {
    type: IS_ADMIN
  };
};

export const isNotAdmin = () => {
  return {
    type: IS_NOT_ADMIN
  };
};
