import * as types from '../constants/actionTypes';
import * as api from '../api/Api'
//Get Trips
export function getListTripSuccess(data) {
    return {type: types.GET_LIST_TRIP_SUCCESS, data};
}

export function getListTripFail(error, msg) {
    return {type: types.GET_LIST_TRIP_FAIL, error, msg};
}

export function requestgetListTrip(fetching) {
    return {type: types.GET_LIST_TRIP_LOADING,fetching};
}
export function getListTrip(offset) {
    return function (dispatch) {
        dispatch(requestgetListTrip(true));
        api.getListTrip(offset).then((res)=>{
            if(res && res.status){
                console.log("dataTrip",res.data);
                dispatch(getListTripSuccess(res.data))
            }else{
                dispatch(getListTripFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(getListTripFail(true,"Error occurred when logging in!"))
            })
    }
}
// Create Trip
export function requestCreateTrip() {
    return {type: types.REQUEST_TRIP};
}
export function createTripSuccess(data) {
    return {type: types.CREATE_TRIP_SUCCESS,data};
}
export function createTripFail(error) {
    return {type: types.CREATE_TRIP_FAIL,error};
}

export function createTrip(token,option) {
    console.log("Token",token,option);
    return function (dispatch) {
        dispatch(requestCreateTrip());
        api.createTrip(token,option).then((res)=>{
            if(res && res.status){
                console.log("Create trip",res);
                dispatch(createTripSuccess(res.data))
            }else{
                dispatch(createTripFail(res.status))
            }
        })
            .catch((err)=>{
                console.log("login fail",err);
                dispatch(createTripFail(true,"Error occurred when logging in!"))
            })
    }
}