import { RiCloseCircleLine, RiImageCircleLine } from '@remixicon/react'
import React, { useEffect, useState } from 'react'
import SignCss from '../forms/Sign.module.css'
import axios from '../../../config/axios'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { activeLoading, deactivateLoading } from '../../store/slices/loadingSlice'
import { receivedError } from '../../store/slices/erroHandlerSlice'
import { useNavigate } from 'react-router-dom'

const UploadThumbnail = (props:any) => {

  const [close, setClose] = useState(true)
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch()
  

    const uploadThumbnailHandler = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
    const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>)=>{
      console.log('file change')
      if (e.target.files && e.target.files.length > 0) {
        console.log('file change b')
        setFile(e.target.files[0]);
        const imageFile = e.target.files[0]
        console.log('file change c')
          const formData = new FormData();
          formData.append('avatar', imageFile as File);
          console.log('Uploading file:', imageFile?.name);
          try {
            dispatch(activeLoading())
            console.log(props.data.courseID)
              const {data} = await axios.post(`/course/thumbnail-upload/${props.data.courseID}`,formData)
              setClose(false)
              console.log(data)
          } catch (error:any) {
              console.log(error)
              if(error.response){
                dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
            } else{
                dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
            }
          }
          dispatch(deactivateLoading())
      
      }
    }
    
    const {isAuth} = useAppSelector(state=>state.user);
  const navigate = useNavigate()
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])
    
   
  return (
    <>
    {close && <div className='thumbnailUploadDiv absolute w-full h-screen flex items-center justify-center top-0 left-0 z-30'>
        <div className='relative'>
      <div onClick={()=>setClose(false)} className='absolute top-3 right-3 text-gray-400 z-30 hover:text-[#00dfc4] active:scale-95'><RiCloseCircleLine/></div>
        <div className={` ${SignCss.otpDiv} flex items-center justify-center p-8 bg-[#223243] rounded-md`}>
        <div className={`${SignCss.body} w-fit h-fit p-5`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup} p-8`}>
            <h2 className='text-gray-400'>Upload Thumbnail</h2>
            <form onSubmit={uploadThumbnailHandler} >
              <div className={`${SignCss.inputBox}`}>
              <input className='w-fit h-fit' name='avatar' type="file" accept='image' placeholder='upload file' onChange={onFileChange}/>
              <i><RiImageCircleLine/></i>
                <span>Course Thumbnail</span>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
        </div>
    </div>}
    </>
  )
}

export default UploadThumbnail