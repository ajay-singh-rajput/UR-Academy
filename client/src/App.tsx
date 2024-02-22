import React, { useEffect, useRef } from 'react'
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
import Create from './components/users/manageCourse/Create'
import { Link } from 'react-router-dom'
import CreateChapter from './components/users/manageCourse/CreateChapter'
import WatchCourse from './components/users/handleCourse/WatchCourse'
import { Courser } from './components/otherComponents/Cursor'
import CreatedCourses from './components/users/manageCourse/CreatedCourses'
import OpenCourse from './components/users/manageCourse/OpenCourse'
import 'remixicon/fonts/remixicon.css'
import Footer from './components/otherComponents/Footer'
import EditProfile from './components/users/profile/EditProfile'
import About from './components/About'
import Contact from './components/Contact'
// import 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();

  const {isAuth, user} = useAppSelector(state=>state.user);
  const {isLoading} = useAppSelector(state=> state.loading);
  const {isSuccess, message} = useAppSelector(state => state.errorSlice);
  const dispatch = useAppDispatch()
  // const stickyElement = useRef(null)

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
    <div className='pt-[12vh]  bg-[#223243]  min-h-screen relative z-10'>
      <div className=''>

    <Navbar />
      </div >
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<SignIn/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/Profile' element={<ProfileView/>}/>
      <Route path='/Upload Course' element={<Create/>}/>
      <Route path='/Manage Course' element={<CreatedCourses/>}/>
      <Route path='/Edit Profile' element={<EditProfile/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact Us' element={<Contact/>}/>
      <Route path='/create-chapter/:courseID/:thumb' element={<CreateChapter/>}/>
      <Route path='/watch-chapter/:courseID' element={<WatchCourse/>}/>
      <Route path='/Course/Course/:courseID' element={<OpenCourse/>}/>
    </Routes>
    </div>
    <Footer/>
    {isLoading ? <Loading />:''}

 {false &&<nav className='bg-red-400 flex gap-2 absolute bottom-0 left-0'>
  {['register', 'login', 'Profile', 'Create-Course','create-chapter/123456/true', 'create-chapter/123456/false','watch-chapter/1234' ].map((elem, ind)=>{
    return<Link key={ind} to={`/${elem}`}>{elem}</Link>
  })}
</nav> }
<Courser/>
    </>
  )
}

export default App