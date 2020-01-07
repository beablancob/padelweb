import axios from "axios";
import {
  GET_CURRENT_ADMIN_TOURNAMENTS,
  GET_CURRENT_ADMIN_TOURNAMENT,
  TOURNAMENTS_ADMIN_LOADING,
  TOURNAMENT_ADMIN_LOADING,
  GET_ERRORS,
  GET_ADMIN_TOURNAMENT_ROUNDS,
  ROUNDS_LOADING,
  PAREJAS_TORNEO,
  PAREJAS_LOADING
} from "./types";

// Get current admin tournaments
export const getCurrentAdminTournaments = () => dispatch => {
  dispatch(setTournamentsLoading());
  dispatch({
    type: GET_ERRORS,
    payload: null
  });
  axios.get("/admin/tournaments").then(res =>
    dispatch({
      type: GET_CURRENT_ADMIN_TOURNAMENTS,
      payload: res.data
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
    .then(res => history.push("/torneos-activos-admin"));
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};
export const obtenerParejas = id => dispatch => {
  console.log("HOLA", id);
  dispatch(obtenerParejasLoading());
  axios.get("/admin/tournaments/" + id + "/couples").then(res => {
    dispatch({
      type: PAREJAS_TORNEO,
      payload: res.data
    });
  });
};

export const obtenerParejasLoading = () => {
  return {
    type: PAREJAS_LOADING
  };
};

export const getAdminTournament = id => dispatch => {
  console.log("getAdminTournament", id);
  dispatch(setTournamentLoading());
  axios.get("/admin/tournaments/" + id).then(res => {
    dispatch({
      type: GET_CURRENT_ADMIN_TOURNAMENT,
      payload: res.data
    });
    console.log("info del torneo", res.data);
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

// Dar comienzo a mi torneo
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

// Avanzar ronda
export const avanzarRonda = (id, history) => dispatch => {
  console.log("avanzar ronda id:", id);

  axios
    .post("/admin/tournaments/" + id + "/nextRound")
    .then(res => {
      console.log("YA tenemos respuesta", res);
      history.push("/ver-torneo/" + id + "/grupos");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  // .get("/admin(tournaments/" + id)
  // .then(res=>{
  //   dispatch({
  //     type:
  //   })
  // });
};

export const getRoundsTournament = id => dispatch => {
  console.log("en actions", id);
  dispatch(setRoundsLoading());
  axios.get("/admin/tournaments/" + id + "/previousRounds").then(res => {
    dispatch({
      type: GET_ADMIN_TOURNAMENT_ROUNDS,
      payload: res.data
    });
    console.log("info del torneo en actions aaaaa", res.data);
  });
};

export const setRoundsLoading = () => {
  return {
    type: ROUNDS_LOADING
  };
};
