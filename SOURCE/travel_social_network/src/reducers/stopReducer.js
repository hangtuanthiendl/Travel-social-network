import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function stopReducer(state = defaultState.stop, action) {
    switch (action.type) {
        case types.GET_LIST_STOP_SUCCESS: {
            console.log("trungdo data stop",action.data);
            return state.merge({
                dataStop: action.data,
                fetching: false,
            });
        }
        case types.GET_LIST_STOP_LOADING: {
            return state.merge({
                fetching:true,
            });
        }
        case types.GET_LIST_STOP_FAIL: {
            return state.merge({ fetching: false, error: action.error, msg: action.msg });
        }
        case types.REQUEST_CREATE_NEW_STOP:{
            return state.merge({
                fetching:true,
            });
        }
        case types.CREATE_NEW_STOP_SUCCESS:{
            console.log("TrungDo stop",action.data);
            return state.merge({
                fetching:false,
                msg:action.data,
            });
        }
        case types.CREATE_NEW_STOP_FAIL:{
            return state.merge({
                fetching:false,
            });
        }
        default:
            return state;
    }
}
