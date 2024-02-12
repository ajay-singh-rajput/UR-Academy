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

// import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();

  const {isAuth, user} = useAppSelector(state=>state.user)

  const dispatch = useAppDispatch()

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
    <div className='pt-[12vh] border-t-2 bg-[#223243]  min-h-screen'>
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


    </>
  )
}

export default App