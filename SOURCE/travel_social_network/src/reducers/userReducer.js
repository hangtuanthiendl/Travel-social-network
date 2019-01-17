import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function userReducer(state = defaultState.userInfo, action) {
    switch (action.type) {
        case types.REQUEST_USER_INFO_SUCCESS: {
            console.log("action.data",action.data);
            return state.merge({
                fetching: false,
                data: action.data,
            });
        }
        case types.USER_INFO_REQUEST: {
            return state.merge({
                fetching: true,
            });
        }
        case types.REQUEST_USER_INFO_FAIL: {
            return state.merge({ fetching: false, data: action.error, });
        }
        default:
            return state;
    }
}
