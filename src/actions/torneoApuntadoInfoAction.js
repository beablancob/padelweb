import axios from "axios";
import { SET_SELECTED_TOURNAMENT_INFO, GET_MI_RONDA_INFO } from "./types";

//Seleccion del torneo al que me quiero apuntar
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

export const miRondaInfo = (rondaActual, id) => dispatch => {
  axios.get("/tournaments/" + id + "/ronda/" + rondaActual).then(res =>
    dispatch({
      type: GET_MI_RONDA_INFO,
      payload: res.data
    })
  );
};
