import React, { useEffect, useState } from 'react';
import SignCss from '../forms/Sign.module.css';
import { RiCloseCircleLine, RiImageCircleLine, RiPhoneLine, RiUser5Line, RiUserLine, RiUserLocationLine } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import axios from '../../../config/axios'
import {toast} from 'react-toastify'
import { activeLoading, deactivateLoading } from '../../store/slices/loadingSlice';
import { receivedError } from '../../store/slices/erroHandlerSlice';

const EditProfile = () => {
    const {isAuth, user} = useAppSelector(state=>state.user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [contact, setContact] = useState(user.contact);
    const [gender, setGender] = useState(user.gender);
    const [city, setCity] = useState(user.city);
    const dispatch = useAppDispatch()
  
    const navigate = useNavigate()
  
    const formData = {
      firstName: firstName,
      lastName:lastName,
      contact:contact,
      gender:gender,
      city:city
    }
  
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLastName(event.target.value);
    };
  
    
  
    const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContact(event.target.value);
    };
  
    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setGender(event.target.value);
    };
  
    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCity(event.target.value);
    };
  
    
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // dispatch(asyncSignUpUser(formData));
      try {
        const {data} = await axios.post(`/update-profile/${user._id}`, formData)
        toast.info(data.message)
        navigate('/Profile')
      } catch (error:any) {
        if(error.response){
          toast.error(error.response.data.message)
      } else{
          toast.error('Unable to connect with server')  
      }
      }
    };
  
    
  
    useEffect(() => {
      !isAuth && navigate('/login')
    
      return () => {
        
      }
    }, [isAuth])


    // #change dp 
    const [changeDP, setChangeDP] = useState(false)

    const uploadDPHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    }

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0]
      const formData = new FormData();
      formData.append('avatar', imageFile as File);
      console.log('Uploading file:', imageFile?.name);
      try {
        dispatch(activeLoading())
        // console.log(courseID)
        await axios.post(`/avatar-upload/${user._id}`, formData)
        setChangeDP(false)
        // console.log(data)
      } catch (error: any) {
        console.log(error)
        if (error.response) {
          dispatch(receivedError({ isSuccess: false, message: error?.response.data.message }))
        } else {
          dispatch(receivedError({ isSuccess: false, message: 'unable to connect with server' }))
        }
      }
      dispatch(deactivateLoading())

    }
  }

  // # Reset Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false)

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  }
  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  }

  const resetPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = { oldPassword: oldPassword, newPassword: newPassword,  }
      await axios.post(`/reset-password/${user._id}`, formData);
      setIsPasswordChangeOpen(false)
    } catch (error) {

    }
  }


  return (
    <>
    
<div className={`${SignCss.body}`}>
         
         <div className={`${SignCss.container}`}>
           <div className={`${SignCss.form} ${SignCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
             <h2>Change Profile Details</h2>
             <form onSubmit={handleSubmit} className={`flex flex-col gap-2`}>
               <div className={`flex md:flex-row flex-col`}>
               <div className={`${SignCss.inputBox}`}>
                 <input type="text" value={firstName} onChange={handleFirstNameChange} required={true} />
                 <i><RiUserLine /></i>
                 <span>First Name</span>
               </div>
 
               <div className={`${SignCss.inputBox}`}>
                 <input type="text" value={lastName} onChange={handleLastNameChange} required={true} />
                 <i><RiUserLine /></i>
                 <span>Last Name</span>
               </div>
               </div>
               <div className={`flex md:flex-row flex-col`}>
               <div className={`${SignCss.inputBox}`}>
                 <input type="text" value={contact} onChange={handleContactChange} required={true} />
                 <i><RiPhoneLine /></i>
                 <span>Contact</span>
               </div>
 
               <div className={`${SignCss.inputBox}`}>
                 <input type="text" value={city} onChange={handleCityChange} required={true} />
                 <i><RiUserLocationLine /></i>
                 <span>City</span>
               </div>
               </div>
 
               <div className={`flex md:flex-row flex-col`}>
 
               <div className={`${SignCss.inputBox}`}>
                 <select value={gender} onChange={handleGenderChange}>
                   <option value="" className='text-[#7F99A1] '>Select Gender</option>
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                   <option value="Other">Other</option>
                 </select>
                 <i><RiUser5Line /></i>
                 {/* <span>Gender</span> */}
               </div>
 
               
               </div>
 
                
               <div className={`${SignCss.inputBox} m-auto`}>
                 <input type="submit" value="Update Account" />
               </div>
             </form>
             
           </div>
         </div>
        
       </div>
       <div className='flex items-center justify-center text-gray-400 md:p-5 px-2 mt-3'>
        <div>
          <button onClick={()=>setChangeDP(true)} className='px-4 py-2 border-[1px] rounded-xl border-gray-400 hover:border-[#00dfc4] m-2 hover:text-[#00dfc4] active:scale-95'><i className="ri-image-add-line"></i> Change Profile</button>
          <button onClick={()=>setIsPasswordChangeOpen(true)} className='px-4 py-2 border-[1px] rounded-xl border-gray-400 hover:border-[#00dfc4] m-2 hover:text-[#00dfc4] active:scale-95'><i className="ri-key-line"></i> Reset Password</button>
        </div>
        <div>
        {changeDP && <div className='thumbnailUploadDiv absolute w-full h-screen flex items-center justify-center top-0 left-0 z-30'>
          <div className='relative'>
            <div onClick={() => setChangeDP(false)} className='absolute top-3 right-3 text-gray-400 z-30 hover:text-[#00dfc4] active:scale-95'><RiCloseCircleLine /></div>
            <div className={` ${SignCss.otpDiv} flex items-center justify-center p-8 bg-[#223243] rounded-md`}>
              <div className={`${SignCss.body} w-fit h-fit p-5`}>
                <div className={`${SignCss.container}`}>
                  <div className={`${SignCss.form} ${SignCss.signup} p-8`}>
                    <h2 className='text-gray-400'>Upload Profile Photo</h2>
                    <form onSubmit={uploadDPHandler} >
                      <div className={`${SignCss.inputBox}`}>
                        <input className='w-fit h-fit' name='avatar' type="file" accept='image' placeholder='upload file' onChange={onFileChange} />
                        <i><RiImageCircleLine /></i>
                        <span>Profile Photo</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
        {isPasswordChangeOpen && <div className={`fixed md:p-5 top-0 left-0 h-screen w-full flex items-center justify-center ${SignCss.otpDiv}`}>
          <div className='w-fit mt-[12vh] h-fit p-5 relative bg-[#223243] rounded-xl border-2 border-black'>

            <i onClick={() => setIsPasswordChangeOpen(false)} className="z-50 ri-close-circle-line absolute top-6 right-4 hover:text-[#01dfc5] text-red-400 aspect-square rounded-full text-3xl"></i>
            <div className={`${SignCss.container} bg-[#223243]`}>
              <div className={`${SignCss.form} ${SignCss.signup} md:min-w-[45vw] p-4 md:p-10`}>
                <h2>Set New Password</h2>
                <form onSubmit={resetPasswordHandler}>
                  <div className={`${SignCss.inputBox} md:min-w-[40vw] min-w-[85vw]`}>
                    <input type="password" value={oldPassword} onChange={handleOldPasswordChange} required={true} />
                    <i className="ri-key-line"></i>
                    <span>Old Password</span>
                  </div>
                  <div className={`${SignCss.inputBox}`}>
                    <input type="password" value={newPassword} onChange={handleNewPasswordChange} required={true} />
                    <i className="ri-key-line"></i>
                    <span>New Password</span>
                  </div>
                 
                 
                  <div className={`${SignCss.inputBox}`}>
                    <input type="submit" value="Update Password" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}

        </div>
       </div>
    </>
  )
}

export default EditProfile