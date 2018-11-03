import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function loginSuccess(msg) {
    return {type: types.USER_LOGIN_SUCCESS, msg};
}

export function loginFail(error, msg) {
    return {type: types.USER_LOGIN_FAIL, error, msg};
}

export function requestLogin(login) {
    return {type: types.USER_REQUEST_LOGIN, login};
}

export function login(username, password) {
    return function (dispatch) {
        dispatch(requestLogin(login()));
        api.login(username,password).then((res)=>{
            if(res && res.status){
                dispatch(loginSuccess(res.data))
            }else{
                dispatch(loginFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(loginFail(true,"Error occurred when logging in!"))
            })
    }
}