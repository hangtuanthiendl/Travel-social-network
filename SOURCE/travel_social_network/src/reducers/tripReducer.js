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
        case types.REQUEST_REGISTER_TRIP:{
            return state.merge({
                fetching: true,
            })
        }
        case types.REGISTER_TRIP_SUCCESS:{
            console.log("register Data reducer",action.data);
            return state.merge({
                fetching: false,
                dataRegister:action.data
            })
        }
        case types.REGISTER_TRIP_FAIL:{
            return state.merge({
                fetching: false,
                dataRegister:action.status
            })
        }
        case types.GET_LIST_MY_TRIP_SUCCESS: {
            console.log("trungdo data my trip",action.data);
            return state.merge({
                dataMyTrip: action.data,
                fetching: false,
            });
        }
        case types.GET_LIST_MY_TRIP_LOADING: {
            return state.merge({
                fetching:true,
            });
        }
        case types.GET_LIST_MY_TRIP_FAIL: {
            return state.merge({ fetching: false, error: action.error, msg: action.msg });
        }
        default:
            return state;
    }
}
