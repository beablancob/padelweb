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
export const getCurrentProfile = id => dispatch => {
  dispatch(setProfileLoading());
  console.log("****************getCurrentProfile de profileActions");
  // Pido al backend la info del usuario
  axios.get("/users/" + id).then(res => {
    console.log("perfilInformacion;", res.data);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  });
};
// Register User
export const editedUser = (userId, editedUser) => dispatch => {
  console.log("editedUser", editedUser);
  axios
    .put("/users/" + userId.id, editedUser)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  window.alert("¡Perfil editado!");
};
// Delete account & profile
export const deleteAccount = (userId, history) => dispatch => {
  if (window.confirm("¿Estás seguro? ¡Esta acción no se puede deshacer!")) {
    axios
      .delete("/users/" + userId)
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
        history.push("/register");
      })
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
