import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function loginSuccess(data) {
    return {type: types.USER_LOGIN_SUCCESS, data};
}

export function loginFail(error, msg) {
    return {type: types.USER_LOGIN_FAIL, error, msg};
}

export function requestLogin(login) {
    return {type: types.USER_REQUEST_LOGIN, login};
}
export function updateToken(token) {
    return {type:types.TOKEN_USER, token}
}
export function login(username, password) {
    return function (dispatch) {
        dispatch(requestLogin(login()));
        api.login(username,password).then((res)=>{
            console.log("data",res);
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