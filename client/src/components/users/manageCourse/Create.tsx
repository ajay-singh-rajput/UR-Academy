import React, { useEffect, useState } from 'react'
import SignCss from '../forms/Sign.module.css'
import { RiBook2Line, RiBookOpenLine, RiMoneyRupeeCircleLine } from '@remixicon/react'
import { useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import axios from '../../../config/axios'

const Create = () => {
  const [courseName, setCourseName] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const { isAuth } = useAppSelector(state => state.user)
  const navigate = useNavigate()

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(event.target.value);
  }
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }
  const creatingCourseHandler = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData ={name:courseName, title:title, price:price}
      const {data} = await axios.post('/course/create-course',formData);
      console.log('course Created', data)
      navigate(`/create-chapter/${data.course}`)
    } catch (error) {
      
    }
  }
  const checkAuth = () => {
    !isAuth && navigate('/login')
  }

  useEffect(() => {
    checkAuth();
    return () => {
    }
  }, [isAuth])


  return (

    <>
      <div className={`${SignCss.body}`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
            <h2>Course Details</h2>
            <form onSubmit={creatingCourseHandler}>
              <div className={`${SignCss.inputBox} md:min-w-[40vw] min-w-[85vw]`}>
                <input type="text" value={courseName} onChange={handleNameChange} required={true} />
                <i><RiBookOpenLine /></i>
                <span>Name Of course</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="text" value={title} onChange={handleTitleChange} required={true} />
                <i><RiBook2Line /></i>
                <span>Title</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="number" value={price} onChange={handlePriceChange} required={true} />
                <i><RiMoneyRupeeCircleLine /></i>
                <span>Price</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="submit" value="Create Course" />
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default Create