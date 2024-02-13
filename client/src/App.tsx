import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/users/forms/SignIn'
import LogIn from './components/users/forms/LogIn'
import ProfileView from './components/users/profile/ProfileView'
import Home from './components/Home'
import axios from './config/axios'
import { useAppDispatch, useAppSelector } from './components/store/store'
import { asyncFetchUser } from './components/store/actions/userActions'
import Loading from './components/otherComponents/Loading'
import { toast } from 'react-toastify'
import { clearError } from './components/store/slices/erroHandlerSlice'

// import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();

  const {isAuth, user} = useAppSelector(state=>state.user);
  const {isLoading} = useAppSelector(state=> state.loading);
  const {isSuccess, message} = useAppSelector(state => state.errorSlice);
  const dispatch = useAppDispatch()

  const showMessage = ()=>{
    // toast.success('hello frnd')
    if(message){
      if(isSuccess){
        toast.success(message)
        
      } else {
        toast.error(message)
      }
      dispatch(clearError())
    }
  }

  useEffect(() => {
    showMessage()
  
    return () => {
      
    }
  }, [message])
  


  const fetchUserData = ()=>{
    dispatch(asyncFetchUser())
  }
  useEffect(() => {
    fetchUserData()
    return () => {
    }
  }, [isAuth])
  

  const testApi = async()=>{
    try {
      const {data} = await axios.get('/')
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  }
useEffect(() => {
  
  testApi();

  return () => {
    
  }
}, [])


  return (
    <>
    <div className='pt-[12vh]  bg-[#223243]  min-h-screen'>
      <div className=''>

    <Navbar />
      </div>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<SignIn/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/Profile' element={<ProfileView/>}/>
    </Routes>
    </div>
    {isLoading ? <Loading />:''}


    </>
  )
}

export default App