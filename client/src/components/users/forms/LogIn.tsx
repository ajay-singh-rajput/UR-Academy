import React, { useEffect, useState } from 'react';
import SignCss from './Sign.module.css';
import { RiLock2Fill, RiMailLine } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { asyncLogInUser, asyncSignUpUser } from '../../store/actions/userActions';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {isAuth} = useAppSelector(state=>state.user)
  const [verifyOtp, setVerifyOtp] = useState(false);
  const {isSuccess, message} = useAppSelector(state=> state.errorSlice);
  const [otp, setOtp] = useState('')



  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(asyncLogInUser({email:email, password:password}));
  };
  const handleOtpChange = (event:React.ChangeEvent<HTMLInputElement>) => {
     
    setOtp(event.target.value);
  };

  useEffect(() => {
    isAuth && navigate('/Profile')
    return () => {
    }
  }, [isAuth])

  useEffect(() => {
    
    if(message === 'Please verify your email address to get login' || message === 'Wrong OTP'){
      setVerifyOtp(true);
    }

  
    return () => {
    }
  }, [message])

  const handleOtpSubmit = async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    dispatch(asyncSignUpUser({otp:otp, email:email}));
  }
  
  

  return (
    <>
      <div className={`${SignCss.body}`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup}`}>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className={`${SignCss.inputBox}`}>
                <input type="text" value={email} onChange={handleEmailChange} required={true} />
                <i><RiMailLine /></i>
                <span>email address</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="password" value={password} onChange={handlePasswordChange} required={true} />
                <i><RiLock2Fill /></i>
                <span>password</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="submit" value="Log In" />
              </div>
            </form>
            <p>
              Not Registered? <Link to="/register" className={`${SignCss.create}`}>Create an account</Link>
            </p>
          </div>
        </div>
        {verifyOtp && <div className={`fixed top-0 left-0 w-full h-full ${SignCss.otpDiv} flex items-center justify-center`}>
        <div className={`${SignCss.body} w-fit h-fit `}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup}`}>
            <h2>OTP</h2>
            <form onSubmit={handleOtpSubmit} >
              <div className={`${SignCss.inputBox}`}>
                <input type="password" value={otp} onChange={handleOtpChange} required={true} />
                <i><RiMailLine /></i>
                <span>OTP</span>
              </div>
              <div className={`${SignCss.inputBox} m-auto mt-3`}>
                <input type="submit" value="Submit" />
              </div>
              
            </form>
          </div>
        </div>
      </div>
        </div>}
      </div>
    </>
  );
};

export default LogIn;
