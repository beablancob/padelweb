import axios from "axios";
import { SET_SELECTED_TOURNAMENT, GET_ERRORS } from "./types";

//Seleccion del torneo al que me quiero apuntar
export const seleccionTorneo = (torneoData, history) => dispatch => {
  console.log("En action de seleccion torneo: ", torneoData);
  dispatch({
    type: SET_SELECTED_TOURNAMENT,
    payload: torneoData
  });
  history.push("/apuntarse-torneo");
};

// Apuntarse a un torneo
export const registrarseTorneo = (
  emailUser2Data,
  registerCodeData,
  history
) => dispatch => {
  console.log("Estoy en action: ", registerCodeData);
  axios.put("/tournaments/", registerCodeData, "/", emailUser2Data).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
  history.push("/torneos-activos-user");
};
