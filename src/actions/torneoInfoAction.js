import axios from "axios";
import {
  SET_SELECTED_TOURNAMENT_INFO,
  GET_MI_RONDA_INFO,
  TORNEO_LOADING,
  RONDA_LOADING
} from "./types";

// TORNEO EN EL QUE PARTICIPO Y QUE HA EMPEZADO

export const infoTorneoComenzadoParticipo = torneoId => dispatch => {
  dispatch(setTorneoLoading());

  axios.get("/tournaments/" + torneoId).then(res => {
    console.log("En action de info del torneo apuntado: ", res.data);
    dispatch({
      type: SET_SELECTED_TOURNAMENT_INFO,
      payload: res.data
    });
  });
};

export const miRondaInfo = (torneoData, history) => dispatch => {
  dispatch(setRondaLoading());

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
export const infoTorneoNoComenzadoParticipo = torneoId => dispatch => {
  console.log("HOALlasjdfoj");
  dispatch(setTorneoLoading());
  console.log("-------------x-------------");
  axios.get("/tournaments/" + torneoId).then(res => {
    console.log("torneoInfo;", res.data);
    dispatch({
      type: SET_SELECTED_TOURNAMENT_INFO,
      payload: res.data
    });
  });
};

// Tournaments loading
export const setTorneoLoading = () => {
  return {
    type: TORNEO_LOADING
  };
};

// Tournaments loading
export const setRondaLoading = () => {
  return {
    type: RONDA_LOADING
  };
};
