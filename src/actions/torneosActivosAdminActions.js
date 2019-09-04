import axios from "axios";
import {
  GET_CURRENT_ADMIN_TOURNAMENTS,
  TOURNAMENTS_ADMIN_LOADING,
  GET_ERRORS
} from "./types";

// Get current admin tournaments
// TODO:  mirar la direcction donde se guarden los torneos activos del backend
export const getCurrentAdminTournaments = () => dispatch => {
  dispatch(setTournamentsLoading());
  axios
    .get("/admin/tournaments")
    .then(res =>
      dispatch({
        type: GET_CURRENT_ADMIN_TOURNAMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_ADMIN_TOURNAMENTS,
        payload: {}
      })
    );
};

//Get info from the current admin tournaments
// TODO: tengo que poner como parametro el id ????
export const getInfoCurrentAdminTournaments = () => dispatch => {
  dispatch(setTournamentsLoading());
  axios
    .get("/admin/tournaments/")
    .then(res =>
      dispatch({
        type: GET_CURRENT_ADMIN_TOURNAMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_ADMIN_TOURNAMENTS,
        payload: {}
      })
    );
};

// Profile loading
export const setTournamentsLoading = () => {
  return {
    type: TOURNAMENTS_ADMIN_LOADING
  };
};
// Create Profile
export const createTournament = (tournamentData, history) => dispatch => {
  axios
    .post("/admin/tournaments", tournamentData)
    .then(res => history.push("/torneos-activos-admin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
