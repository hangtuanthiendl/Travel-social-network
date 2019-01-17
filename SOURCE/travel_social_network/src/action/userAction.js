import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function requestUserInfoSuccess(data) {
    return {type: types.REQUEST_USER_INFO_SUCCESS, data};
}

export function requestUserInfoFail(error) {
    return {type: types.REQUEST_USER_INFO_FAIL, error};
}

export function requestUserInfo(fetching) {
    return {type: types.REGISTER_USER_REQUEST, fetching};
}

export function getUserInfo(token) {
    return function (dispatch) {
        console.log("Option",token);
        dispatch(requestUserInfo(true));
        api.getUserInfo(token).then((res)=>{
            console.log("data user Info",res);
            if(res && res.status){
                dispatch(requestUserInfoSuccess(res.data))
            }else{
                dispatch(requestUserInfoFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(requestUserInfoFail(true,"Error occurred when logging in!"))
            })
    }
}