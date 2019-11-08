import axios from "axios";
import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  INFO_LOADING
} from "./types";

// TORNEO EN EL QUE PARTICIPO Y QUE HA EMPEZADO

export const infoTorneoComenzadoParticipo = torneoData => dispatch => {
  dispatch(setInfoLoading());

  axios.get("/tournaments/" + torneoData.id).then(res => {
    console.log("En action de info del torneo apuntado: ", res.data);
    dispatch({
      type: SET_SELECTED_TOURNAMENT_INFO,
      payload: res.data
    });
  });
};

export const miRondaInfo = (torneoData, history) => dispatch => {
  dispatch(setInfoLoading());

  axios
    .get("/tournaments/" + torneoData.id + "/ronda/" + torneoData.rondaActual)

    .then(res => {
      console.log("devuelve: ", res.data);

      dispatch({
        type: GET_MI_RONDA_INFO,
        payload: res.data
      });
      history.push("/torneo-apuntado-info/id=" + torneoData.id);
    });
};

// TORNEO EN EL QUE PARTICIPO Y NO HA COMENZADO
export const infoTorneoNoComenzadoParticipo = (
  torneoData,
  history
) => dispatch => {
  dispatch(setInfoLoading());

  axios.get("/tournaments/" + torneoData.id).then(res => {
    console.log("torneoInfo;", res.data);
    dispatch({
      type: SET_SELECTED_TOURNAMENT_INFO,
      payload: res.data
    });
    history.push("/torneo-nocomenzado-participo");
  });
};

// Tournaments loading
export const setInfoLoading = () => {
  return {
    type: INFO_LOADING
  };
};
