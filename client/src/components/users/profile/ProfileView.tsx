import React, { useEffect } from 'react'
import css from './Profile.module.css'
import { RiImageAddLine, RiMailLine, RiMapPinUserLine, RiPhoneLine } from '@remixicon/react'
import Card from '../../course/Card'
import { useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'

const ProfileView = () => {

  const {isAuth, user} = useAppSelector(state=>state.user);
  const navigate = useNavigate()
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])

  return (
  
    <div className={`w-full h-fit md:bg-[#223243] flex   p-3`}>
        <div className={`h-full w-full min-h-[50%] flex flex-col gap-5`}>
            <div className={`relative w-fit px-32 md:w-fit md:px-10 h-fit bg-[#475569] mx-auto md:mt-2 mt-32 flex flex-col md:flex-row items-center gap-2 pt-32 md:pt-2 md:justify-center pb-5 ${css.profileInfoDiv}`}>
              <div className={`absolute md:relative w-60 h-60 rounded-full bg-red-400 mx-auto md:mx-0 md:border-[#223243]  -top-32 md:top-0  ${css.dpDiv}`}>
                <img className={`w-full h-full object-cover object-center rounded-full`} src={`${isAuth? user.avatar.url :'https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png'}`} alt="" />
                <RiImageAddLine className={`absolute right-6 bottom-4 md:bg-[#223243] bg-[#475569] border-4 md:border-[#223243] active:scale-95 border-[#475569] cursor-pointer hover:text-[#67E8F9] rounded-full w-7 h-7 `}/>
              </div>
              <div className={`flex flex-col items-center justify-center gap-2`}>

              <span className={`w-full text-center text-[#D1E1E7] text-2xl font-bold`}>{ isAuth && user.firstName} {isAuth && user.lastName}</span>
              <span className={`flex gap-2 text-[#d1e1e77a] items-center`}>
                <RiPhoneLine/><span className={`text-[#d1e1e7ce] `}>{isAuth && user.contact }</span>  <RiMapPinUserLine/> <span className={`text-[#d1e1e7ce] `}>{isAuth && user.city }</span>
              </span>
              <span className={`text-[#d1e1e7ce] flex items-center gap-2`}><RiMailLine/>{isAuth && user.email }</span>
              </div>
              
            </div>
            <div className={`flex flex-col bg-red-800 gap-2`}>
              <span className={`p-2`}>Options</span>
              <div>
                <span></span>
              </div>
            </div>
            <div className={`flex items-center justify-center flex-col text-center gap-2 my-2 `}>
              <p className={`text-[#33ffff] `}>Tips</p>
              <h3>Do you know ?</h3>
              <p className={`text-[#d1e1e7ad] `}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum labore, ea ex consectetur quae explicabo suscipit neque alias magnam cupiditate vitae modi.</p>
            </div>
            <div><h3>Your Courses</h3></div>
            <div className={`w-full h-fit flex gap-2 flex-wrap items-center justify-center bg-[#223243]`}> <Card/> <Card/> <Card/> <Card/></div>
        </div>
    </div>
    
  )
}

export default ProfileView