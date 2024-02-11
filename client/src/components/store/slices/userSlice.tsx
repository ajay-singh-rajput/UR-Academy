import { PayloadAction, createSlice } from "@reduxjs/toolkit"




export interface CounterState {
    user:any,
    isAuth:Boolean
}

const initialState:CounterState ={
    user:null,
    isAuth:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        authUser:(state, action:PayloadAction<object>)=>{
            state.user = action.payload;
            state.isAuth = true;
        },
        logOutUser:(state)=>{
            state.user = null,
            state.isAuth = false
        }
    }
})

export const {authUser, logOutUser} = userSlice.actions;

export default userSlice.reducer;