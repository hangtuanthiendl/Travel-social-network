import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function getListPlaceSuccess(data) {
    return {type: types.GET_LIST_PLACE_SUCCESS, data};
}

export function getListPlaceFail(error, msg) {
    return {type: types.GET_LIST_PLACE_FAIL, error, msg};
}

export function requestgetListPlace(login) {
    return {type: types.GET_LIST_PLACE_LOADING, login};
}

export function getListPlace(offset,token) {
    return function (dispatch) {
        dispatch(requestgetListPlace());
        api.getListPlace(offset,token).then((res)=>{
            if(res && res.status){
                console.log("dataPlace",res.data);
                dispatch(getListPlaceSuccess(res.data))
            }else{
                dispatch(getListPlaceFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(getListPlaceFail(true,"Error occurred when logging in!"))
            })
    }
}