import React from 'react'
import css from './Profile.module.css'
import { RiImageAddLine, RiMailLine, RiMapPinUserLine, RiPhoneLine } from '@remixicon/react'

const ProfileView = () => {
  return (
  
    <div className={`w-full h-fit md:bg-[#223243] flex   p-3`}>
        <div className={` md:h-full w-full min-h-[50%]`}>
            <div className={`relative w-fit px-32 md:w-fit md:px-10 h-fit bg-[#475569] mx-auto md:mt-2 mt-32 flex flex-col md:flex-row items-center gap-2 pt-32 md:pt-2 md:justify-center pb-5 ${css.profileInfoDiv}`}>
              <div className={`absolute md:relative w-60 h-60 rounded-full bg-red-400 mx-auto md:mx-0 md:border-[#223243]  -top-32 md:top-0  ${css.dpDiv}`}>
                <img className={`w-full h-full object-cover object-center rounded-full`} src="https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png" alt="" />
                <RiImageAddLine className={`absolute right-6 bottom-4 md:bg-[#223243] bg-[#475569] border-4 md:border-[#223243] active:scale-95 border-[#475569] cursor-pointer hover:text-[#67E8F9] rounded-full w-7 h-7 `}/>
              </div>
              <div className={`flex flex-col items-center justify-center gap-2`}>

              <span className={`w-full text-center text-[#D1E1E7] text-2xl font-bold`}>Ajay Rajput</span>
              <span className={`flex gap-2 text-[#d1e1e77a] items-center`}>
                <RiPhoneLine/><span className={`text-[#d1e1e7ce] `}>9876543210</span>  <RiMapPinUserLine/> <span className={`text-[#d1e1e7ce] `}>Bhopal</span>
              </span>
              <span className={`text-[#d1e1e7ce] flex items-center gap-2`}><RiMailLine/> yourmail@gmail.com</span>
              </div>
            </div>
            <div className={`w-full h-full`}></div>
        </div>
    </div>
    
  )
}

export default ProfileView