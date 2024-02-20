import React, { useEffect, useState } from 'react'
import axios from '../../../config/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { receivedError } from '../../store/slices/erroHandlerSlice'
import WatchCourse from '../handleCourse/WatchCourse'
import signCss from '../forms/Sign.module.css'

const OpenCourse = () => {
    const {isAuth} = useAppSelector(state=>state.user);
  const navigate = useNavigate()
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])
    
    const {courseID} = useParams()
    const [CourseData, setCourseData] = useState(Object);
    const dispatch = useAppDispatch()
    const [isOpenChapter, setIsOpenChapter] = useState(false)

    const [watchCourse, setWatchCourse] = useState()

    const fetchData = async ()=>{
        try {
            const {data} = await axios.post(`/fetchCourseDetails/${courseID}`);
            setCourseData(data.course);
            console.log(data.course)
        } catch (error:any) {
            if(error.response){
                dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
              } else{
                dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
              }
        }
    }

    useEffect(() => {
      fetchData()
      return () => { }
    }, [])

    const openChapterHandler = (e:any)=>{
        setIsOpenChapter(true)
        setWatchCourse(e)
    }
    

  return (
    
    <>
    <div className='text-gray-300 flex flex-wrap' >
        <div className={`flex flex-col items-center p-3 max-w-[1180px] m-auto flex-wrap justify-center`}>
            <div className='w-fit'>
            <img className={`h-[40vh] aspect-video`} src={CourseData?.thumbnail?.url} alt={CourseData?.thumbnail?.fileId} />
            <div className={` p-4 text-gray-300  flex flex-col gap-4`}>
                <span className='flex justify-between gap-4'>
                    <span className={`text-gray-400`}><i className="ri-money-rupee-circle-line text-gray-500"> Price:- </i>{CourseData?.price}</span>
                    <span className={`text-gray-400`}><i className="ri-book-read-line text-gray-500"> Chapter:- </i>{CourseData?.chapter?.length}</span>
                    <span className={`text-gray-400`}><i className="ri-list-check text-gray-500"> Category:- </i> {CourseData?.category}</span>
                </span>
                <h3 className='flex items-center gap-2 text-4xl'> {CourseData?.title}</h3>
                <h1 className='text-gray-400 text-xl flex items-center gap-4'><i className="ri-book-2-line"></i> {CourseData?.name}</h1>
            </div>
            </div>
        </div>
        <div className='md:w-1/2 w-full py-3 pr-3'>
        { CourseData?.chapter ? CourseData.chapter.map((elem:any,ind:number)=>{
            return<div key={ind} onClick={()=>openChapterHandler(elem)} className='w-full'>
            <div className={`p-4 flex gap-2 text-4xl text-gray-400 hover:text-[#01DFC4] cursor-pointer hover:border-[1px] border-2 border-gray-800 hover:border-[#01DFC4] rounded-xl`}>
            <i className="ri-play-circle-line"></i><h1>{elem.title}</h1>
            </div>
        </div>
        })
         : <h1>No Chapter</h1> }
         </div>
         {isOpenChapter && <div className={`absolute top-0 left-0 h-screen w-full flex items-center justify-center ${signCss.otpDiv}`}>
            <div className='w-fit mt-[12vh] h-fit p-5 relative bg-[#223243] rounded-xl border-2 border-black'>

         <i onClick={()=>setIsOpenChapter(false)} className="z-50 ri-close-circle-line absolute top-6 right-4 hover:text-[#01dfc5] text-red-400 aspect-square rounded-full text-3xl"></i>
            <WatchCourse data={watchCourse}/>
            </div>
         </div>}
    </div>
    </>
  )
}

export default OpenCourse