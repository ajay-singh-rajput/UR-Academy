import  { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiBook2Line, RiChat1Line, RiEye2Line, RiStarSmileLine } from '@remixicon/react'
import style from '../../../modulCss/Watch.module.css'
import { useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'

const WatchCourse = (props:any) => {

    const {isAuth} = useAppSelector(state=>state.user);
  const navigate = useNavigate()
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])

    const [openDes, setOpenDes] = useState(false)
    const {data} = props
    useEffect(()=>{
        console.log(data)
    }, [data])
  return (<> 
  <div className={`px-3 `}>
  {data ?<div className={`flex flex-col md:flex-row bg-[#223243]`}>
    <div className={` flex items-center justify-center flex-col gap-3`}>
        <h1 className={`w-full text-start pl-8 text-3xl`} >{data.title}</h1>
  <VideoPlayer data={{url:data.mediaLink}} />
  <div className={`w-full flex-col flex gap-3`}>
    <div className={`text-xs text-gray-400 flex gap-1 justify-between w-full ${style.chapterDetailsContainer}`}>
        <span><RiBook2Line/>Chapter No <span>1 </span></span> 
        <span><RiStarSmileLine/>Rating <span>4.2 </span></span>
        <span><RiEye2Line/>View <span>2.3M </span></span>
        <span><RiChat1Line/> Comments <span>12k </span></span>
        </div>
        <div>
            <div className={`w-full text-gray-300 flex gap-2 items-center`} onClick={()=>{setOpenDes(!openDes)}}>{openDes ?<RiArrowDropUpLine/> :<RiArrowDropDownLine />}<span>Description</span> </div>
            <div className={`${style.descriptionContainer} ${!openDes && 'h-0'}`}>{data.description}</div>
        </div>
  </div>
    </div>
    
  </div>:<h1>Loading</h1>}
  </div>
  </>)
}

export default WatchCourse