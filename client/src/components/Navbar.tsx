import  { useEffect, useState } from 'react'
import navCss from '../modulCss/Nav.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import {  RiUser2Line } from "@remixicon/react";
import { useAppDispatch, useAppSelector } from './store/store';
import { asyncLogOutUser } from './store/actions/userActions';


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenCheck, setIsMenuOpenCheck] = useState(false);
  const controls = useAnimation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuth } = useAppSelector(state => state.user);
  const [isActive, setIsActive] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const toggleMenu = async () => {
    setIsMenuOpenCheck(!isMenuOpenCheck);
    if (!isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
      await controls.start({ opacity: 1, transition: { delay: 0.2 } });
      // Trigger the animation for link elements after the drawer is fully opened
      await controls.start({ opacity: 1, transition: { delay: 0.3 } });
    } else {
      // await controls.start({ x: '100%', transition:{delay:0.2} });
      // await controls.start({ opacity: 0, x: '100%', transition:{delay:0} });
      setIsMenuOpen(!isMenuOpen);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
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

  const navigateToPage = (item:string)=>{
    navigate(`/${item}`)
  }
  

  const perspective = {
    initial: {
      opacity: 0,
      rotateX: 90,
      translateY: 80,
      translateX: -20,
    },
    enter: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        duration: 0.65,
        // opacity:{duration:0.45},
        delay: 0.5 + (i * 0.1),
        ease: [.215, .61, .355, 1]
      }
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  }
  const variant = {
    open: {
      width: 480,
      height: 450,
      // top:"-10px",
      // right:-"100px",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    },
    close: {
      width: 480,
      height: 40,
      // top:0,
      // left:0,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    }
  }


  return (
    <div className={`fixed top-0 left-0 z-50 ${isMenuOpen ? 'h-screen' : 'h-fit'}`}>
      <nav className={` w-screen  text-cyan-50 ${navCss.navbar}`}>
        

        <div className='w-screen relative flex justify-between px-3 items-center h-14'>
          <span className={`${navCss.logo}`}><NavLink to='/'>UR-Academy</NavLink>  </span>
          <span className='flex justify-center relative h-[10vh] items-center gap-2'>
            {isAuth && <>
              <span onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} className='hover:text-cyan-300 cursor-pointer md:block hidden absolute top-5 -left-28'>
                <Link to='/Profile'>Profile</Link>
                <motion.div
                  className={`${navCss.menuDivS} w-[480px] h-[450px] bg-[#334155] rounded-3xl gap-3 absolute top-0 -z-10`}
                  variants={variant}
                  animate={isActive ? 'open' : 'close'}
                  initial='close'
                >
                  <AnimatePresence>
                    {isActive && <div className={`${navCss.optionHolder} h-full pt-11 px-10 pb-12 box-border flex flex-col `}>
                      {['Profile', 'Manage Course', 'Edit Profile','Upload Course'].map((item, ind) => {
                        return <div 
                        onClick={()=>{navigateToPage(item)}}
                        key={ind} 
                        className={`${navCss.optionContainer} bg-transparent border-none flex flex-col gap-3 hover:font-semibold`}>
                          <motion.div
                            custom={ind}
                            variants={perspective}
                            animate='enter'
                            exit='exit'
                            initial='initial'
                          >
                            <span className='text-gray-400 text-3xl '>{item}</span>
                          </motion.div>
                        </div>
                      })}

                      <motion.span custom={5}
                            variants={perspective}
                            animate='enter'
                            exit='exit'
                            initial='initial'
                            onClick={() => { dispatch(asyncLogOutUser()) }} 
                            className={`text-xs mt-3  p-2 rounded-full  bg-slate-800 cursor-pointer hover:bg-slate-500 hover:border-slate-800 `}>Log-Out</motion.span>
                    </div>}
                  </AnimatePresence>
                </motion.div>
              </span> <RiUser2Line size={36} className='md:hidden' />
            </>}
            {!isAuth && <><NavLink className={` p-2 px-4 md:block hidden rounded-full ${navCss.shadow} ${navCss.loginBtn} ${(e: any) => { return e.isActive ? `text-cyan-300` : `` }}`} to='/login'>Log-In</NavLink>
              <NavLink className={` p-2 px-4 md:block hidden rounded-full ${navCss.shadow} ${navCss.register}`} to='/register'>Register</NavLink></>}
            <button className={`${navCss.menu} ${isMenuOpenCheck ? navCss.opened : ``}`} onClick={toggleMenu} aria-label="Main Menu">
              <svg width="50" height="50" viewBox="0 0 100 100" aria-expanded={isMenuOpenCheck}>
                <path className={`${navCss.line} ${navCss.line1} hover:stroke-cyan-300`} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path className={`${navCss.line} ${navCss.line2}`} d="M 20,50 H 80" />
                <path className={`${navCss.line} ${navCss.line3}`} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
              </svg>
            </button>
          </span>
        </div>

        <div className={` ${navCss.menuDiv} ${isMenuOpen ? '' : 'hidden'} absolute top-0 left-0`}>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="menu"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className={`flex-col md:flex-row  flex z-10  ${navCss.menuInside}`}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={controls}
                  className={`${navCss.optionContainer} flex-col gap-2 w-[100%] md:w-1/2 text-slate-400 `}
                >
                  {['Home', 'About', 'Contact Us'].map((elem, ind) => (
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
                          <Link onClick={toggleMenu}
                            className={`from-neutral-200 overflow-hidden ${navCss.linkTag}`}
                            to={`/${elem == 'Home' ? '' : elem}`}
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
                  className={`${navCss.glassDiv} md:w-1/2 w-[100%]  md:h-[100%] h-1/2 text-slate-950 md:flex items-center justify-center`}
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