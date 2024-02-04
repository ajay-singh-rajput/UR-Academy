import React from 'react';
import SignCss from './Sign.module.css';
import { RiLock2Fill, RiMailLine, RiUserLine } from '@remixicon/react';
import { Link } from 'react-router-dom';


const LogIn = () => {
  return (
    <>
    <div className={`${SignCss.body}`}>
      <div className={`${SignCss.container}`}>
        <div className={`${SignCss.form} ${SignCss.signup}`}>
          <h2>Log In</h2>
          
          <div className={`${SignCss.inputBox}`}>
            <input type="text" required={true} />
            <i ><RiMailLine/></i>
            <span>email address</span>
          </div>
          
          <div className={`${SignCss.inputBox}`}>
            <input type="password" required={true} />
            <i ><RiLock2Fill/></i>
            <span>password</span>
          </div>
          <div className={`${SignCss.inputBox}`}>
            <input type="submit" value="Create Account" />
          </div>
          <p>
            Not Registered ? <Link to="/register" className={`${SignCss.create}`}>Create an account</Link>
          </p>
        </div>
      </div>
      </div>
    </>
  )
}

export default LogIn