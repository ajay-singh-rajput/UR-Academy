import React, {  useEffect, useState } from 'react';
import SignCss from '../forms/Sign.module.css'
import axios from '../../../config/axios'
import { useNavigate, useParams } from 'react-router-dom';
import UploadThumbnail from './UploadThumnail';
import { RiBallPenLine, RiFileTextLine, RiVideoAddLine } from '@remixicon/react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { receivedError } from '../../store/slices/erroHandlerSlice';

const CreateChapter = () => {
    const {courseID, thumb} = useParams();
    const [fileData, setFileData] = useState<any>();
    const [chapterID, setChapterID] = useState<String>();
    const [chapterTitle, setChapterTitle] = useState('');
    const [description, setDescription] = useState('')
    const [isVideoUploading, setIsVideoUploading] = useState(false)
    const [uploadDone, setUploadDone] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const videoFile = e.target.files[0]
          const formData = new FormData();
          formData.append('file', videoFile as File);
          console.log('Uploading file:', videoFile.name);
          try {
            setIsVideoUploading(true)
            const {data} = await axios.post(`/course/upload/file/${courseID}`,formData)
            setChapterID(data.chapterID);
            setFileData(data.data);
            console.log(data)
            setUploadDone(true)
          } catch (error:any) {
            console.log(error)
            if(error.response){
              dispatch(receivedError({isSuccess:false, message:error?.response.data.message}))
            } else{
              dispatch(receivedError({isSuccess:false, message:'unable to connect with server'}))
            }
          }
          setIsVideoUploading(false);
        
      }
    };
  
    const creatingCourseHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
        const formData = {
            title:chapterTitle,
            description:description,
            mediaLink:fileData.url
        }
        try {
            const {data} = await axios.post(`course/create-chapter/${courseID}/${chapterID}`,formData);
            console.log('aa gya data',data);
            navigate(`/Course/Course/${courseID}`);
        } catch (error) {
            console.log('create error', error)
        }
    }

    const {isAuth} = useAppSelector(state=>state.user);
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])

    return (
        <div className=''>
         {thumb !== 'false' && <UploadThumbnail data={{open: thumb, courseID:courseID}} />}
      <div>
      <div className={`${SignCss.body}`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
            <h2>Chapter Details</h2>
           {!isVideoUploading ? !uploadDone &&<div className={`${SignCss.inputBox}`}>
              <input className='w-fit h-fit' type="file" accept='video/mp4' placeholder='upload file'onChange={handleFileChange} />
              <i><RiVideoAddLine/></i>
                <span>Video</span>
              </div>
                :<div className='w-full flex flex-col items-center justify-center border-2 border-[#00dfc4] p-3 rounded-full'>
                  <p>Uploading File</p>
                <div className="w-12 h-12 rounded-full animate-spin
                    border border-solid border-yellow-500 border-t-transparent shadow-md"></div>
              </div>}
              {uploadDone && <h1 className='border-2 border-[#00dfc4] p-3 rounded-full text-[#00dfc4]'>file Uploaded Successfully</h1>}
            <form onSubmit={creatingCourseHandler} >
              <div className={`${SignCss.inputBox} md:min-w-[40vw] min-w-[85vw]`}>
                <input type="text" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} required={true} />
                <i><RiBallPenLine/></i>
                <span>Title Of Chapter</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <textarea value={description}  className={`pl-11 p-2 text-gray-200`} onChange={e => setDescription(e.target.value)}></textarea>
                <i><RiFileTextLine/></i>
                <span>Description</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="submit" value="Create Chapter" />
              </div>
            </form>
          </div>
        </div>

      </div>
      </div>
      </div>
    );
}

export default CreateChapter
