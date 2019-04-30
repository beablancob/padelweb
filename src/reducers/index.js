import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
//En este fichero solo combinamos reducers
export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profile: profileReducer
});
//utilizaremos this.props.auth