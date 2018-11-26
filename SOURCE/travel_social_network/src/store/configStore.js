
import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
import { AsyncStorage } from 'react-native'
import { persistStore, persistReducer } from 'redux-persist'
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['login']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default function configureStore(){
    const store = createStore(persistedReducer, compose(
        applyMiddleware(thunk)));
    const persistor = persistStore(store);
    return { persistor, store };
};

