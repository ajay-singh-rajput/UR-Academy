import React, { useEffect, useState } from 'react'
import axios from '../../../config/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { receivedError } from '../../store/slices/erroHandlerSlice'
import WatchCourse from '../handleCourse/WatchCourse'
import signCss from '../forms/Sign.module.css'
import logo from '../../../images/logo.png'
import { toast } from 'react-toastify'
import UploadThumbnail from './UploadThumnail'
import { activeLoading, deactivateLoading } from '../../store/slices/loadingSlice'
import { RiBallPenLine, RiBook2Line, RiBookOpenLine, RiCloseCircleLine, RiFileTextLine, RiImageCircleLine, RiListView, RiMoneyRupeeCircleLine } from '@remixicon/react'

const OpenCourse = () => {
  const { isAuth, user } = useAppSelector(state => state.user);
  const navigate = useNavigate()
  const checkUserAuth = () => {
    !isAuth && navigate('/login')
  }
  useEffect(() => {
    checkUserAuth();
  }, [isAuth])

  const { courseID } = useParams()
  const [CourseData, setCourseData] = useState(Object);
  const dispatch = useAppDispatch()
  const [isOpenChapter, setIsOpenChapter] = useState(false)
  const [isBuy, setIsBuy] = useState(false)

  const [watchCourse, setWatchCourse] = useState()
  const [OpenCourseMenu, setOpenCourseMenu] = useState(false)
  const [changeThumbnail, setChangeThumbnail] = useState(false)
  const [changeCourseDetails, setChangeCourseDetails] = useState(false)
  const [changeChapterDetails, setChangeChapterDetails] = useState(false)

  const fetchData = async () => {
    try {
      const { data } = await axios.post(`/fetchCourseDetails/${courseID}`);
      setCourseData(data.course || '');
      setCourseName(data.course.name || '');
      setTitle(data.course.title || '');
      setPrice(data.course.price || '');
      setCategory(data.course.category || '')
      if ((user?.subscribedCourses.toString().includes(courseID)) || (data?.course.createdBy == user?._id)) {
        setIsBuy(true)
      }
    } catch (error: any) {
      if (error.response) {
        dispatch(receivedError({ isSuccess: false, message: error?.response.data.message }))
      } else {
        dispatch(receivedError({ isSuccess: false, message: 'unable to connect with server' }))
      }
    }
  }

  useEffect(() => {
    fetchData()
    return () => { }
  }, [])

  const openChapterHandler = (e: any) => {
    if (isBuy) {
      setIsOpenChapter(true)
      setWatchCourse(e)
    } else {
      toast.info('Buy Course to watch chapter')
    }
  }
  const deleteChapterHandler = async (chapterData: any) => {
    try {
      const response = await axios.get(`/course/delete-chapter/${courseID}/${chapterData.id}`);
      console.log('success deleted', response)
      fetchData()
    } catch (error: any) {
      if (error.response) {
        dispatch(receivedError({ isSuccess: false, message: error?.response.data.message }))
      } else {
        dispatch(receivedError({ isSuccess: false, message: 'unable to connect with server' }))
      }
    }
  }
  const deleteCourseHandler = async () => {
    try {
      const response = await axios.get(`/course/delete-course/${courseID}`);
      console.log('success deleted', response)
      navigate(-1)
    } catch (error: any) {
      if (error.response) {
        dispatch(receivedError({ isSuccess: false, message: error?.response.data.message }))
      } else {
        dispatch(receivedError({ isSuccess: false, message: 'unable to connect with server' }))
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
        handler: async (response: any) => {
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
        prefill: {
          name: user.firstName,
          email: user.email,
          contact: 9876543210
        },
        notes: {
          address: 'UR Academy Payment Process'
        },
        theme: {
          color: '#223243'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error fetching order ID:', error);
    }
  };


  //# change Thumbnail 


  const uploadThumbnailHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0]
      const formData = new FormData();
      formData.append('avatar', imageFile as File);
      console.log('Uploading file:', imageFile?.name);
      try {
        dispatch(activeLoading())
        // console.log(courseID)
        await axios.post(`/course/thumbnail-upload/${courseID}`, formData)
        setChangeThumbnail(false)
        fetchData()
        // console.log(data)
      } catch (error: any) {
        console.log(error)
        if (error.response) {
          dispatch(receivedError({ isSuccess: false, message: error?.response.data.message }))
        } else {
          dispatch(receivedError({ isSuccess: false, message: 'unable to connect with server' }))
        }
      }
      dispatch(deactivateLoading())

    }
  }


  // # change Course Details
  const [courseName, setCourseName] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('');

  let categories = [
    "Art & Design",
    "Business",
    "Computer Science",
    "Data Science",
    "Engineering",
    "Health & Medicine",
    "Humanities",
    "Language Learning",
    "Mathematics",
    "Music",
    "Personal Development",
    "Physical Science and Engineering",
    "Social Sciences",
    "Life Sciences",
    "Environmental Studies",
    "Education & Teaching",
    "Law",
    "Economics & Finance",
    "Physics",
    "Chemistry",
    "Biology",
    "Psychology",
    "Philosophy",
    "Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Aerospace Engineering",
    "Electrical Engineering",
    "Robotics",
    "Machine Learning",
    "Artificial Intelligence",
    "Game Development",
    "Mobile Development",
    "Web Development",
    "Cloud Computing",
    "Cybersecurity",
    "Blockchain",
    "Digital Marketing",
    "Graphic Design",
    "User Experience Design",
    "Fashion Design",
    "Interior Design",
    "Photography",
    "Film Making",
    "Animation",
    "Video Editing",
    "Content Writing",
    "Creative Writing",
    "Journalism",
    "Music Production",
    "Music Theory",
    "Health & Nutrition",
    "Fitness & Yoga",
    "Meditation & Mindfulness",
    "Dance",
    "Drawing & Painting",
    "Sculpting & Pottery",
    "Woodworking & Metalworking",
    "Languages",
    "Literature",
    "History",
    "Archaeology",
    "Religion & Mythology",
    "Politics & Government",
    "Sociology & Anthropology",
    "Geography",
    "Economics & Business Administration",
    "Marketing & Management",
    "Finance & Accounting",
    "Healthcare Management",
    "Public Health",
    "Medicine & Nursing",
    "Psychology & Counseling",
    "Social Work",
    "Child Development & Family Studies",
    "Environmental Science",
    "Astronomy & Astrophysics",
    "Mathematics & Statistics"
  ];




  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(event.target.value);
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  }
  const creatingCourseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = { name: courseName, title: title, price: price, category: category }
      await axios.post(`/course/edit-course/${courseID}`, formData);
      fetchData();
      setChangeCourseDetails(false)
    } catch (error) {

    }
  }

  // # chapter details edit
  const changeChapterDetailsHandler = (elem:any)=>{
    console.log('clicked')
    setChangeChapterDetails(true)
    setChapterID(elem.id);
    setDescription(elem.description)
    setChapterTitle(elem.title)
    setMediaLink(elem.mediaLink)
  }
  
  const [mediaLink, setMediaLink] = useState<any>();
  const [chapterID, setChapterID] = useState<String>();
  const [chapterTitle, setChapterTitle] = useState('');
  const [description, setDescription] = useState('')

 

  const creatingChapterHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
      const formData = {
          title:chapterTitle,
          description:description,
          mediaLink:mediaLink
      }
      try {
          const {data} = await axios.post(`course/edit-chapter/${courseID}/${chapterID}`,formData);
          console.log('aa gya data',data);
          setChangeChapterDetails(false)
          // navigate(`/Course/Course/${courseID}`);
      } catch (error) {
          console.log('create error', error)
      }
  }

  return (

    <>
      <div className='text-gray-300 flex flex-wrap' >
        <div className={`flex flex-col items-center p-3 max-w-[1180px] m-auto flex-wrap justify-center`}>
          <div className='w-fit'>
            <div className='w-fit m-auto p-3 border-2 border-[#334155] rounded-md'>
              <h1 className='text-gray-400 text-xl flex items-center gap-4 mb-3'>
                {CourseData?.createdBy === user?._id &&
                  <i
                    onMouseEnter={() => setOpenCourseMenu(true)}
                    onMouseLeave={() => setOpenCourseMenu(false)}
                    className="ri-more-2-fill relative hover:text-[#ebebeb]">
                    {OpenCourseMenu && <span className='ease-in-out duration-300 flex w-[220px] flex-col absolute text-base font-sans p-3 bg-[#334155] rounded-md'>
                      <span onClick={()=>setChangeCourseDetails(true)} className=' ease-in-out duration-300 hover:text-[#01DFC4] cursor-pointer'><i className="ri-pencil-line"></i> Edit Course</span>
                      <span onClick={() => setChangeThumbnail(true)} className=' ease-in-out duration-300 hover:text-[#01DFC4] cursor-pointer'><i className="ri-image-add-fill"></i> Change Thumbnail</span>
                      <span 
                      onClick={()=>navigate(`/create-chapter/${courseID}/false`)} 
                      className='ease-in-out duration-300 hover:text-[#01DFC4] cursor-pointer'><i className="ri-video-add-line"></i> Add Chapter</span>
                      <span onClick={deleteCourseHandler} className='ease-in-out duration-300 hover:text-red-400 cursor-pointer'><i className="ri-delete-bin-2-line"></i> Delete Course</span>
                    </span>}
                  </i>}<i className="ri-book-2-line"></i>
                {CourseData?.name}</h1>
              <img className={`h-[40vh] aspect-video m-auto`} src={CourseData?.thumbnail?.url} alt={CourseData?.thumbnail?.fileId} />
              <span className='flex justify-between gap-4 mt-3'>
                {CourseData?.createdBy === user?._id && <span className={`text-gray-400`}><i className="ri-money-rupee-circle-line text-gray-500"> Price:- </i>{CourseData?.price}</span>}
                <span className={`text-gray-400`}><i className="ri-book-read-line text-gray-500"> Chapter:- </i>{CourseData?.chapter?.length}</span>
                <span className={`text-gray-400`}><i className="ri-list-check text-gray-500"> Category:- </i> {CourseData?.category}</span>
              </span>
              <div className='w-full flex justify-center'>
                {!isBuy && <button className={`${signCss.buyNowBtn} px-12 py-3 rounded-lg hover:bg-[#56f8e5] active:scale-95`}
                  onClick={fetchOrderId}
                > Buy Now <i className="ri-money-rupee-circle-line text-gray-500"> </i>Rs. {CourseData?.price}</button>}
              </div>
            </div>
            <div className={` p-4 text-gray-300 w-full flex flex-col gap-4`}>
              <h3 className='flex items-center gap-2 text-4xl'> {CourseData?.title}</h3>
            </div>
          </div>
        </div>
        <div className=' w-full p-6 flex flex-col gap-3'>
          {CourseData?.chapter ? CourseData.chapter.map((elem: any, ind: number) => {
            return <div key={ind} className='w-full '>
              <div className={`p-4 flex gap-2 justify-between text-2xl text-gray-400  cursor-pointer border-[1px] border-[#334155] hover:border-[#01DFC4] rounded-xl`}>
                <h1 className='hover:text-[#01DFC4]' onClick={() => openChapterHandler(elem)} >
                  <span>{ind + 1}. </span>
                  <i  className="ri-play-circle-line hover:text-[#01DFC4]"></i>
                  {elem.title}
                </h1>
                {CourseData?.createdBy === user?._id &&
                  <span className='flex gap-3'>
                    <i onClick={()=>{changeChapterDetailsHandler(elem)}} title='Edit Chapter' className="ri-edit-box-line hover:text-[#01DFC4]"></i>
                    <i onClick={() => deleteChapterHandler(elem)} title='Delete Chapter' className="ri-delete-bin-5-line hover:text-red-400"></i>
                  </span>}
              </div>

            </div>
          })
            : <h1>No Chapter</h1>}
        </div>

        {isOpenChapter && <div className={`fixed md:p-5 top-0 left-0 h-screen w-full flex items-center justify-center ${signCss.otpDiv}`}>
          <div className='w-fit mt-[12vh] h-fit p-5 relative bg-[#223243] rounded-xl border-2 border-black'>

            <i onClick={() => setIsOpenChapter(false)} className="z-50 ri-close-circle-line absolute top-6 right-4 hover:text-[#01dfc5] text-red-400 aspect-square rounded-full text-3xl"></i>
            <WatchCourse data={watchCourse} />
          </div>
        </div>}

        {changeThumbnail && <div className='thumbnailUploadDiv absolute w-full h-screen flex items-center justify-center top-0 left-0 z-30'>
          <div className='relative'>
            <div onClick={() => setChangeThumbnail(false)} className='absolute top-3 right-3 text-gray-400 z-30 hover:text-[#00dfc4] active:scale-95'><RiCloseCircleLine /></div>
            <div className={` ${signCss.otpDiv} flex items-center justify-center p-8 bg-[#223243] rounded-md`}>
              <div className={`${signCss.body} w-fit h-fit p-5`}>
                <div className={`${signCss.container}`}>
                  <div className={`${signCss.form} ${signCss.signup} p-8`}>
                    <h2 className='text-gray-400'>Upload Thumbnail</h2>
                    <form onSubmit={uploadThumbnailHandler} >
                      <div className={`${signCss.inputBox}`}>
                        <input className='w-fit h-fit' name='avatar' type="file" accept='image' placeholder='upload file' onChange={onFileChange} />
                        <i><RiImageCircleLine /></i>
                        <span>Course Thumbnail</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}

        {changeCourseDetails && <div className={`fixed md:p-5 top-0 left-0 h-screen w-full flex items-center justify-center ${signCss.otpDiv}`}>
          <div className='w-fit mt-[12vh] h-fit p-5 relative bg-[#223243] rounded-xl border-2 border-black'>

            <i onClick={() => setChangeCourseDetails(false)} className="z-50 ri-close-circle-line absolute top-6 right-4 hover:text-[#01dfc5] text-red-400 aspect-square rounded-full text-3xl"></i>
            <div className={`${signCss.container} bg-[#223243]`}>
              <div className={`${signCss.form} ${signCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
                <h2>Course Details</h2>
                <form onSubmit={creatingCourseHandler}>
                  <div className={`${signCss.inputBox} md:min-w-[40vw] min-w-[85vw]`}>
                    <input type="text" value={courseName} onChange={handleNameChange} required={true} />
                    <i><RiBookOpenLine /></i>
                    <span>Name Of course</span>
                  </div>
                  <div className={`${signCss.inputBox}`}>
                    <input type="text" value={title} onChange={handleTitleChange} required={true} />
                    <i><RiBook2Line /></i>
                    <span>Title</span>
                  </div>
                  <div className={`${signCss.inputBox}`}>
                    <input type="number" value={price} onChange={handlePriceChange} required={true} />
                    <i><RiMoneyRupeeCircleLine /></i>
                    <span>Price</span>
                  </div>
                  <div className={`${signCss.inputBox}`}>
                    <select value={category} onChange={handleCategoryChange} required={true}>
                      <option value="" className='text-[#7F99A1]'>Select Category</option>
                      {categories.map((elem, ind) => {
                        return (
                          <option className='text-[#7F99A1] hover:font-medium' key={ind} value={elem}>{elem}</option>
                        )
                      })}
                    </select>
                    <i><RiListView /></i>
                    {/* <span>Course Category</span> */}
                  </div>
                  <div className={`${signCss.inputBox}`}>
                    <input type="submit" value="Create Course" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}
        {changeChapterDetails && <div className={`fixed md:p-5 top-0 left-0 h-screen w-full flex items-center justify-center ${signCss.otpDiv}`}>
          <div className='w-fit mt-[12vh] h-fit p-5 relative bg-[#223243] rounded-xl border-2 border-black'>

            <i onClick={() => setChangeChapterDetails(false)} className="z-50 ri-close-circle-line absolute top-6 right-4 hover:text-[#01dfc5] text-red-400 aspect-square rounded-full text-3xl"></i>
            <div className={`${signCss.container}`}>
          <div className={`${signCss.form} ${signCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
            <h2>Chapter Details</h2>
          
            <form onSubmit={creatingChapterHandler} >
              <div className={`${signCss.inputBox} md:min-w-[40vw] min-w-[85vw]`}>
                <input type="text" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} required={true} />
                <i><RiBallPenLine/></i>
                <span>Title Of Chapter</span>
              </div>
              <div className={`${signCss.inputBox}`}>
                <textarea value={description}  className={`pl-11 p-2 text-gray-200`} onChange={e => setDescription(e.target.value)}></textarea>
                <i><RiFileTextLine/></i>
                <span>Description</span>
              </div>
              <div className={`${signCss.inputBox}`}>
                <input type="submit" value="Create Chapter" />
              </div>
            </form>
          </div>
        </div>
          </div>
        </div>}

      </div>
    </>
  )
}

export default OpenCourse