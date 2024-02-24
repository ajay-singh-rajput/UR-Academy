import style from '../../modulCss/Footer.module.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer>
        <div className={style.content}>
          <div className={style.top}>
            <div className={style.logoDetails}>
              <i className="fab ri-book-2-line"></i>
              <span className={style.logoName}>UR-Academy</span>
            </div>
            <div className={style.mediaIcons}>
              <a href="#"><i className="fab ri-facebook-fill"></i></a>
              <a href="#"><i className="fab ri-twitter-x-fill"></i></a>
              <a href="#"><i className="fab ri-instagram-fill"></i></a>
              <a href="#"><i className="fab ri-linkedin-fill"></i></a>
              <a href="#"><i className="fab ri-youtube-fill"></i></a>
            </div>
          </div>
          <div className={style.linkBoxes}>
            <ul className={style.box}>
              <li className={style.linkName}>Company</li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Contact Us">Contact us</Link></li>
              <li><Link to="/About">About us</Link></li>
              <li><Link to="/register">Get started</Link></li>
            </ul>
            <ul className={style.box}>
              <li className={style.linkName}>Services</li>
              <li><Link to="/Upload Course">Upload Course</Link></li>
              <li><Link to="/">All Course</Link></li>
              <li><Link to="/Profile">Your Course</Link></li>
              <li><Link to="#">Banner design</Link></li>
            </ul>
            <ul className={style.box}>
              <li className={style.linkName}>Account</li>
              <li><Link to="/Profile">Profile</Link></li>
              <li><Link to="/Profile">My account</Link></li>
              <li><Link to="/Profile">Purchase</Link></li>
            </ul>
            
            <ul className={`${style.box} ${style.inputBox}`}>
              <li className={style.linkName}>Subscribe</li>
              <li><input type="text" placeholder="Enter your email" /></li>
              <li><input type="button" value="Subscribe" /></li>
            </ul>
          </div>
        </div>
        <div className={style.bottomDetails}>
          <div className={style.bottomText}>
            <span className={style.copyrightText}>Copyright © 2021 <Link to="#">Ajay Rajput.</Link>All rights reserved</span>
            <span className={style.policyTerms}>
              <Link to="#">Privacy policy</Link>
              <Link to="#">Terms & conditions</Link>
            </span>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  
