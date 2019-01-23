import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function getListPlaceSuccess(data) {
    return {type: types.GET_LIST_PLACE_SUCCESS, data};
}

export function getListPlaceFail(error, msg) {
    return {type: types.GET_LIST_PLACE_FAIL, error, msg};
}

export function requestgetListPlace(fetching) {
    return {type: types.GET_LIST_PLACE_LOADING, fetching};
}

export function requestCreateNewPlace(fetching) {
    return {type: types.REQUEST_CREATE_NEW_PLACE, fetching};
}
export function createNewPlaceSuccess(data) {
    return {type: types.CREATE_NEW_PLACE_SUCCESS, data};
}
export function createNewPlaceFail(fetching) {
    return {type: types.CREATE_NEW_PLACE_FAIL, fetching};
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
export function createNewPlace(token,option) {
    console.log("option",token,option);
    return function (dispatch) {
        dispatch(requestCreateNewPlace(true));
        api.createNewPlace(token,option).then((res)=>{
            if(res && res.status){
                console.log("dataPlace",res.data);
                dispatch(createNewPlaceSuccess(res.data))
            }else{
                dispatch(createNewPlaceFail(false))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(createNewPlaceFail(false,"Error occurred when logging in!"))
            })
    }
}