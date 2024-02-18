import React, { useEffect, useState } from 'react'
import SignCss from '../forms/Sign.module.css'
import { RiBook2Line, RiBookOpenLine, RiListView, RiMoneyRupeeCircleLine } from '@remixicon/react'
import { useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import axios from '../../../config/axios'

const Create = () => {
  const [courseName, setCourseName] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('');
  const { isAuth } = useAppSelector(state => state.user)
  const navigate = useNavigate();

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
  const handleCategoryChange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    setCategory(event.target.value);
  }
  const creatingCourseHandler = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData ={name:courseName, title:title, price:price, category:category}
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
                <select value={category} onChange={handleCategoryChange} required={true}>
                  <option value="" className='text-[#7F99A1]'>Select Category</option>
                  {categories.map((elem, ind)=>{
                    return(
                      <option className='text-[#7F99A1] hover:font-medium' key={ind} value={elem}>{elem}</option>
                    )
                  })}
                </select>
                <i><RiListView/></i>
                {/* <span>Course Category</span> */}
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