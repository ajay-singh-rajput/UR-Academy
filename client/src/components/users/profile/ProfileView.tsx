import  { useEffect, useState } from 'react'
import css from './Profile.module.css'
import {  RiMailLine, RiMapPinUserLine, RiPhoneLine } from '@remixicon/react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import axios from '../../../config/axios'
import { receivedError } from '../../store/slices/erroHandlerSlice'
import MyCourseCard from '../../course/MyCourseCard'

const ProfileView = () => {

  const {isAuth, user} = useAppSelector(state=>state.user);
  const [allCourse, setAllCourse] = useState(Array);
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])

  const fetchAllCourse = async()=>{
    try {
      const {data} = await axios.get('/course/fetchAllCourse')
      setAllCourse(data.course)
    } catch (error:any) {
      console.log(error)
      if(error.response){
        dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
      } else{
        dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
      }
    }
  }

  

  useEffect(() => {
    fetchAllCourse()
  
    
  }, [])

  return (
  
    <div className={`w-full h-fit md:bg-[#223243] flex   p-3`}>
        <div className={`h-full w-full min-h-[50%] flex flex-col gap-5`}>
            <div className={`relative w-fit px-32 md:w-fit md:px-10 h-fit bg-[#475569] mx-auto md:mt-2 mt-32 flex flex-col md:flex-row items-center gap-2 pt-32 md:pt-2 md:justify-center pb-5 ${css.profileInfoDiv}`}>
              <div className={`absolute md:relative w-60 h-60 rounded-full bg-red-400 mx-auto md:mx-0 md:border-[#223243]  -top-32 md:top-0  ${css.dpDiv}`}>
                <img className={`w-full h-full object-cover object-center rounded-full`} src={`${isAuth? user.avatar.url :'https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png'}`} alt="" />
                
              </div>
              <div className={`flex flex-col items-center justify-center gap-2`}>

              <span className={`w-full text-center text-[#D1E1E7] text-2xl font-bold uppercase`}>{ isAuth && user.firstName} {isAuth && user.lastName}</span>
              <span className={`flex gap-2 text-[#d1e1e77a] items-center`}>
                <RiPhoneLine/><span className={`text-[#d1e1e7ce] `}>{isAuth && user.contact }</span>  <RiMapPinUserLine/> <span className={`text-[#d1e1e7ce] uppercase`}>{isAuth && user.city }</span>
              </span>
              <span className={`text-[#d1e1e7ce] flex items-center gap-2`}><RiMailLine/>{isAuth && user.email }</span>
              </div>
              
            </div>
            
            <div className={`flex items-center justify-center flex-col text-center gap-2 my-2 `}>
              <p className={`text-[#33ffff] `}>Tips</p>
              <h3>Do you know ?</h3>
              <p className={`text-[#d1e1e7ad] `}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum labore, ea ex consectetur quae explicabo suscipit neque alias magnam cupiditate vitae modi.</p>
            </div>
            <div>
      <h2 className='p-2 my-2 bg-slate-600 text-slate-300'>All Course</h2>
    </div>
    <div className={`overflow-x-auto flex mb-5`}>
      {allCourse && allCourse?.map((elem:any, ind)=>{
        return<span key={ind}>
        
        <div key={ind} className=''>
<MyCourseCard
        courseData={{
          title:elem?.title,
          price:elem?.price,
          thumbnail:elem?.thumbnail,
          chapter:elem?.chapter.length,
          category:elem?.category,
          id:elem?._id
        }}
        />
        </div>
        </span>
        
      })

      }
    </div >
    {isAuth && (
  <>
    <div>
      <h2 className='p-2 my-2 bg-slate-600 text-slate-300'>Your Creation</h2>
    </div>
    <div className={`overflow-x-auto flex mb-5`}>
      {allCourse ? (
        allCourse
          .filter((elem: any) => elem.createdBy === user._id)
          .map((elem: any, ind: number) => (
            <span key={ind}>
              <div key={ind} className=''>
                <MyCourseCard
                  courseData={{
                    title: elem?.title,
                    price: elem?.price,
                    thumbnail: elem?.thumbnail,
                    chapter: elem?.chapter.length,
                    category: elem?.category,
                    id: elem?._id
                  }}
                />
              </div>
            </span>
          ))
      ) : (
        <h1>No Course Created Yet</h1>
      )}
    </div>
  </>
)}

{isAuth && (
  <>
    <div>
      <h2 className='p-2 my-2 bg-slate-600 text-slate-300'>Subscribed Course</h2>
    </div>
    <div className={`overflow-x-auto flex mb-5`}>
      {allCourse ? (
        allCourse
          .filter((elem: any) => user.subscribedCourses.includes(elem._id))
          .map((elem: any, ind: number) => (
            <span key={ind}>
              <div key={ind} className=''>
                <MyCourseCard
                  courseData={{
                    title: elem?.title,
                    price: elem?.price,
                    thumbnail: elem?.thumbnail,
                    chapter: elem?.chapter.length,
                    category: elem?.category,
                    id: elem?._id
                  }}
                />
              </div>
            </span>
          ))
      ) : (
        <h1>No Course Buy Yet</h1>
      )}
    </div>
  </>
)}
        </div>
    </div>
    
  )
}

export default ProfileView