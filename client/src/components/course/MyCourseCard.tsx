import { useNavigate } from 'react-router-dom';
import cardCss from '../../modulCss/MyCard.module.css'
import { RiBook2Line, RiMoneyRupeeCircleLine } from '@remixicon/react';

const MyCourseCard = (props:any) => {
    const {courseData} = props;
    const navigate = useNavigate()
    const openCourse = ()=>{
        navigate(`/Course/Course/${courseData.id}`);
    }

  return (
    <>
    <div onClick={openCourse} className={`${cardCss.mainDiv} relative m-3 w-[350px] bg-[#334155] text-gray-400 rounded-2xl p-1 overflow-hidden inline-block`}>
        <div className={` rounded aspect-video bg-cover bg-no-repeat relative`}>
            <img className={`w-full h-full object-cover`}  src={courseData.thumbnail.url} alt='here us thumbnail' />
        <svg id="visual" className={`absolute top-0 left-0`} viewBox="0 0 960 540"  xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">
    <rect x="0" y="0" width="960" height="540" fill="rgba(0,18,32,0)"></rect>
    <defs>
        <linearGradient id="grad1_0" x1="43.8%" y1="100%" x2="100%" y2="0%">
            <stop offset="14.444444444444446%" stopColor="#001220" stopOpacity="1"></stop>
            <stop offset="85.55555555555554%" stopColor="#001220" stopOpacity="1"></stop>
        </linearGradient>
    </defs>
    <defs>
        <linearGradient id="grad2_0" x1="0%" y1="100%" x2="56.3%" y2="0%">
            <stop offset="14.444444444444446%" stopColor="#001220" stopOpacity="1"></stop>
            <stop offset="85.55555555555554%" stopColor="#001220" stopOpacity="1"></stop>
        </linearGradient>
    </defs>
    <g transform="translate(960, 540)">
        <path className={`${cardCss.path1}`}
            d="M-243 0C-228.1 -37.3 -213.2 -74.7 -194.9 -112.5C-176.5 -150.3 -154.6 -188.6 -121.5 -210.4C-88.4 -232.3 -44.2 -237.6 0 -243L0 0Z"
            fill="#334155"></path>
    </g>
    <g transform="translate(0, 0)">
        <path className={`${cardCss.path2}`}
            d="M243 0C224.9 35.5 206.8 70.9 188.8 109C170.8 147.1 152.9 187.7 121.5 210.4C90.1 233.2 45 238.1 0 243L0 0Z"
            fill="#334155"></path>
    </g>
</svg>
<span className={`absolute top-1 left-1 flex gap-1 text-sm items-center`}> <RiBook2Line/>{courseData.chapter} </span>
<span className={`absolute bottom-3 right-1 flex gap-1 text-xs items-center`}> <RiMoneyRupeeCircleLine/> {courseData.price}</span>

        </div>
        <div className='pl-3'>
            
    <h2 className={`text-gray-200 text-start whitespace-nowrap overflow-hidden text-ellipsis my-2`}>{courseData.title}</h2>
    <p className='text-gray-400 text-xs'>{courseData.category}</p>
        </div>
    </div>
    </>
  )
}

export default MyCourseCard