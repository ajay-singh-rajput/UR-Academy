import React, { useEffect, useState } from 'react'
import axios from '../../../config/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { receivedError } from '../../store/slices/erroHandlerSlice'
import WatchCourse from '../handleCourse/WatchCourse'
import signCss from '../forms/Sign.module.css'
import logo from '../../../images/logo.png'
import { toast } from 'react-toastify'

const OpenCourse = () => {
    const {isAuth, user} = useAppSelector(state=>state.user);
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
    const [isBuy, setIsBuy] = useState(false)

    const [watchCourse, setWatchCourse] = useState()
    const [OpenCourseMenu, setOpenCourseMenu] = useState(false)

    const fetchData = async ()=>{
        try {
            const {data} = await axios.post(`/fetchCourseDetails/${courseID}`);
            setCourseData(data.course);
            // console.log(data.course)
            if((user?.subscribedCourses.toString().includes(courseID)) || (data?.course.createdBy == user?._id)){
              // console.log(user?.subscribedCourses.toString(),courseID,'ek bar or true',data?.course.createdBy, true,user?._id )
              setIsBuy(true)
            }
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
      if (isBuy) {
        setIsOpenChapter(true)
        setWatchCourse(e)
      } else {
        toast.info('Buy Course to watch chapter')
      }
    }
    const deleteChapterHandler = async(chapterData:any)=>{
      try {
          const response =await axios.get(`/course/delete-chapter/${courseID}/${chapterData.id}`);
          console.log('success deleted', response)
        fetchData()
    } catch (error:any) {
        if(error.response){
            dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
          } else{
            dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
          }
    }
    }
    const deleteCourseHandler = async()=>{
      try {
          const response =await axios.get(`/course/delete-course/${courseID}`);
          console.log('success deleted', response)
          navigate(-1)
    } catch (error:any) {
        if(error.response){
            dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
          } else{
            dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
          }
    }
    }

   
    
  
    const fetchOrderId = async () => {
      try {
        const response = await axios.post(`/course/buy-course/generate-orderID/${courseID}`);
        console.log('res', response)
        const options = {
          key: 'rzp_test_8eJ3Bw4Wj5FYAd',
          amount: response.data.order.amount,
          currency: 'INR',
          name: 'UR Academy',
          description: 'Test Transaction',
          image: logo,
          order_id: response.data.order.id,
          handler: async (response:any) => {
            try {
              await axios.post(`/course/buy-course/confirm-payment/${courseID}`, { response });
              console.log('payment success')
              fetchData();
              setIsBuy(true)
              // window.location.href = '/success';
            } catch (error) {
              console.error('Payment verification failed:', error);
            }
          },
          prefill:{
            name:user.firstName,
            email:user.email,
            contact:9876543210
        },
        notes:{
            address:'UR Academy Payment Process'
        },
        theme:{
            color:'#223243'
        }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error fetching order ID:', error);
      }
    };
 

  return (
    
    <>
    <div className='text-gray-300 flex flex-wrap' >
        <div className={`flex flex-col items-center p-3 max-w-[1180px] m-auto flex-wrap justify-center`}>
            <div className='w-fit'>
              <div className='w-fit m-auto p-3 border-2 border-[#334155] rounded-md'>
                <h1 className='text-gray-400 text-xl flex items-center gap-4 mb-3'>
                 { CourseData?.createdBy === user?._id &&
                 <i 
                 onMouseEnter={()=>setOpenCourseMenu(true)} 
                 onMouseLeave={()=>setOpenCourseMenu(false)}
                 className="ri-more-2-fill relative hover:text-[#ebebeb]">
                  {OpenCourseMenu&&<span className='ease-in-out duration-300 flex w-[220px] flex-col absolute text-base font-sans p-3 bg-[#334155] rounded-md'>
                    <span className=' ease-in-out duration-300 hover:text-[#01DFC4] cursor-pointer'><i className="ri-pencil-line"></i> Edit Course</span>
                    <span onClick={deleteCourseHandler} className='ease-in-out duration-300 hover:text-red-400 cursor-pointer'><i className="ri-delete-bin-2-line"></i> Delete Course</span>
                    <span className=' ease-in-out duration-300 hover:text-[#01DFC4] cursor-pointer'><i className="ri-video-add-line"></i> Add Chapter</span>
                  </span>}
                 </i> }<i className="ri-book-2-line"></i> 
                  {CourseData?.name}</h1>
            <img className={`h-[40vh] aspect-video m-auto` } src={CourseData?.thumbnail?.url} alt={CourseData?.thumbnail?.fileId} />
                <span className='flex justify-between gap-4 mt-3'>
                { CourseData?.createdBy === user?._id &&<span className={`text-gray-400`}><i className="ri-money-rupee-circle-line text-gray-500"> Price:- </i>{CourseData?.price}</span>}
                    <span className={`text-gray-400`}><i className="ri-book-read-line text-gray-500"> Chapter:- </i>{CourseData?.chapter?.length}</span>
                    <span className={`text-gray-400`}><i className="ri-list-check text-gray-500"> Category:- </i> {CourseData?.category}</span>
                </span>
                <div className='w-full flex justify-center'>
                { !isBuy && <button className={`${signCss.buyNowBtn} px-12 py-3 rounded-lg hover:bg-[#56f8e5] active:scale-95`}
                onClick={fetchOrderId}
                > Buy Now <i className="ri-money-rupee-circle-line text-gray-500"> </i>Rs. {CourseData?.price}</button> }
                </div>
              </div>
            <div className={` p-4 text-gray-300 w-full flex flex-col gap-4`}>
                <h3 className='flex items-center gap-2 text-4xl'> {CourseData?.title}</h3>
            </div>
            </div>
        </div>
        <div className=' w-full p-6 flex flex-col gap-3'>
        { CourseData?.chapter ? CourseData.chapter.map((elem:any,ind:number)=>{
            return<div key={ind}  className='w-full '>
            <div className={`p-4 flex gap-2 justify-between text-2xl text-gray-400  cursor-pointer border-[1px] border-[#334155] hover:border-[#01DFC4] rounded-xl`}>
            <h1 className='hover:text-[#01DFC4]' onClick={()=>openChapterHandler(elem)} >
              <span>{ind + 1}. </span> 
              <i className="ri-play-circle-line hover:text-[#01DFC4]"></i>
               {elem.title}
               </h1>
               { CourseData?.createdBy === user?._id &&
            <span className='flex gap-3'>
            <i title='Edit Chapter' className="ri-edit-box-line hover:text-[#01DFC4]"></i>
            <i onClick={()=>deleteChapterHandler(elem)} title='Delete Chapter' className="ri-delete-bin-5-line hover:text-red-400"></i>
            </span>}
            </div>
            
        </div>
        })
         : <h1>No Chapter</h1> }
         </div>
         {isOpenChapter && <div className={`fixed md:p-5 top-0 left-0 h-screen w-full flex items-center justify-center ${signCss.otpDiv}`}>
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