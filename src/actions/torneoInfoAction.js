import axios from "axios";
import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  TORNEO_COMENZADO_LOADING,
  TORNEO_NO_COMENZADO_LOADING,
  SET_TORNEO_NC_INFO,
  RONDA_LOADING,
  GET_ERRORS,
  GET_PREVIOUS_ROUND,
  PREVIOUS_ROUNDS_LOADING
} from "./types";

// TORNEO EN EL QUE PARTICIPO Y QUE HA EMPEZADO

export const infoTorneoComenzadoParticipo = torneoId => dispatch => {
  dispatch(setTorneoComenzadoLoading());

  axios.get("/tournaments/" + torneoId).then(res => {
    console.log("En action de info del torneo apuntado: ", res.data);
    dispatch({
      type: SET_SELECTED_TOURNAMENT_INFO,
      payload: res.data
    });
  });
};

export const miRondaInfo = torneoData => dispatch => {
  console.log("ACTION MI RONDA INFO", torneoData);
  dispatch(setRondaLoading());
  console.log(torneoData);
  axios
    .get(
      "/tournaments/" +
        torneoData.tournament.id +
        "/ronda/" +
        torneoData.tournament.rondaActual
    )

    .then(res => {
      console.log("devuelve: ", res.data);

      dispatch({
        type: GET_MI_RONDA_INFO,
        payload: res.data
      });
    });
};

// TORNEO EN EL QUE PARTICIPO Y NO HA COMENZADO
export const infoTorneoNoComenzadoParticipo = torneoId => dispatch => {
  console.log("HOLA");
  dispatch(setTorneoNoComenzadoLoading());
  console.log("hey");

  axios.get("/tournaments/" + torneoId).then(res => {
    dispatch({
      type: SET_TORNEO_NC_INFO,
      payload: res.data
    });
  });
  console.log("ADIOS");
};

// Subida del resultado de un partido de la ronda actual, jugado por mi

export const subirResultado = (partidoId, id, sets, history) => dispatch => {
  console.log("actions de actualizar resultado");

  axios
    .put("/partidos/" + partidoId, sets)
    .then(res => history.push("/torneo-apuntado-info/" + id + "/grupo-actual"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Confimación del resultado de un partido que ha sido subido por mi contrincante

export const confirmarResultado = (partidoId, id, history) => dispatch => {
  console.log("actions de confirm resultado");
  axios
    .put("/partidos/" + partidoId + "/confirmResult")
    .then(res => history.push("/torneo-apuntado-info/" + id + "/grupo-actual"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getPreviousRounds = (torneoId, ronda) => dispatch => {
  dispatch(previousRoundsLoading());
  console.log("hola");
  axios.get("/tournaments/" + torneoId + "/ronda/" + ronda).then(res => {
    dispatch({
      type: GET_PREVIOUS_ROUND,
      payload: res.data
    });
  });
};
export const previousRoundsLoading = () => {
  return {
    type: PREVIOUS_ROUNDS_LOADING
  };
};

// Tournaments loading
export const setTorneoComenzadoLoading = () => {
  return {
    type: TORNEO_COMENZADO_LOADING
  };
};

// Tournaments loading
export const setTorneoNoComenzadoLoading = () => {
  return {
    type: TORNEO_NO_COMENZADO_LOADING
  };
};

// Tournaments loading
export const setRondaLoading = () => {
  return {
    type: RONDA_LOADING
  };
};
