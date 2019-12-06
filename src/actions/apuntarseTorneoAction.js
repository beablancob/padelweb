import axios from "axios";
import {
  SET_SELECTED_TOURNAMENT,
  GET_ERRORS,
  APUNTARSE_LOADING,
  SET_SELECTED_ADMIN_TOURNAMENT,
  REGISTRO_ADMIN_LOADING
} from "./types";

//Seleccion del torneo al que me quiero apuntar
export const seleccionTorneo = (torneoId, history) => dispatch => {
  dispatch(setApuntarseLoading());

  axios.get("/tournaments/" + torneoId).then(res => {
    dispatch({
      type: SET_SELECTED_TOURNAMENT,
      payload: res.data
    });
    if (history) history.push("/apuntarse-torneo/" + torneoId);
    console.log("res.data", res.data);
  });
  console.log(
    "+++++++++ seleccion torneo +++++++++++, despues del loading!! action"
  );
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
    .then(res => {
      console.log("RESPUESTA APUNTARSE", res);
      history.push("/mis-torneos");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Apuntarse a un torneo privado
export const registrarseTorneoPriv = (infoRegistro, history) => dispatch => {
  console.log("Estoy en action: ", infoRegistro);
  console.log("EmailUser2 en action: ", infoRegistro.emailUser2);
  axios
    .post(
      "/tournaments/" + infoRegistro.registerCodeData + "/couples",
      infoRegistro.emailUser2
    )
    .then(res => {
      console.log("RESPUESTA APUNTARSE", res);
      history.push("/mis-torneos");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Seleccion del torneo al que me quiero apuntar
export const seleccionTorneoAdmin = torneoId => dispatch => {
  dispatch(setRegistroAdminLoading());

  axios.get("/admin/tournaments/" + torneoId).then(res => {
    dispatch({
      type: SET_SELECTED_ADMIN_TOURNAMENT,
      payload: res.data
    });
    console.log("res.data", res.data);
  });

  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
};

// Apuntarse loading
export const setRegistroAdminLoading = () => {
  return {
    type: REGISTRO_ADMIN_LOADING
  };
};
// Registrar una pareja a mi torneo
export const registrarAdminTorneo = (torneoId, email, history) => dispatch => {
  console.log("EmailUser en action: ", email);
  axios
    .post("/admin/tournaments/" + torneoId + "/couples", email)
    .then(res => {
      console.log("RESPUESTA APUNTARSE", res);
      history.push("/torneos-activos-admin");
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editarParejaTorneoAdmin = (
  id,
  idPareja,
  emails,
  history
) => dispatch => {
  axios
    .put("/admin/tournaments/" + id + "/couples/" + idPareja, emails)
    .then(res => {
      console.log("RESPUESTA editar", res);
      history.push("/torneos-activos-admin/" + id + "/ver-parejas");
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const eliminarParejaAdmin = (id, idPareja, history) => dispatch => {
  axios
    .delete("/admin/tournaments/" + id + "/couples/" + idPareja)
    .then(res => {
      console.log("RESPUESTA eliminar", res);
      history.push("/torneos-activos-admin/" + id + "/ver-parejas");
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
