import React, { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiBook2Line, RiChat1Line, RiEye2Line, RiStarSmileLine, RiTimeLine } from '@remixicon/react'
import style from '../../../modulCss/Watch.module.css'

const WatchCourse = () => {
    const [openDes, setOpenDes] = useState(false)
  return (<> 
  <div className={`px-3 `}>
  <div className={`flex flex-col md:flex-row `}>
    <div className={`w-2/3 flex items-center justify-center flex-col gap-3`}>
        <h1 className={`w-full text-start pl-8 text-3xl`} >Here come the video title</h1>
  <VideoPlayer />
  <div className={`w-3/4 flex-col flex gap-3`}>
    <div className={`text-xs text-gray-400 flex gap-1 justify-between w-full ${style.chapterDetailsContainer}`}>
        <span><RiBook2Line/>Chapter No <span>1 </span></span> 
        <span><RiStarSmileLine/>Rating <span>4.2 </span></span>
        <span><RiEye2Line/>View <span>2.3M </span></span>
        <span><RiChat1Line/> Comments <span>12k </span></span>
        </div>
        <div>
            <div className={`w-full text-gray-300 flex gap-2 items-center`} onClick={()=>{setOpenDes(!openDes)}}>{openDes ?<RiArrowDropUpLine/> :<RiArrowDropDownLine />}<span>Description</span> </div>
            <div className={`${style.descriptionContainer} ${!openDes && 'h-0'}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eveniet asperiores possimus incidunt excepturi nostrum id error voluptatibus voluptatem necessitatibus distinctio minima dolorum, cupiditate quo quibusdam aperiam neque molestiae deleniti. Commodi vel provident laborum. Commodi, labore soluta! Modi, cum. Optio veniam eum iste maxime, possimus voluptas perspiciatis excepturi, voluptates quo quibusdam magnam, id fugit. Harum.</div>
        </div>
  </div>
    </div>
    <div className={`w-1/3 flex  justify-center`}>
        <div className={`${style.chapterListContainer} w-full text-gray-400 `}>
            <h3 className={`text-gray-400 p-2`}>All Chapter</h3>
            <div className={`p-2 flex flex-col gap-3`}>
                <div className={` flex gap-2 border-2 p-1 border-[#8080802d]`}>
                    <div className={`h-24 w-36 bg-[url("https://www.adobe.com/express/create/thumbnail/media_184a3a28ded5926b56142bf7f41b1c6972df38f0c.png?width=750&format=png&optimize=medium")] bg-cover`}></div>
                    <div className={`h-full flex flex-col justify-between`}>
                    <p className={`text-sm `}>chapter title</p>
                    <span className={`flex gap-3 text-xs w-full text-end`}><RiTimeLine/> 2:25</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
  </div>
  </div>
  </>)
}

export default WatchCourse