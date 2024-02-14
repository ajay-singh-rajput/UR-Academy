import React, { useState } from 'react'
import SignCss from '../forms/Sign.module.css'
import { RiBook2Line, RiBookOpenLine, RiMoneyRupeeCircleLine } from '@remixicon/react'

const Create = () => {
    const [courseName, setCourseName] = useState('')
    const [title, setTitle] = useState('')

    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setCourseName(event.target.value);
    }
    const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.target.value);
    }
    const creatingCourseHandler = ()=>{
        
    }

  return (

    <>
    <div className={`${SignCss.body}`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
            <h2>Log In</h2>
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
                <input type="number" value={title} onChange={handleTitleChange} required={true} />
                <i><RiMoneyRupeeCircleLine /></i>
                <span>Price</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="submit" value="Log In" />
              </div>
            </form>
            
          </div>
        </div>
       
      </div>
    </>
  )
}

export default Create