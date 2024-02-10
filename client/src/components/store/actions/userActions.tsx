import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../config/axios';
import { authUser } from '../slices/userSlice';


export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser',async(_, {dispatch})=>{
    try {
        const {data} = await axios.post('/userDetails');
        dispatch(authUser(data.user));
    } catch (error) {
        console.log(error)
    }
});

export const signUpUser = createAsyncThunk('user/signUpUser',async(user:object,{dispatch})=>{
    try {
        await axios.post('/user/sign-up', user);
        await dispatch(fetchCurrentUser());
    } catch (error) {
        console.log(error)
    }
});

export const logInUser = createAsyncThunk('user/logInUser',async(user:object,{dispatch})=>{
    try {
        await axios.post('/user/log-in', user);
        await dispatch(fetchCurrentUser());
    } catch (error) {
        console.log(error)
    }
});

export const logOutUser = createAsyncThunk('user/logOutUser',async(_,{dispatch})=>{
    try {
        await axios.get('/user/log-out');
        dispatch(logOutUser());
    } catch (error) {
        console.log(error)
    }
});