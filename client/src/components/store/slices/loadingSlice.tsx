import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState:{isLoading:boolean} = {
    isLoading:false
}


export const loadingSlice = createSlice({
    name:'loading',
    initialState,
    reducers:{
        activeLoading:(state)=>{
            state.isLoading = true;
        },
        deactivateLoading:(state)=>{
            state.isLoading = false;
        }
    }
})

export const {activeLoading, deactivateLoading} = loadingSlice.actions;

export default loadingSlice.reducer