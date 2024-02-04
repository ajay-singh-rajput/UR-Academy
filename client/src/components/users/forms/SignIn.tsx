import React from 'react';
import SignCss from './Sign.module.css';
import { RiLock2Fill, RiMailLine, RiUserLine } from '@remixicon/react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <>
    <div className={`${SignCss.body}`}>
      <div className={`${SignCss.container}`}>
        <div className={`${SignCss.form} ${SignCss.signup}`}>
          <h2>Sign Up</h2>
          <div className={`${SignCss.inputBox}`}>
            <input type="text" required={true} />
            
            <i ><RiUserLine/></i>
            <span>username</span>
          </div>
          <div className={`${SignCss.inputBox}`}>
            <input type="text" required={true} />
            <i ><RiMailLine/></i>
            <span>email address</span>
          </div>
          <div className={`${SignCss.inputBox}`}>
            <input type="password" required={true} />
            <i ><RiLock2Fill/></i>
            <span>create password</span>
          </div>
          <div className={`${SignCss.inputBox}`}>
            <input type="password" required={true} />
            <i ><RiLock2Fill/></i>
            <span>confirm password</span>
          </div>
          <div className={`${SignCss.inputBox}`}>
            <input type="submit" value="Create Account" />
          </div>
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
