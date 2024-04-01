import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem('token')
    navigate('/login')
    toast.success(`You have been kicked off`)
  }

  return (
    <div className="custom-bg text-white flex justify-between items-center px-14 md:px-3 lg:px-9 py-3 flex-wrap sm:justify-center">
      <div className="text-3xl flex lg:text-xl sm:pb-2">
        <img className="w-10 lg:w-7 lg:h-7 lg:my-auto" src="../list.svg" alt="logo" />
        <span className="pl-3 pr-5 md:pl-1 md:pr-2">ToDo List App</span>
      </div>

      <div className="flex gap-x-7 md:gap-x-7 text-xl flex-wrap lg:text-lg md:text-base md:justify-center  ">
        <ul className="flex gap-x-10 md:gap-x-7 sm:gap-x-5 text-xl flex-wrap lg:text-lg md:text-base md:justify-center  pb-1">
          <li className="border-b-2 border-transparent hover:border-white transition duration-500 ease cursor-pointer">
            <NavLink to="/" >Home</NavLink>
          </li>

          <li className="border-b-2 border-transparent hover:border-white transition duration-500 ease cursor-pointer">
            <NavLink to="/about" >About</NavLink>
          </li>

          <li className="border-b-2 border-transparent hover:border-white transition duration-500 ease cursor-pointer ">
            <NavLink to="/contact" >Contact Us</NavLink>
          </li>
        </ul>

        {!localStorage.getItem('token') ?
          <div className="flex gap-x-2 md:gap-x-2">
            <button className="bg-teal-500 px-2 font-semibold rounded-lg pb-1 "><NavLink to="/login" >Login</NavLink></button>
            <button className="bg-cyan-500 px-2 font-semibold rounded-lg pb-1 "><NavLink to="/signup" >Sign Up</NavLink></button>
          </div>
          :
          <div className="flex">
            <button onClick={handleLogout} className="bg-teal-500 px-2 font-semibold rounded-lg pb-1 "><NavLink to="/login" >Logout</NavLink></button>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
