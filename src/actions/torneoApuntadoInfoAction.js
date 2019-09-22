import axios from "axios";
import { SET_SELECTED_TOURNAMENT_INFO, GET_MI_RONDA_INFO } from "./types";

export const infoTorneo = (torneoData, history) => dispatch => {
  axios.get("/tournaments/" + torneoData.id).then(res => {
    console.log("En action de info del torneo apuntado: ", res.data);
    dispatch({
      type: SET_SELECTED_TOURNAMENT_INFO,
      payload: res.data
    });
    history.push("/torneo-apuntado-info");
  });
};

export const miRondaInfo = torneoData => dispatch => {
  axios
    .get("/tournaments/" + torneoData.id + "/ronda/" + torneoData.rondaActual)

    .then(res => {
      console.log("devuelve: ", res.data);
      dispatch({
        type: GET_MI_RONDA_INFO,
        payload: res.data
      });
    });
};

// console.log("devuelve: ", res)
// console.log(
//   "Me he metido en el método miRondaInfo de action, id ",
//   torneoData.id,
//   "rondaActual: ",
//   torneoData.rondaActual
// )
