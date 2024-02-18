import React, { useEffect, useState } from 'react'
import MyCourseCard from '../../course/MyCourseCard'
import ccStyle from '../../../modulCss/CreatedCourse.module.css'
import axios from '../../../config/axios'

const CreatedCourses = () => {

    const [userCreatedCourse, setUserCreatedCourse] = useState(Array)

    const getUserCreatedCourse = async ()=>{
        try {
            const {data} = await axios.post('/fetchUserCreatedCourses')
            console.log(data)
            setUserCreatedCourse(data.courses);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getUserCreatedCourse()
    
      return () => {
        
      }
    }, [])
    

  return (
    <>
        <div>
            <div className={` text-gray-300 w-screen overflow-hidden`}>
                {userCreatedCourse ?  
                <div className=' m-auto overflow-hidden border-2 border-[#334155]'>
                <div><h3 className='text-3xl p-5 bg-[#334155]'>Your Creation</h3></div>
                <div className={`${ccStyle.courseContainer}   justify-start gap-2 p-2 `}>
                {userCreatedCourse.map((elem:any, ind)=>{
                    return <MyCourseCard 
                    key={ind}
                    courseData={{
                        title:elem?.title,
                         price:elem?.price,
                         category:elem?.category ,
                         chapter:elem?.chapter.length,
                         id:elem._id,
                    }}
                    />
                    
                })}
                    
                </div>
                </div> : <div>Loading</div>}
                </div>
        </div>
    </>
  )
}

export default CreatedCourses