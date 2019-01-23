import Immutable from 'seamless-immutable';

export default {
    login: Immutable({
        isLogin: false,
        userName: null,
        password: null,
        error: null,
        data: {},
        fetching: false,
        registerError: null,
        userInfo: {},
        userProfile: {},
        isResetPassword: false,//
        token:null
    }),
    trip: Immutable({
        dataTrip:[],
        fetching:false,
        error :null,
        msg:null,
        dataTripCreateNew:{}
    }),
    place: Immutable({
        dataPlace:[],
        fetching:false,
        error :null,
        msg:null,
    }),
    registerUser:Immutable({
        fetching: false,
        data: {},
    }),
    image:Immutable({
        fetching: false,
        data: {},
    }),
    userInfo:Immutable({
        fetching: false,
        data: {},
    }),
    stop: Immutable({
        dataStop:[],
        fetching:false,
        error :null,
        msg:null,
    }),
};
