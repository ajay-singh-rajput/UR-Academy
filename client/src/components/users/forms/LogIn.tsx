import React, { useEffect, useState } from 'react';
import SignCss from './Sign.module.css';
import { RiLock2Fill, RiMailLine } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { asyncLogInUser } from '../../store/actions/userActions';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {isAuth} = useAppSelector(state=>state.user)


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
      </div>
    </>
  );
};

export default LogIn;
