import axios from "axios";
import {
  GET_CURRENT_TOURNAMENTS,
  TOURNAMENTS_LOADING,
  MY_TOURNAMENTS_LOADING,
  GET_MY_CURRENT_TOURNAMENTS
} from "./types";

// Get current profile
// TODO:  mirar la direcction donde se guarden los torneos activos del backend
export const getCurrentTournaments = () => dispatch => {
  dispatch(setTournamentsLoading());

  axios
    .get("/tournaments?publico=true")
    .then(res =>
      dispatch({
        type: GET_CURRENT_TOURNAMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_TOURNAMENTS,
        payload: {}
      })
    );
};
export const getMyCurrentTournaments = () => dispatch => {
  dispatch(setMyTournamentsLoading());

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
        type: GET_MY_CURRENT_TOURNAMENTS,
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
