import React, { useEffect, useState } from 'react'
import navCss from '../modulCss/Nav.module.css'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { RiSearch2Line, RiUser2Line } from "@remixicon/react";
import { useAppDispatch, useAppSelector } from './store/store';
import { asyncLogOutUser } from './store/actions/userActions';


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const [searchValue, setSearchValue] = useState('');
const [isSearchOpen, setIsSearchOpen] = useState(false);
const {isAuth, user} = useAppSelector(state=>state.user);
const dispatch = useAppDispatch()

  const toggleMenu = async () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      console.log('a')
      await controls.start({ opacity: 1, transition: { delay: 0.2 } });
      console.log('b')
      // Trigger the animation for link elements after the drawer is fully opened
      await controls.start({ opacity: 1, transition: { delay: 0 } });
      console.log('c')
    } else {
      console.log('d')
      controls.start({ opacity: 0 });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e:any) => {
      if (
        isSearchOpen &&
        e.target.closest(`.${navCss.searchBar}`) === null &&
        e.target.type !== 'search'
      ) {
        setIsSearchOpen(false);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    console.log('auth change', isAuth)
  
    return () => {
      
    }
  }, [isAuth])
  

  
  return (
    <div className={`fixed top-0 left-0 z-50 ${isMenuOpen?'h-screen':'h-fit'}`}>
    <nav className={` w-screen bg-slate-700 text-cyan-50 ${navCss.navbar}`}>
    <div className={`absolute m-auto top-0 left-[50%] translate-x-[-50%] -translate-y-3`}>
  <div className={`${navCss.searchBar}`}>
    <motion.div
      initial={{ width: '2rem' }}
      animate={{ width: isSearchOpen ? '8rem' : '2rem' }}
      transition={{ duration: 0.3 }}
      className={`cursor-pointer`}
      onClick={() => setIsSearchOpen(!isSearchOpen)}
    >
      <RiSearch2Line size={20} color="#1E293B" />
    </motion.div>
    {isSearchOpen && (
      <input
        type="search"
        className={`${navCss.searchInput}`}
        name="search"
        pattern=".*\S.*"
        required
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onBlur={() => setIsSearchOpen(false)}
      />
    )}
  </div>
</div>

      <div className='w-screen relative flex justify-between px-3 items-center h-14'>
        <span className={`${navCss.logo}`}>UR-Academy </span>
        <span className='flex justify-center relative h-[10vh] items-center gap-2'>
          { isAuth && <> <span className='hover:text-cyan-300 cursor-pointer md:block hidden'>Profile</span> <RiUser2Line size={36} className='md:hidden' /> 
          <span onClick={()=>{dispatch(asyncLogOutUser())}} className={`text-xs text-red-400 border-2 p-2 rounded-full border-slate-500 bg-slate-800 cursor-pointer hover:bg-slate-500 hover:border-slate-800 `}>Log-Out</span></>}
          { !isAuth && <><NavLink className={`bg-slate-800 p-2 px-5 md:block hidden rounded-md ${navCss.shadow} ${(e: any) => { return e.isActive ? `text-cyan-300` : `` }}`} to='/login'>Log-In</NavLink>
          <NavLink className={`bg-slate-600 p-2 px-5 md:block hidden rounded-md ${navCss.shadow}`} to='/register'>Register</NavLink></> }
          <button className={`${navCss.menu} ${isMenuOpen ? navCss.opened : ``}`} onClick={toggleMenu} aria-label="Main Menu">
            <svg width="50" height="50" viewBox="0 0 100 100" aria-expanded={isMenuOpen}>
              <path className={`${navCss.line} ${navCss.line1} hover:stroke-cyan-300`} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className={`${navCss.line} ${navCss.line2}`} d="M 20,50 H 80" />
              <path className={`${navCss.line} ${navCss.line3}`} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
          </button>
        </span>
      </div>

      <div className={` ${navCss.menuDiv} ${isMenuOpen?'':'hidden'} absolute top-0 left-0`}>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="menu"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className={`flex-col md:flex-row  flex z-10  ${navCss.menuInside}`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={controls}
                className={`${navCss.optionContainer} flex-col gap-2 w-[100%] md:w-1/2 text-slate-400 `}
              >
                {['Profile', 'About', 'Courses', 'Contact Us'].map((elem, ind) => (
                  <motion.div
                    key={ind}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: ind * 0.1 }}
                    className='h-1/5 border-b-2 border-slate-400 p-3 pl-6'
                    >
                    <motion.div className='from-neutral-200'
                      initial={{ opacity: 1 }}
                      animate={controls}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Link
                          className={`from-neutral-200 overflow-hidden ${navCss.linkTag}`}
                          to={`/${elem}`}
                        >
                          {elem}
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.4 }}
                className ={`${navCss.glassDiv} md:w-1/2 w-[100%]  md:h-[100%] h-1/2 text-slate-950 md:flex items-center justify-center`}
              >
                2024
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </nav>
    </div>

  )
}

export default Navbar