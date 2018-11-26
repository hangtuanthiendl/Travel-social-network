import Immutable from 'seamless-immutable';

export default {
    login: Immutable({
        isLogin: false,
        userName: null,
        password: null,
        error: null,
        data: '',
        fetching: false,
        registerError: null,
        userInfo: {},
        userProfile: {},
        isResetPassword: false,//
    }),
};
