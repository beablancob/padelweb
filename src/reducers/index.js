import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReducer from "./profileReducer";
import torneosActivosUserReducer from "./torneosActivosUserReducer";
import torneosActivosAdminReducer from "./torneosActivosAdminReducer";
import apuntarseTorneoReducer from "./apuntarseTorneoReducer";
import torneoApuntadoInfoReducer from "./torneoApuntadoInfoReducer";
import resultadoPartidoReducer from "./resultadoPartidoReducer";

//En este fichero solo combinamos reducers
export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  torneosActivosUser: torneosActivosUserReducer,
  torneosActivosAdmin: torneosActivosAdminReducer,
  apuntarseTorneo: apuntarseTorneoReducer,
  torneoApuntadoInfo: torneoApuntadoInfoReducer,
  resultadoPartido: resultadoPartidoReducer
});
//utilizaremos this.props.auth
