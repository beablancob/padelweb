import axios from "axios";
import {
  GET_CURRENT_ADMIN_TOURNAMENTS,
  GET_CURRENT_ADMIN_TOURNAMENT,
  TOURNAMENTS_ADMIN_LOADING,
  TOURNAMENT_ADMIN_LOADING,
  GET_ERRORS,
  GET_ADMIN_TOURNAMENT_ROUNDS,
  ROUNDS_LOADING
} from "./types";

// Get current admin tournaments
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
export const selectEditarTorneo = (torneoId, history) => dispatch => {
  dispatch(setTournamentLoading());
  axios.get("/admin/tournaments/" + torneoId).then(res => {
    dispatch({
      type: GET_CURRENT_ADMIN_TOURNAMENT,
      payload: res.data
    });
    if (history) history.push("/editar-torneo/" + torneoId);
    console.log("EDITAR TORNEO ACTIONS", res.data);
  });
};

export const setTournamentLoading = () => {
  return {
    type: TOURNAMENT_ADMIN_LOADING
  };
};
// Tournament/Tournaments loading
export const setTournamentsLoading = () => {
  return {
    type: TOURNAMENTS_ADMIN_LOADING
  };
};
// Create Tournament
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

export const getAdminTournament = torneoId => dispatch => {
  console.log("getAdminTournament", torneoId);
  dispatch(setTournamentLoading());
  axios.get("/admin/tournaments/" + torneoId).then(res => {
    dispatch({
      type: GET_CURRENT_ADMIN_TOURNAMENT,
      payload: res.data
    });
    //  console.log("info del torneo en actions", res.data);
  });
};

// Edit tournament
export const torneoEditado = (torneo, torneoId, history) => dispatch => {
  axios
    .put("/admin/tournaments/" + torneoId, torneo)
    .then(res => history.push("/torneos-activos-admin/"))

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const eliminarTorneo = (torneoId, history) => dispatch => {
  axios
    .delete("/admin/tournaments/" + torneoId)
    .then(res => {
      history.push("/torneos-activos-admin");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const comenzarTorneo = (torneoId, history) => dispatch => {
  console.log("COMENZAR TORNEO ACTIONS");

  axios
    .put("/admin/tournaments/" + torneoId + "/start")
    .then(res => {
      history.push("/torneos-activos-admin");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getRoundsTournament = id => dispatch => {
  console.log("en actions", id);
  dispatch(setRoundsLoading());
  axios.get("/admin/tournaments/" + id + "/previousRounds").then(res => {
    dispatch({
      type: GET_ADMIN_TOURNAMENT_ROUNDS,
      payload: res.data
    });
    console.log("info del torneo en actions", res.data);
  });
};

export const setRoundsLoading = () => {
  return {
    type: ROUNDS_LOADING
  };
};
