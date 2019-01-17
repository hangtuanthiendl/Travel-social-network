import * as types from '../constants/actionTypes';
import * as api from '../api/Api'

export function uploadImageSuccess(data) {
    return {type: types.UPLOAD_IMAGE_SUCCESS, data};
}

export function uploadImageFail(error) {
    return {type: types.UPLOAD_IMAGE_FAIL, error};
}

export function requestUploadImage(fetching) {
    return {type: types.REQUEST_UPLOAD_IMAGE, fetching};
}

export function updateLoadImage(token,option) {
    return function (dispatch) {
        dispatch(requestUploadImage(true));
        api.upLoadImage(token,option).then((res)=>{
            console.log("data",res);
            if(res && res.status){
                dispatch(uploadImageSuccess(res.data))
            }else{
                dispatch(uploadImageFail(true,res.data))
            }
        })
            .catch((err)=>{
                console.log("upload fail",err);
                dispatch(uploadImageFail(true,"Error occurred when logging in!"))
            })
    }
}