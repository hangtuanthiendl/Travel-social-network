import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function tripReducer(state = defaultState.trip, action) {
    switch (action.type) {
        case types.GET_LIST_TRIP_SUCCESS: {
            console.log("trungdo data trip",action.data);
            return state.merge({
                dataTrip: action.data,
                fetching: false,
            });
        }
        case types.GET_LIST_TRIP_LOADING: {
            return state.merge({
               fetching:true,
            });
        }
        case types.GET_LIST_TRIP_FAIL: {
            return state.merge({ fetching: false, error: action.error, msg: action.msg });
        }
        case types.CREATE_TRIP_SUCCESS:{
            console.log("action.data.data",action);
            return state.merge({
                fetching: false,
                dataTripCreateNew:action.data.data,
            })
        }
        case types.REQUEST_TRIP:{
            return state.merge({
                fetching: true,
            })
        }
        default:
            return state;
    }
}
