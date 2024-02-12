import { Dispatch } from '@reduxjs/toolkit';
import axios from '../../../config/axios';
import { authUser, logOutUser } from '../slices/userSlice';
import { RootState } from '../store';

export const asyncFetchUser = () => async(dispatch: Dispatch, getState:()=> RootState)=>{
    try {
        const {data} = await axios.post('/fetchUserDetails');
        console.log('user data', data)
        dispatch(authUser(data.user));
    } catch (error:any) {
        if(error.response){
            console.log(error?.response.data.message)
        } else{
            console.log('unable to connect with server');
            
        }
        
    }
}

export const asyncSignUpUser = (data:{otp:string,email:string}) => async(dispatch:any, getState:()=>RootState) =>{
    try {
        // console.log('otp', otp)
        await axios.post(`/user/verify-otp/${data.email}`, {otp:data.otp});
        dispatch(asyncFetchUser())
    } catch (error:any) {
        if(error.response){
            console.log(error?.response.data.message)
        } else{
            console.log('unable to connect with server');
            
        }
    }
}

export const asyncLogInUser = (user:object) => async(dispatch:any, getState:()=>RootState) =>{
    try {
        await axios.post('/login', user);
        dispatch(asyncFetchUser())
    } catch (error:any) {
        
        if(error.response){
            console.log(error?.response.data.message)
        } else{
            console.log('unable to connect with server');
            
        }
    }
}

export const asyncLogOutUser = () => async(dispatch:any, getState:()=>RootState)=>{
    try {
        await axios.get('/logout');
        dispatch(logOutUser())
    } catch (error:any) {
        
        if(error.response){
            console.log(error?.response.data.message)
        } else{
            console.log('unable to connect with server');
            
        }
    }
}