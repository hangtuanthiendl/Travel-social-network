
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import tripReducer from "./tripReducer";
import placeReducer from "./placeReducer";
import registerUserReducer from "./registerReducer";
import imageReducer from "./imageReducer";
import userReducer from "./userReducer"
import stopReducer from "./stopReducer"
const rootReducer = combineReducers ({
    loginReducer,
    tripReducer,
    placeReducer,
    registerUserReducer,
    imageReducer,
    userReducer,
    stopReducer,
});
export default rootReducer;