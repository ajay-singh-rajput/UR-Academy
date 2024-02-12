import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialInterface {
    isSuccess:boolean,
    message:string | null,

}

const initialState:initialInterface ={
    isSuccess:false,
    message:null,
}


export const errorSlice =  createSlice({
    name:'error-handler',
    initialState,
    reducers:{
        receivedError:(state, action:PayloadAction<initialInterface>)=>{
            state.isSuccess = action.payload.isSuccess;
            state.message = action.payload.message
        },
        clearError:(state)=>{
            state.isSuccess = false;
            state.message = null
        }

    }
});

export const {receivedError, clearError} = errorSlice.actions;

export default errorSlice.reducer;