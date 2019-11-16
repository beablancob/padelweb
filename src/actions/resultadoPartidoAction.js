// YA PUEDO ELIMINAR ESTE COMPONENTE

import axios from "axios";
import { SET_PAREJA_CONTRINCANTE, GET_ERRORS } from "./types";

//Seleccion de la pareja contra la que he jugado
export const parejaContrincante = (pareja, history) => dispatch => {
  console.log("pareja: ", pareja);
  return {
    type: SET_PAREJA_CONTRINCANTE,
    payload: pareja
  };
  history.push("/torneo-apuntado-info/resultado-partido");
};
