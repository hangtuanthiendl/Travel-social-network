import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function getListStopSuccess(data) {
    return {type: types.GET_LIST_STOP_SUCCESS, data};
}

export function getListStopFail(error, msg) {
    return {type: types.GET_LIST_STOP_FAIL, error, msg};
}

export function requestgetListStop(fetching) {
    return {type: types.GET_LIST_STOP_LOADING, fetching};
}

export function requestCreateNewStop(fetching) {
    return {type: types.REQUEST_CREATE_NEW_STOP, fetching};
}
export function createNewStopSuccess(data) {
    return {type: types.CREATE_NEW_STOP_SUCCESS, data};
}
export function createNewStopFail(fetching) {
    return {type: types.CREATE_NEW_STOP_FAIL, fetching};
}
export function getListStop(offset,token) {
    // return function (dispatch) {
    //     dispatch(requestgetListStop());
    //     api.getListStop(offset,token).then((res)=>{
    //         if(res && res.status){
    //             console.log("dataStop",res.data);
    //             dispatch(getListStopSuccess(res.data))
    //         }else{
    //             dispatch(getListStopFail(true,res.data))
    //         }
    //     })
    //         .catch((err)=>{
    //             console.log("login fail",err);
    //             dispatch(getListStopFail(true,"Error occurred when logging in!"))
    //         })
    // }
}
export function createNewStop(token,option) {
    console.log("option",token,option);
    return function (dispatch) {
        dispatch(requestCreateNewStop(true));
        api.createNewStop(token,option).then((res)=>{
            if(res && res.status){
                console.log("dataStop",res.data);
                dispatch(createNewStopSuccess(res.data))
            }else{
                dispatch(createNewStopFail(false))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(createNewStopFail(false,"Error occurred when logging in!"))
            })
    }
}