import * as types from '../constants/actionTypes';
import defaultState from "./defaultState";
export default function imageReducer(state = defaultState.image, action) {
    switch (action.type) {
        case types.UPLOAD_IMAGE_SUCCESS: {
            {console.log("action.data",action.data)}
            return state.merge({
                fetching: false,
                data: action.data,
            });
        }
        case types.REQUEST_UPLOAD_IMAGE: {
            return state.merge({
                fetching: true,
            });
        }
        case types.UPLOAD_IMAGE_FAIL: {
            return state.merge({ fetching: false, data: action.error,});
        }
        default:
            return state;
    }
}
