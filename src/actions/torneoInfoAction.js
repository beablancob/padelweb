import axios from "axios";
import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  TORNEO_COMENZADO_LOADING,
  TORNEO_NO_COMENZADO_LOADING,
  SET_TORNEO_NC_INFO,
  RONDA_LOADING,
  GET_ERRORS
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
      // history.push("/torneo-apuntado-info/id=" + torneoData.id);
    });
};

// TORNEO EN EL QUE PARTICIPO Y NO HA COMENZADO
export const infoTorneoNoComenzadoParticipo = torneoId => dispatch => {
  console.log("HOLA");
  dispatch(setTorneoNoComenzadoLoading());

  axios.get("/tournaments/" + torneoId).then(res => {
    dispatch({
      type: SET_TORNEO_NC_INFO,
      payload: res.data
    });
  });
  console.log("ADIOS");
};

export const subirResultado = (partidoId, id, sets, history) => dispatch => {
  axios
    .put("/partidos/" + partidoId, sets)
    .then(res => history.push("torneo-apuntado-info/" + id + "grupo-actual"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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
