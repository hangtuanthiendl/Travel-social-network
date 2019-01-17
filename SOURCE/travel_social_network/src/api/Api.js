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
    console.log("url",url);
    const data = new FormData();
   // data.append('name', 'testName'); // you can append anyone.
    console.log("option",option);
    data.append('image', {
        uri: option.uri,
        type: option.type, // or photo.type
        name: option.fileName,
    });
   // data.append('image', option);
   // data.append('hash', option.data);
    console.log("data",token);
    // fetch(url, {
    //     method: 'post',
    //     headers:
    //         {
    //             token:token,
    //         },
    //     body: data
    // }).then(res => {
    //     console.log("trungdo",res);
    // });
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
    return customAxios.post(url,{
        headers:
            {
                token:token,
            },
        option
    });
};