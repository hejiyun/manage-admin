// store/index.js
import { createStore } from 'redux'
import reducers from './rootReducer'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage: storage
};
const myPersistReducer = persistReducer(persistConfig, reducers)

const store = createStore(myPersistReducer)

export const persistor = persistStore(store)
export default store