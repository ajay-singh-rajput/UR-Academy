import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/users/forms/SignIn'
import LogIn from './components/users/forms/LogIn'
// import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  // const locomotiveScroll = new LocomotiveScroll();


  return (
    <>
    <div className='pt-[11vh] border-t-2 bg-[#223243] w-screen min-h-screen'>
      <div className=''>

    <Navbar />
      </div>
    <Routes>
      <Route path='/register' element={<SignIn/>}/>
      <Route path='/login' element={<LogIn/>}/>
    </Routes>
    </div>


    </>
  )
}

export default App