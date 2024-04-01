// import React from 'react'
import { FaReact } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";


const About = () => {
  return (
    <div className="custom-bg p-10">
    <div className='flex flex-col justify-center items-center card-bg text-xl w-[50%] rounded-2xl mx-auto min-h-[72.4vh] gap-5 px-16 lg:px-10 py-5 md:w-[80%]  sm:text-sm'>
      <div className='underline font-bold text-3xl '>About: Todo List App</div>
      <div className="flex gap-x-5 sm:gap-x-1  items-center">
      <div className="flex flex-col gap-2 items-center"><h1 className="underline text-2xl">Tools used</h1> <div className="flex text-3xl gap-x-5 md:text-xl"><FaReact /> <SiRedux /> <SiTailwindcss /> <FaNode /> <SiExpress /> <SiMongodb />
</div></div> 
      </div>
        
      <div className="text-center">
      <div className="underline pb-2 text-2xl">What this app can do:</div> <p className="text-justify ">CRUD operation on todos, filter todos based on condition, mark todo as done. Login SignUp feature with all checks, all data enters in DB with checks, all passwords are encrypted, for authentication JWT token used, for notifications react toastify used. 
      The application is build on best code practices and is a full stack application. The application is <span className="drop-shadow-xl font-medium">live !!!</span></p>
      </div>
    </div>
    </div>
  )
}

export default About
