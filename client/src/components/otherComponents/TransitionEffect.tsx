import React, { useState } from 'react'
// import styles from './Pixel.module.css'
import { motion } from 'framer-motion';

const anim = {
    initial :{
        opacity:0
    },
    open: (i:number) => ({
        opacity: 1,
        transition: {duration: 0, delay: 0.03 * i}
    }),
    closed: (i:number) => ({
        opacity: 0,
        transition: {duration: 0, delay: 0.03 * i}
    })
}



const Pixel = ({trans}:any) => {

    const [isAnimation, setIsAnimation] = useState(false)

    const shuffle = (a:any) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    setTimeout(() => {
        console.log('making true')
        setIsAnimation(true)
    }, 800);


    const getBlock = (indexElement:number)=>{
        const {innerWidth, innerHeight} = window;
        const blockSize = innerWidth * 0.05;
        const amountOfBlock = Math.ceil(innerHeight / blockSize)
        const shuffleIndex = shuffle([...Array(amountOfBlock)].map((_, i)=>i))
        return shuffleIndex.map((randomNumber:number, i:number)=>{
            return (
            <motion.div 
            key={i} 
            variants={anim}
            initial='initial'
            animate={trans.transition && !isAnimation ? 'open': 'closed'}
            custom={indexElement + randomNumber}
            className='h-[5vw] w-full bg-[#70839c]'>

            </motion.div>
            )
        })
    }


  return (
    <div className={` flex h-screen overflow-hidden`}>
        {
            [...Array(20)].map((_, i)=>{
                return <div key={i} className={`w-[5vw] h-full flex flex-col`}>
                    {
                        getBlock(i)
                    }
                </div>
            })
        }
        {/* <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-[#00DDC2]'>UR Academy</h1> */}
    </div>
  )
}

export default Pixel