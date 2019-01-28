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

export function requestRegisterTrip() {
    return {type:types.REQUEST_REGISTER_TRIP}
}
export function registerTripSuccess(data) {
    return {type:types.REGISTER_TRIP_SUCCESS,data}
}
export function registerTripFail(status) {
    return {type:types.REGISTER_TRIP_FAIL,status}
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

//register trip
export function registerTrip(token,idTrip) {
    console.log("Token",token,idTrip);
    return function (dispatch) {
        dispatch(requestRegisterTrip());
        api.registerTrip(token,idTrip).then((res)=>{
            if(res && res.status){
                console.log("register trip",res.data);
                dispatch(registerTripSuccess(res.data))
            }else{
                dispatch(registerTripFail(res.status))
            }
        })
            .catch((err)=>{
                console.log("register fail",err);
                dispatch(registerTripFail(true,"Error occurred when logging in!"))
            })
    }
}
// get list my trip
export function getListMyTripSuccess(data) {
    return {type: types.GET_LIST_MY_TRIP_SUCCESS, data};
}

export function getListMyTripFail(error, msg) {
    return {type: types.GET_LIST_MY_TRIP_FAIL, error, msg};
}

export function requestGetListMyTrip(fetching) {
    return {type: types.GET_LIST_MY_TRIP_LOADING,fetching};
}
export function getListMyTrip(token,offset) {
    console.log("Token my trip",token);
    return function (dispatch) {
        dispatch(requestGetListMyTrip(true));
        api.getListMyTrip(token,offset).then((res)=>{
            if(res && res.status){
                console.log("dataTrip",res.data);
                dispatch(getListMyTripSuccess(res.data))
            }else{
                dispatch(getListTripFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("get list my trip fail",err);
                dispatch(getListMyTripFail(true,"Error get list my trip fail!"))
            })
    }
}

