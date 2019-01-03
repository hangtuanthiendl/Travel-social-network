import urls from './urls';
import axios from 'axios';

const customAxios = axios.create({
    timeout:30000,
});

export const login = (username,password) =>{
  let url = urls.BASE_URL + urls.USER_LOGIN;
      return customAxios.post(url,{
      email:username,
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


export const registerUser = (option) =>{
    let url = urls.BASE_URL + urls.CREATE_USER;
    console.log("URL",url,option);

    return customAxios.post(url,option);
};
export const createTrip = (token) =>{
    let url = urls.BASE_URL + urls.CREATE_TRIP;
    console.log("URL",url);
    return customAxios.post(url,{
        headers:
            {
                token:token,
            },
        body:{
            "idLocation": 1,
            "idCreator": 1,
            "tittle": "test",
            // "description": "test",
            // "img": "test",
            // "numberParticipant": "{1}",
            // "status": 1,
            // "star": 10,
            // "quantity": 1,
            // "timeStart": "01-01-2019",
            // "timeEnd": "01-01-2019",
            // "createdAt": "01-01-2018",
            // "updatedAt": "01-01-2018"
        }
    });
};