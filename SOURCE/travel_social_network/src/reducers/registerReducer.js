import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function registerUserReducer(state = defaultState.registerUser, action) {
    switch (action.type) {
        case types.REGISTER_USER_SUCCESS: {
            return state.merge({
                fetching: false,
                data: action.data,
            });
        }
        case types.REGISTER_USER_REQUEST: {
            return state.merge({
                fetching: true,
            });
        }
        case types.REGISTER_USER_FAIL: {
            return state.merge({ fetching: false, data: action.error, });
        }
        default:
            return state;
    }
}
