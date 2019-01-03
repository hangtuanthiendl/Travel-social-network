
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import tripReducer from "./tripReducer";
import placeReducer from "./placeReducer";
import registerUserReducer from "./registerReducer";
const rootReducer = combineReducers ({
    loginReducer,
    tripReducer,
    placeReducer,
    registerUserReducer,
});
export default rootReducer;