import axios from "axios";
import { GET_CURRENT_TOURNAMENTS, TOURNAMENTS_LOADING } from "./types";

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
// Tournaments loading
export const setTournamentsLoading = () => {
  return {
    type: TOURNAMENTS_LOADING
  };
};
