import {AsyncStorage} from 'react-native';

export const setToLocal = async (key, value) =>
{
    console.log("SET ", key, value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocal = async (key) =>
{
    let res = await AsyncStorage.getItem(key);
    let data = await JSON.parse(res);

    console.log("GET ", key, data);
    return data;
};
