import axios from "axios";
import { SET_SELECTED_TOURNAMENT, GET_ERRORS } from "./types";

//Seleccion del torneo al que me quiero apuntar
export const seleccionTorneo = (torneoData, history) => dispatch => {
  axios.get("/tournaments/" + torneoData.id).then(res => {
    dispatch({
      type: SET_SELECTED_TOURNAMENT,
      payload: res.data
    });
    history.push("/apuntarse-torneo");
  });
  console.log("En action de seleccion torneo: ", torneoData);
};

// Apuntarse a un torneo
export const registrarseTorneo = (infoRegistro, email, history) => dispatch => {
  console.log("Estoy en action: ", infoRegistro);
  console.log("EmailUser2 en action: ", email);
  axios
    .post("/tournaments/" + infoRegistro.registerCodeData + "/couples", email)

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  history.push("/torneos-activos-user");
};
