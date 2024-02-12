import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import errorSlice  from "./slices/erroHandlerSlice";
import  loadingSlice  from "./slices/loadingSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        errorSlice:errorSlice,
        loading:loadingSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch:()=> typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;