import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function loginReducer(state = defaultState.login, action) {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS: {
            {console.log("action.data",action.data)}
            return state.merge({
                fetching: false,
                error: false,
                data: action.data,
                isLogin: true,
                token:action.data.token
            });
        }
        case types.USER_REQUEST_LOGIN: {
            return state.merge({
                fetching: true,
                error: false,
                userName: action.login.userName,
                password: action.login.password,
                isLogin: false,
            });
        }
        case types.USER_LOGIN_FAIL: {
            return state.merge({ fetching: false, error: action.error, isLogin: false, msg: action.msg });
        }
        case types.TOKEN_USER:{
            return state.merge({
                token:action.token
            })
        }
        default:
            return state;
    }
}
