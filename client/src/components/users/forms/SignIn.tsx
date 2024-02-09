import React, { useState } from 'react';
import SignCss from './Sign.module.css';
import { RiLock2Fill, RiMailLine, RiUserLine } from '@remixicon/react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <>
      <div className={`${SignCss.body}`}>
        <div className={`${SignCss.container}`}>
          <div className={`${SignCss.form} ${SignCss.signup}`}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className={`flex flex-col gap-2`}>
              <div className={`flex flex-col md:flex-row g-2 relative`}>
              <div className={`${SignCss.inputBox}`}>
                <input type="text" value={username} onChange={handleUsernameChange} required={true} />
                <i><RiUserLine /></i>
                <span>First Name</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input type="text" value={username} onChange={handleUsernameChange} required={true} />
                <i ><RiUserLine /></i>
                <span>Last Name</span>
              </div>
              </div>
              
              <div className={`${SignCss.inputBox}`}>
                <input type="text" value={email} onChange={handleEmailChange} required={true} />
                <i><RiMailLine /></i>
                <span>email address</span>
              </div>
              <div className={`flex flex-col md:flex-row g-2 relative`}>
              <div className={`${SignCss.inputBox}`}>
                <input type="password" value={password} onChange={handlePasswordChange} required={true} />
                <i><RiLock2Fill /></i>
                <span>create password</span>
              </div>
              <div className={`${SignCss.inputBox}`}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required={true}
                />
                <i><RiLock2Fill /></i>
                <span>confirm password</span>
              </div>
              </div>
              <div className={`${SignCss.inputBox}`}>
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
