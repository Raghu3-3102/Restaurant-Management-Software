import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import {alertsSlice} from './alertSlice'
import { UserSlice } from './userSlice';

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    user : UserSlice.reducer,
})

 const store = configureStore({
    reducer: rootReducer,
});

export default store;