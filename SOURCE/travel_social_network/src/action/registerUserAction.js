import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function registerSuccess(data) {
    return {type: types.REGISTER_USER_SUCCESS, data};
}

export function registerFail(error) {
    return {type: types.REGISTER_USER_FAIL, error};
}

export function requestRegister(fetching) {
    return {type: types.REGISTER_USER_REQUEST, fetching};
}

export function registerUser(option) {
    return function (dispatch) {
        console.log("Option",option);
        dispatch(requestRegister(true));
        api.registerUser(option).then((res)=>{
            console.log("data",res);
            if(res && res.status){
                dispatch(registerSuccess(res.data))
            }else{
                dispatch(registerFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(registerFail(true,"Error occurred when logging in!"))
            })
    }
}