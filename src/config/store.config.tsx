import {combineReducers, configureStore} from "@reduxjs/toolkit"

import bannerReducer from "../reducer/banner.reducer"

import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rooterReducer = combineReducers({
    banner: bannerReducer

})
const persistConfig ={
    key:"root", 
    storage
    
}
const persistedReducer = persistReducer(persistConfig, rooterReducer)

const store = configureStore({
    reducer:persistedReducer
})
export const persistor = persistStore(store);

export default store


