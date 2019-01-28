//user login type
export const USER_REQUEST_LOGIN = 'USER_REQUEST_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const TOKEN_USER = 'TOKEN_USER';
//get data trip
export  const GET_LIST_TRIP_LOADING = 'GET_LIST_TRIP';
export  const GET_LIST_TRIP_SUCCESS = 'GET_LIST_TRIP_SUCCESS';
export  const GET_LIST_TRIP_FAIL    = 'GET_LIST_TRIP_FAIL';
export  const REQUEST_TRIP = 'REQUEST_TRIP';
export  const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export  const CREATE_TRIP_FAIL = 'CREATE_TRIP_FAIL';
//get data place
export const GET_LIST_PLACE_LOADING = 'GET_LIST_PLACE_LOADING';
export const GET_LIST_PLACE_SUCCESS = 'GET_LIST_PLACE_SUCCESS';
export const GET_LIST_PLACE_FAIL    = 'GET_LIST_PLACE_FAIL';
//register user
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
//upload image
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const REQUEST_UPLOAD_IMAGE = 'REQUEST_UPLOAD_IMAGE';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';
//user info
export const REQUEST_USER_INFO_SUCCESS = 'REQUEST_USER_INFO_SUCCESS';
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const REQUEST_USER_INFO_FAIL = 'REQUEST_USER_INFO_FAIL';
// create place
export const REQUEST_CREATE_NEW_PLACE = 'REQUEST_CREATE_NEW_PLACE';
export const CREATE_NEW_PLACE_SUCCESS = 'CREATE_NEW_PLACE_SUCCESS';
export const CREATE_NEW_PLACE_FAIL = 'CREATE_NEW_PLACE_FAIL';
//Stop
export const REQUEST_CREATE_NEW_STOP = 'REQUEST_CREATE_NEW_STOP';
export const CREATE_NEW_STOP_SUCCESS = 'CREATE_NEW_STOP_SUCCESS';
export const CREATE_NEW_STOP_FAIL = 'CREATE_NEW_STOP_FAIL';
export const GET_LIST_STOP_LOADING = 'GET_LIST_STOP_LOADING';
export const GET_LIST_STOP_SUCCESS = 'GET_LIST_STOP_SUCCESS';
export const GET_LIST_STOP_FAIL    = 'GET_LIST_STOP_FAIL';
//register trip

export const REQUEST_REGISTER_TRIP    = 'REQUEST_REGISTER_TRIP';
export const REGISTER_TRIP_SUCCESS    = 'REGISTER_TRIP_SUCCESS';
export const REGISTER_TRIP_FAIL    = 'REGISTER_TRIP_FAIL';

//get list my trip

export  const GET_LIST_MY_TRIP_LOADING = 'GET_LIST_MY_TRIP_LOADING';
export  const GET_LIST_MY_TRIP_SUCCESS = 'GET_LIST_MY_TRIP_SUCCESS';
export  const GET_LIST_MY_TRIP_FAIL    = 'GET_LIST_MY_TRIP_FAIL';



import {NavigationActions} from "react-navigation";
export const resetAction = (name) => NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: name})
    ]
});
