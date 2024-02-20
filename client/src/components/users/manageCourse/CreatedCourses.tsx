import React, { useEffect, useState } from 'react'
import MyCourseCard from '../../course/MyCourseCard'
import ccStyle from '../../../modulCss/CreatedCourse.module.css'
import axios from '../../../config/axios'
import { useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'

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
       <div >
    <div className="text-gray-300 w-screen overflow-hidden relative">
        {userCreatedCourse ? (
            <div className=" border-2 border-[#334155] overflow-hidden w-full">
                <h3 className="text-3xl p-5 w-full bg-[#334155]">Your Creation</h3>
                <div className="overflow-x-auto ">
                    {userCreatedCourse.map((elem: any, ind: number) => (
                        <MyCourseCard
                            key={ind}
                            courseData={{
                                title: elem?.title,
                                price: elem?.price,
                                category: elem?.category,
                                chapter: elem?.chapter.length,
                                id: elem._id,
                                thumbnail:elem?.thumbnail
                            }}
                        />
                    ))}
                </div>
            </div>
        ) : (
            <div></div>
        )}
    </div>
    
</div>

    </>
  )
}

export default CreatedCourses