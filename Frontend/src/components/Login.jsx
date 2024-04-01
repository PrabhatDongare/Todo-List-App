import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserLogin } from '../redux/user/userSlice'
import { fetchShowTodoData } from '../redux/storeTodos/storeTodosSlice'
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [toggleCB, setToggleCB] = useState(false)

  let handleShowPassword = () => {
    setToggleCB(!toggleCB)
  }

  const onSubmit = async (data) => {
      const { email, password } = data
      await dispatch(fetchUserLogin({ email, password }))
      reset();

      let token = await localStorage.getItem('token')
      if (token) {
        await dispatch(fetchShowTodoData())
        navigate('/')
        toast.success('Back for the chicken?')
      }
  }

  return (
    <>
      <div className='custom-bg sm:h-[72.9vh] h-[83.9vh] flex justify-center items-center flex-col'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[30%] lg:w-[50%] sm:w-[80%] md:p-4 px-14 pb-6 pt-3 card-bg gap-2 rounded-2xl'>
          <h1 className='text-center text-2xl font-mono font-semibold drop-shadow-sm my-1'>Login</h1>

          {/* Email */}
          <div className='flex justify-between'>
            <label>Email</label>
            {errors.email && <span className='text-sm flex items-end text-red-500'>{errors.email.message}</span>}
          </div>
          <input {...register("email", {
            required: { value: true, message: "* This field is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "* invalid email address"
            }
          })} className='rounded-md px-2 py-1 mb-2' />

          {/* Password */}
          <div className='flex justify-between'>
            <label>Password</label>
            {errors.password && <span className='text-sm flex items-end text-red-500'>{errors.password.message}</span>}
          </div>
          <input type={toggleCB ? "text" : "password"}  {...register("password", {
            required: { value: true, message: "* This field is required" }
          })} className='rounded-md px-2 py-1 mb-2' />

          {/* Show Password */}
          <label className='flex gap-2 cursor-pointer' >
            <input type="checkbox" {...register("cbShowPassword")} value={toggleCB} onChange={handleShowPassword} /> show password
          </label>

          {/* Submit */}
          <input disabled={isSubmitting} type="submit" className='bg-violet-700 text-white px-4 py-1 rounded-lg mx-auto cursor-pointer mt-2' />
        </form>
      </div>
    </>
  )
}

export default Login
