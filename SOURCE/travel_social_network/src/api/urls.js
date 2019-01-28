import {GET_LIST_PLACE_FAIL} from "../constants/actionTypes";

export default {
    BASE_URL: 'http://171.244.140.35:3000/api/',
    ROOT:'http://171.244.140.35:3000',
    USER_LOGIN:'authen/login',
    GET_LIST_TRIP:'tripsWithUsers?offset=',
    GET_LIST_MY_TRIP:'mytrip?offset=',
    CHECK_MEMBER_IN_TRIP:'checkmember?idTrip=',
    GET_LIST_PLACE:'places?offset=',
    CREATE_TRIP:'trip',
    REGISTER_TRIP:'registermember',
    CREATE_USER:'user',
    UPLOAD_IMAGE:'imageUploadTrip',
    GET_USER_INFO:'user',
    DETAIL_USER:'detailuser?id=',
    CREATE_PLACE:'place',
    CREATE_STOP:'stop',
    GET_LIST_CMT:'comments?idTrip=',
    SENT_CMT:'comment',
    GET_MEMBER_IN_TRIP:'members?idTrip=',
    COUNT_WAITING_MEMBERS:'countwaitingmembers',
    WAITING_MEMBER:'waitingmembers?idTrip=',
    UPDATE_STATUS_MEMBER:'updatestatemember',

}
