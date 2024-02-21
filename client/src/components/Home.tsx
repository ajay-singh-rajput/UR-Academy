import React, { useState } from 'react'
import homeCss from '../modulCss/Home.module.css'
import video2 from '../res/student_-_73007 (540p).mp4'

const Home = () => {
  
  
  return (
    <>
    
     <div className={`h-full top-0 text-gray-300 flex flex-col md:flex-row absolute w-full`}>
        <div className={`md:w-1/2  bg-[#334155] p-3 pt-[13vh]`}>
            <h1 className={`text-5xl font-extrabold text-end hidden md:flex md:flex-col`}><span>GROW UP </span>  <span>EVERY</span></h1>
            <h1 className={`text-7xl text-center font-extrabold md:hidden`}><span>GROW UP </span> <span className={`text-lime-400 `}> YOUR SKILL</span> <span>EVERY MINUTES</span></h1>
        </div>
        <div className={`w-1/2 sm:flex hidden flex-col gap-2 pt-[13vh] p-4`}>
            <h1 className={`text-5xl font-extrabold hidden md:flex md:flex-col`}><span className={`text-lime-400 w-fit`}> YOUR SKILL</span> <span className='w-fit'> MINUTES</span></h1>
          
        </div>
        <div className={`absolute bottom-3 lg:w-[20vw] md:w-[40vw] w-[90vw] left-1/2 h-[40vh] md:h-2/3 bg-slate-500 -translate-x-1/2  rounded-full `}>

        <video className={`w-full h-full rounded-full object-cover ${homeCss.videoCss}`} src={video2} autoPlay muted loop ></video>
        <div></div>
        {/* <button className={`absolute top-0 left-1/2 -translate-x-1/2  text-4xl font-extrabold text-lime-400 p-2`}>Register Now</button> */}
        
        </div>
        
    </div>
    
    </>
  )
}

export default Home