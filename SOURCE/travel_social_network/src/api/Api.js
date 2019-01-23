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