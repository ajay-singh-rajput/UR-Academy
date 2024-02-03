import React, { useState } from 'react'
import navCss from '../modulCss/Nav.module.css'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'


const Navbar = () => {

  const [ariaExpend, setAriaExpend] = useState(false);

  const parentVariant = {
    initial:{
      clipPath:'polygon(100% 0, 100% 0, 100% 0, 100% 0)'
    },
    animate:{
      clipPath:'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
    },
    exit:{
      clipPath:'polygon(100% 0, 100% 0, 100% 0, 100% 0)'
    }
  }
  const parentVariant2 = {initial:{},animate:{},exit:{}}
  const menuChildren1Variant = {
    initial:{
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
    },
    animate:{
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
      
    },
    exit:{
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"

    }
  }
  const menuChildren2Variant = {
    initial:{
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
    },
    animate:{
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
      
    },
    exit:{
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"

    }
  }
  const menuChildren3Variant = {
    initial:{
      y:"-100%"
    },
    animate:{
      y:"%"
      
    },
    exit:{
      y:"-100%"

    }
  }
  


  
  return (
    <motion.nav  className={`w-screen bg-slate-700 text-cyan-50 ${navCss.navbar}`}>
      <div className='w-screen flex justify-between px-3 items-center h-14'>
        <span className={`${navCss.logo}`}>UR-Academy</span>
        <span className='flex h-[10vh] items-center gap-2'>
          <span className='hover:text-cyan-300 cursor-pointer md:block hidden'>Profile</span> 
          <NavLink   className={`bg-slate-800 p-2 px-5 md:block hidden rounded-md ${navCss.shadow} ${(e:any)=>{return e.isActive? `text-cyan-300`: ``}}`} to='/login'>Log-In</NavLink>
          <NavLink className={`bg-slate-600 p-2 px-5 md:block hidden rounded-md ${navCss.shadow}`} to='/register'>Register</NavLink>
          <button className={`${navCss.menu} ${ariaExpend? navCss.opened :``}`} onClick={()=>setAriaExpend(!ariaExpend)} aria-label="Main Menu">
      <svg width="50" height="50"  viewBox="0 0 100 100" aria-expanded={ariaExpend}>
        <path className={`${navCss.line} ${navCss.line1} hover:stroke-cyan-300`} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
        <path className={`${navCss.line} ${navCss.line2}`} d="M 20,50 H 80" />
        <path className={`${navCss.line} ${navCss.line3}`} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
      </svg>
    </button></span>
      </div>
      <motion.div variants={parentVariant} initial="initial" animate={ariaExpend?'animate':'exit'} exit='exit' transition={{ease:[0.76, 0, 0.24, 1], duration:0.4, delayChildren: 0.5, staggerChildren:0.3}} className={` ${navCss.menuDiv}  absolute top-0 left-0`}>
        <div className={`flex-col md:flex-row  flex z-10  ${navCss.menuInside}`}>
        
        <motion.div variants={menuChildren2Variant}  className='flex flex-col gap-2 w-[100%] md:w-1/2 text-slate-400 bg-slate-900'> 
        {['Profile', 'About', 'Courses', 'Contact Us'].map((elem)=>{
          return <div className='h-[100%] border-b-2 border-slate-400 p-3 pl-6'>
            <Link key={elem} className={`from-neutral-200 overflow-hidden ${navCss.linkTag}`} to={`/${elem}`}><motion.span variants={menuChildren3Variant} animate={ariaExpend?'animate':'exit'} initial="initial" exit='exit' transition={{ease:[0.76, 0, 0.24, 1], delay:1.2, duration:0.4}}>{elem}</motion.span></Link>
          </div>
        })}
         
        </motion.div>
        <motion.div variants={menuChildren1Variant} className=' md:w-1/2 w-[100%] bg-slate-400 md:h-[100%] h-1/2 text-slate-950 md:flex items-center justify-center'>
          2024
        </motion.div>
        </div>

      </motion.div>
    </motion.nav>
  )
}

export default Navbar