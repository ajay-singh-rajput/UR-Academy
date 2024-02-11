import React, { useEffect, useState } from 'react';
import SignCss from './Sign.module.css';
import { RiFile2Line, RiLock2Fill, RiMailLine, RiPhoneLine, RiUser5Line, RiUserLine, RiUserLocationLine } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSignUpUser } from '../../store/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../store/store';

const SignIn = () => {
  const dispatch = useAppDispatch()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [accountType, setAccountType] = useState('');

  const {isAuth} = useAppSelector(state=>state.user);
  const navigate = useNavigate()

  const formData = {
    firstName: firstName,
    lastName:lastName,
    email:email,
    password:password,
    contact:contact,
    gender:gender,
    city:city,
    accountType:accountType
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
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

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData)
    dispatch(asyncSignUpUser(formData));
   
  };
  useEffect(() => {
    isAuth && navigate('/Profile')
  
    return () => {
      
    }
  }, [isAuth])

  return (
    <>
      <div className={`${SignCss.body}`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup}`}>
            <h2>Sign Up</h2>
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
                <input type="email" value={email} onChange={handleEmailChange} required={true} />
                <i><RiMailLine /></i>
                <span>Email</span>
              </div>


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

              <div className={`flex md:flex-row flex-col`}>

              <div className={`${SignCss.inputBox}`}>
                <input type="password" value={password} onChange={handlePasswordChange} required={true} />
                <i><RiLock2Fill /></i>
                <span>Create Password</span>
              </div>
              
              <div className={`${SignCss.inputBox}`}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required={true}
                  />
                <i><RiLock2Fill /></i>
                <span>Confirm Password</span>
              </div>
              
                  </div>


                  <div className={`${SignCss.inputBox}`}>
                <select value={accountType} onChange={handleAccountTypeChange}>
                  <option value="">Select Account Type</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
                <i><RiFile2Line /></i>
                {/* <span>Account Type</span> */}
              </div>
               
              <div className={`${SignCss.inputBox} m-auto`}>
                <input type="submit" value="Create Account" />
              </div>
            </form>
            <p>
              Already a member ? <Link to="/login" className={`${SignCss.login}`}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
