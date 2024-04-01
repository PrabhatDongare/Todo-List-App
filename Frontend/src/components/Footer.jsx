// import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <div className='bottom-0 flex gap-2 items-center justify-center text-lg custom-bg h-12 font-semibold lg:text-base lg:h-12 md:text-sm sm:text-sm'>
          Made with Love <FaHeart className='text-red-500' /> By Prabhat Dongare
        </div>
    </>
  )
}

export default Footer
