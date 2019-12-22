import axios from "axios";
import {
  GET_CURRENT_TOURNAMENTS,
  TOURNAMENTS_LOADING,
  MY_TOURNAMENTS_LOADING,
  GET_MY_CURRENT_TOURNAMENTS,
  GET_ERRORS
} from "./types";

// Get current profile
// TODO:  mirar la direcction donde se guarden los torneos activos del backend
export const getCurrentTournaments = () => dispatch => {
  dispatch(setTournamentsLoading());
  dispatch({
    type: GET_ERRORS,
    payload: null
  });

  axios.get("/tournaments?publico=true").then(res =>
    dispatch({
      type: GET_CURRENT_TOURNAMENTS,
      payload: res.data
    })
  );
};
export const getMyCurrentTournaments = () => dispatch => {
  dispatch(setMyTournamentsLoading());
  dispatch({
    type: GET_ERRORS,
    payload: null
  });

  axios
    .get("/tournaments")
    .then(res =>
      dispatch({
        type: GET_MY_CURRENT_TOURNAMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

// Tournaments loading
export const setTournamentsLoading = () => {
  return {
    type: TOURNAMENTS_LOADING
  };
};
// Tournaments loading
export const setMyTournamentsLoading = () => {
  return {
    type: MY_TOURNAMENTS_LOADING
  };
};
