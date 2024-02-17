import { motion, useMotionValue, useSpring } from 'framer-motion'
import React, { useEffect, useState } from 'react'


export const Courser = () => {
    const [isHovered, setIsHovered] = useState(false)
    const cursorSize = isHovered ? 60 : 20;
    const mouse = {
        x:useMotionValue(0),
        y:useMotionValue(0)
    }

    const smoothOption = {damping:50, stiffness:300, mass:0.4}
    const smoothMouse = {
        x:useSpring(mouse.x, smoothOption),
        y:useSpring(mouse.y, smoothOption)
    }

    const manageMouseMove = (e:any)=>{
        const {clientX, clientY} = e;
        // const {left, top, width, height} = stickyElement?.current.getBoundingClientRect();

        // const center = {x:left + width / 2, y:top + height / 2};

        // if (isHovered) {
            
        //     mouse.x.set(center.x - cursorSize / 2) 
        //     mouse.y.set(center.y - cursorSize / 2)
        // } else {
            
            mouse.x.set(clientX - cursorSize / 2) 
            mouse.y.set(clientY - cursorSize / 2)
        // }
    }
    const manageMouseOver = (e:any)=>{
        setIsHovered(true);
    }
    const manageMouseLeave = (e:any)=>{
        setIsHovered(false);

    }
    useEffect(()=>{
        window.addEventListener('mousemove',manageMouseMove);
        // stickyElement.current.addEventListener('mouseover',manageMouseOver)
        // stickyElement.current.addEventListener('mouseleave',manageMouseLeave)
        return ()=>{
            window.removeEventListener('mousemove', manageMouseMove)
            // stickyElement.current.addEventListener('mouseover',manageMouseOver)
            // stickyElement.current.addEventListener('mouseleave',manageMouseLeave)
        }
    })
  return (
    <motion.div 
    style={{left: smoothMouse.x, top:smoothMouse.y}} 
    animate={{width:cursorSize, height:cursorSize}}
    className='w-12 h-12 border-2 pointer-events-none border-[#00dfc4] fixed rounded-full z-50 '>

    </motion.div>
  )
}
