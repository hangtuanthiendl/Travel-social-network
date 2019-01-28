import urls from './urls';
import axios from 'axios';

const customAxios = axios.create({
    timeout:30000,
});

export const login = (username,password) =>{
  let url = urls.BASE_URL + urls.USER_LOGIN;
      return customAxios.post(url,{
      username:username,
      password:password
  })
};

export const getListTrip = (offset) =>{
    let url = urls.BASE_URL + urls.GET_LIST_TRIP + offset;
    console.log("URL",url);
    return customAxios.get(url);
};

export const getListMyTrip = (token,offset) =>{
    let url = urls.BASE_URL + urls.GET_LIST_MY_TRIP + offset;
    console.log("URL",url);
    return customAxios.get(url,
        {
            headers:
                {
                    token:token,
                }
        }
    );
};

export const getListPlace = (offset,token)=>{
    let url = urls.BASE_URL + urls.GET_LIST_PLACE + offset;
    console.log("URL",url);
    return customAxios.get(url,{
        headers:
            {
               token:token,
            }
    });
};

export const upLoadImage = (token,option) =>{
    let url = urls.BASE_URL + urls.UPLOAD_IMAGE;
    console.log("token",token);
    console.log("url",url);
    const data = new FormData();
    data.append('image', {
        uri: option.uri,
        type: option.type, // or photo.type
        name: option.fileName,
    });
    console.log("data image",data);
    return customAxios.post(url,
        data,
        {
            headers:
                {
                    token:token,
                    'Content-Type': 'multipart/form-data',
                }
        }

    );
};
export const getUserInfo = (token)=>{
    let url = urls.BASE_URL + urls.GET_USER_INFO;
    console.log("URL",url,token);

    return customAxios.get(url,
        {
            headers:
                {
                    token:token,
                }
        });
};
export const getUserInfoTripDetail = (token,idUser)=>{
    let url = urls.BASE_URL + urls.DETAIL_USER + idUser;
    console.log("URL",url,token);

    return customAxios.get(url,
        {
            headers:
                {
                    token:token,
                }
        });
};
export const registerUser = (option) =>{
    let url = urls.BASE_URL + urls.CREATE_USER;
    console.log("URL",url,option);

    return customAxios.post(url,option);
};
export const createTrip = (token,option) =>{
    let url = urls.BASE_URL + urls.CREATE_TRIP;
    console.log("URL",url);
    console.log("option",option);
    return customAxios.post(url,
        option,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};
export const registerTrip = (token,idTrip) =>{
    let url = urls.BASE_URL + urls.REGISTER_TRIP;

    return customAxios.post(url,
        {
            "idTrip": idTrip
        },
        {
            headers:
                {
                    token: token,
                }
        }
    );
};
export const checkMeberInTrip = (token,idTrip)=>{
    let url = urls.BASE_URL + urls.CHECK_MEMBER_IN_TRIP + idTrip;
    console.log("url check",url);
    return customAxios.get(url,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};
export const createNewPlace = (token,option) =>{
    let url = urls.BASE_URL + urls.CREATE_PLACE;
    console.log("URL",url);
    console.log("option",option);
    return customAxios.post(url,
        option,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};

export const createNewStop = (token,option) =>{
    let url = urls.BASE_URL + urls.CREATE_STOP;
    console.log("URL",url);
    console.log("option",option);
    return customAxios.post(url,
        option,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};

export const getListCmt = (token,idTrip,offset)=>{

    let url = urls.BASE_URL + urls.GET_LIST_CMT + idTrip + '&offset='+offset;
    console.log("URL getListCmt",url);
    return customAxios.get(url,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};
export const sentCmt = (token,option)=>{
    let url = urls.BASE_URL + urls.SENT_CMT;
    console.log("URL getListCmt",url);
    console.log("optioncmt",option);
    return customAxios.post(url,
        option,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};

export const getListMemberInTrip = (token,idTrip,offset) =>{
    let url = urls.BASE_URL + urls.GET_MEMBER_IN_TRIP + idTrip + '&offset=' + offset;
    console.log("URL get list member in trips",url);
    return customAxios.get(url,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};
export const getCountListMemberInTrip = (token) =>{
    let url = urls.BASE_URL + urls.COUNT_WAITING_MEMBERS;
    console.log("URL get count list member in trips",url);
    return customAxios.get(url,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};

export const getListMemberWaitingInTrip = (token,idTrip,offset)=>{
    let url = urls.BASE_URL + urls.WAITING_MEMBER + idTrip + '&offset=' + offset;
    console.log("URL get count list member in trips",url);
    return customAxios.get(url,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};
export const updateStatusMemberInTrip = (token,option)=>{
    let url = urls.BASE_URL + urls.UPDATE_STATUS_MEMBER;
    console.log("URL update status member in trips",url);
    console.log("option",option);
    return customAxios.put(url,
        option,
        {
            headers:
                {
                    token: token,
                }
        }
    );
};