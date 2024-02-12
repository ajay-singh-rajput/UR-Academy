import { Dispatch } from '@reduxjs/toolkit';
import axios from '../../../config/axios';
import { authUser, logOutUser } from '../slices/userSlice';
import { RootState } from '../store';
import { receivedError } from '../slices/erroHandlerSlice';
import { activeLoading, deactivateLoading } from '../slices/loadingSlice';

export const asyncFetchUser = () => async(dispatch: Dispatch, getState:()=> RootState)=>{
    dispatch(activeLoading())
    try {
        const {data} = await axios.post('/fetchUserDetails');
        // console.log('user data', data)
        dispatch(authUser(data.user));
        // dispatch(receivedError({isSuccess:true,message:'success'}))
    } catch (error:any) {
        if(error.response){
            // dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
        } else{
            dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
        }
    }
    dispatch(deactivateLoading())
}

export const asyncSignUpUser = (data:{otp:string,email:string}) => async(dispatch:any, getState:()=>RootState) =>{
    dispatch(activeLoading())
    try {
        // console.log('otp', otp)
        await axios.post(`/user/verify-otp/${data.email}`, {otp:data.otp});
        dispatch(asyncFetchUser())
        dispatch(receivedError({isSuccess:true,message:'successfully account created'}))
    } catch (error:any) {
        if(error.response){
            dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
        } else{
            dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
        }
    }
    dispatch(deactivateLoading())
}

export const asyncLogInUser = (user:object) => async(dispatch:any, getState:()=>RootState) =>{
    dispatch(activeLoading())
    try {
        await axios.post('/login', user);
        dispatch(asyncFetchUser())
        dispatch(receivedError({isSuccess:true,message:'Logged In Successfully'}))
    } catch (error:any) {
        if(error.response){
            dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
        } else{
            dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
        }
    }
    dispatch(deactivateLoading())
}

export const asyncLogOutUser = () => async(dispatch:any, getState:()=>RootState)=>{
    dispatch(activeLoading())
    try {
        await axios.get('/logout');
        dispatch(logOutUser())
        dispatch(receivedError({isSuccess:true,message:'Logged Out Successfully'}))
    } catch (error:any) {
        if(error.response){
            dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
        } else{
            dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
        }
    }
    dispatch(deactivateLoading())
}