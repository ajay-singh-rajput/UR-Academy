import {  RiFolderVideoLine, RiStarFill, RiTimeLine } from '@remixicon/react'

const Card = () => {
  return (
    <>
    <div className={`w-72 bg-[#475569]`}>
        <img className={`w-full aspect-square`} src="https://templates.simplified.co/thumb/84b0a38d-c115-473a-b457-8a8c9071c5ad.jpg" alt="" />
        <div className={`flex flex-col gap-2 p-3`}>

        <span className={`flex w-full justify-between items-center`}> <span className='text-slate-400'>UI/UX Design</span> <span className='flex text-yellow-500'><RiStarFill/> 4.2</span></span>
        <span>UI/UX Design for Beginners</span>
        <span className='text-green-400'>Rs. 55</span>
        <div className={`flex gap-3  justify-between text-slate-400`}> <span className='flex gap-2'><RiTimeLine/> 32hr 39min</span> <span className='flex gap-2'><RiFolderVideoLine/> 44 chapter</span> </div>
        <button className={`bg-[#223243] p-3 rounded-md`}>Watch</button>
        </div>
    </div>
    </>
  )
}

export default Card