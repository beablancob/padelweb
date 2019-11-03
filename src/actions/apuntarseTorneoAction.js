import axios from "axios";
import {
  SET_SELECTED_TOURNAMENT,
  GET_ERRORS,
  APUNTARSE_LOADING
} from "./types";

//Seleccion del torneo al que me quiero apuntar
export const seleccionTorneo = (torneoId, history) => dispatch => {
  console.log("En action de seleccion torneo: ", torneoId);
  dispatch(setApuntarseLoading());

  axios.get("/tournaments/" + torneoId).then(res => {
    dispatch({
      type: SET_SELECTED_TOURNAMENT,
      payload: res.data
    });
    if (history) history.push("/apuntarse-torneo/" + torneoId);
    console.log("res.data", res.data);
  });
  console.log("+++++++++ seleccion torneo +++++++++++");
};

// Apuntarse loading
export const setApuntarseLoading = () => {
  return {
    type: APUNTARSE_LOADING
  };
};

// Apuntarse a un torneo público
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
  history.push("/mis-torneos");
};

// Apuntarse a un torneo privado
export const registrarseTorneoPriv = (infoRegistro, history) => dispatch => {
  console.log("Estoy en action: ", infoRegistro);
  console.log("EmailUser2 en action: ", infoRegistro.email);
  axios
    .post(
      "/tournaments/" + infoRegistro.registerCodeData + "/couples",
      infoRegistro.email
    )

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  history.push("/mis-torneos");
};
