import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import { buildingsAPI } from "../services/BuildingsService";

const rootReducer = combineReducers({
    userReducer,
    [buildingsAPI.reducerPath]:buildingsAPI.reducer,
    
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware()
            .concat(buildingsAPI.middleware)
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']