import React from 'react';
import style from '../../modulCss/Footer.module.css'

const Footer = () => {
    return (
      <footer>
        <div className={style.content}>
          <div className={style.top}>
            <div className={style.logoDetails}>
              <i className="fab fa-slack"></i>
              <span className={style.logoName}>CodingStella</span>
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
              <li><a href="#">Home</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Get started</a></li>
            </ul>
            <ul className={style.box}>
              <li className={style.linkName}>Services</li>
              <li><a href="#">App design</a></li>
              <li><a href="#">Web design</a></li>
              <li><a href="#">Logo design</a></li>
              <li><a href="#">Banner design</a></li>
            </ul>
            <ul className={style.box}>
              <li className={style.linkName}>Account</li>
              <li><a href="#">Profile</a></li>
              <li><a href="#">My account</a></li>
              <li><a href="#">Preferences</a></li>
              <li><a href="#">Purchase</a></li>
            </ul>
            <ul className={style.box}>
              <li className={style.linkName}>Courses</li>
              <li><a href="#">HTML & CSS</a></li>
              <li><a href="#">JavaScript</a></li>
              <li><a href="#">Photography</a></li>
              <li><a href="#">Photoshop</a></li>
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
            <span className={style.copyrightText}>Copyright © 2021 <a href="#">CodingLab.</a>All rights reserved</span>
            <span className={style.policyTerms}>
              <a href="#">Privacy policy</a>
              <a href="#">Terms & conditions</a>
            </span>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  
