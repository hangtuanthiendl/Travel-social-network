import * as NAME_ACTION from '../constants/actionTypes';
import defaultState from "./defaultState";


export default function loginReducer(state = defaultState, action){
    switch(action.type){
        case NAME_ACTION.USER_LOGOUT:
            return {...state, userInfo: {}};
        case NAME_ACTION.USER_LOADED:
            return {...state, userInfo: action.userInfo, isLoadingLogin: false,};
        case NAME_ACTION.USER_LOADING:
            return {...state, isLoadingLogin: true};
        case NAME_ACTION.UPDATE_USERINFO:
            return {...state, userInfo: {...state.userInfo, phoneNumber: action.phoneNumber || "Chưa cập nhật", sex: action.sex || "Chưa cập nhật"}};
        default: return state;
    }
}