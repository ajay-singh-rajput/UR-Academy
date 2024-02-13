import React from 'react'
import homeCss from '../modulCss/Home.module.css'
import vector from '../images/alien-img.jpeg'
import video from '../res/student_-_73007 (540p).mp4'

const Home = () => {
  return (
    <>
    <div className={`h-full top-0 flex flex-col md:flex-row absolute w-full`}>
        <div className={`md:w-1/2 bg-[#334155]  p-3 pt-[13vh]`}>
            <h1 className={`flex flex-col text-6xl font-extrabold`}><span>GROW UP</span> <span className={`text-lime-400 `}>YOUR SKILL</span> <span>EVERY MINUTES</span></h1>
        </div>
        <div className={`w-1/2`}>
          
        </div>
        <div className={`absolute bottom-3 left-1/2 w-1/2 h-2/5 bg-slate-400 -translate-x-1/2  rounded-full `}>

        <video className={`w-full h-full rounded-full object-cover invert opacity-85`} src={video} autoPlay muted loop ></video>
        <button className={`absolute top-0 left-1/2 -translate-x-1/2  text-4xl font-extrabold`}>Register Now</button>
        </div>
        {/* <img className={`absolute bottom-3 left-1/2 w-1/2 h-2/5 bg-slate-400 -translate-x-1/2  rounded-full object-cover`} src={vector} alt="here come the image" /> */}
    </div>
    </>
  )
}

export default Home