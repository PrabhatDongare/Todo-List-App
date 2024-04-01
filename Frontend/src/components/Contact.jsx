// import React from 'react'
import { FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="custom-bg p-10">
    <div className='flex flex-col justify-center items-center card-bg text-lg w-[50%] rounded-2xl mx-auto min-h-[72.4vh]'>
      <span className='underline font-bold text-3xl'>My LinkedIn </span> <br />
      <a href="https://www.linkedin.com/in/prabhatdongare/" target="_blank"> <FaLinkedin className="text-[120px]"/> </a>
    </div>
    </div>
  )
}

export default Contact
