import React, { useState } from 'react'
import navCss from '../modulCss/Nav.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [ariaExpend, setAriaExpend] = useState(false)

  const isActive = (e:any)=>{
    console.log(e)
  }

  
  return (
    <nav className={`w-screen fixed bg-slate-700 text-cyan-50 ${navCss.navbar}`}>
      <div className='w-screen flex justify-between px-3 items-center h-14'>
        <span className={`${navCss.logo}`}>UR-Academy</span>
        <span className='flex h-[10vh] items-center gap-2'>
          <span className='hover:text-cyan-300 cursor-pointer md:visible hidden'>Profile</span> 
          <NavLink   className={`bg-slate-800 p-2 px-5 md:visible hidden rounded-md ${navCss.shadow} ${(e:any)=>{return e.isActive? `text-cyan-300`: ``}}`} to='/login'>Log-In</NavLink>
          <NavLink className={`bg-slate-600 p-2 px-5 md:visible hidden rounded-md ${navCss.shadow}`} to='/register'>Register</NavLink>
          <button className={`${navCss.menu} ${ariaExpend? navCss.opened :``}`} onClick={()=>setAriaExpend(!ariaExpend)} aria-label="Main Menu">
      <svg width="50" height="50"  viewBox="0 0 100 100" aria-expanded={ariaExpend}>
        <path className={`${navCss.line} ${navCss.line1} hover:stroke-cyan-300`} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
        <path className={`${navCss.line} ${navCss.line2}`} d="M 20,50 H 80" />
        <path className={`${navCss.line} ${navCss.line3}`} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
      </svg>
    </button></span>
      </div>
      <div></div>
    </nav>
  )
}

export default Navbar