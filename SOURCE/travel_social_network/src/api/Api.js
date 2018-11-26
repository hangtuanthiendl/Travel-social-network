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