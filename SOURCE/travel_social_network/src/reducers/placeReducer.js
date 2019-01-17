import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function placeReducer(state = defaultState.place, action) {
    switch (action.type) {
        case types.GET_LIST_PLACE_SUCCESS: {
            console.log("trungdo data place",action.data);
            return state.merge({
                dataPlace: action.data,
                fetching: false,
            });
        }
        case types.GET_LIST_PLACE_LOADING: {
            return state.merge({
                fetching:true,
            });
        }
        case types.GET_LIST_PLACE_FAIL: {
            return state.merge({ fetching: false, error: action.error, msg: action.msg });
        }
        default:
            return state;
    }
}
