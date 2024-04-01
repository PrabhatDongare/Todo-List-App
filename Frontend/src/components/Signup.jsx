import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserSignIn } from '../redux/user/userSlice'
import { fetchShowTodoData } from '../redux/storeTodos/storeTodosSlice'
import { toast } from 'react-toastify';

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm()
  const [toggleCB, setToggleCB] = useState(false)

  let handleShowPassword = () => {
    setToggleCB(!toggleCB)
  }

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data
      await dispatch(fetchUserSignIn({ name, email, password }))
      reset();

      let token = await localStorage.getItem('token')
      if (token) {
        await dispatch(fetchShowTodoData())
        navigate('/')
        toast.success('Welcome to the Squad!')
      }
      // implement backend checks and error messages at frontend

    } catch (error) {
      console.error('Error occurred:', error);
    }

  }

  return (
    <>
      <div className='custom-bg h-[83.9vh] flex justify-center items-center flex-col md:pb-20 md:pt-14 sm:pt-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[30%] lg:w-[50%] sm:w-[80%] md:pt-1 md:px-6 sm:px-4 px-14 pb-6 pt-3 card-bg gap-2 rounded-2xl sm:mt-10'>
          <h1 className='text-center text-2xl font-mono font-semibold drop-shadow-sm my-1'>Sign Up</h1>

          {/* Name */}
          <div className='flex justify-between'>
            <label>Name</label>
            {errors.name && <span className='text-sm flex items-end text-red-500'>{errors.name.message}</span>}
          </div>
          <input {...register("name", {
            required: { value: true, message: "* This field is required" },
            minLength: { value: 3, message: "* min 3 character required" },
            maxLength: { value: 25, message: "* max 25 character allowed" },
            pattern: {
              value: /^[a-zA-Z]+( [a-zA-Z]+){0,3}$/,
              message: "* invalid entry"
            }
          })} className='rounded-md px-2 py-1 mb-2' />

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
            required: { value: true, message: "* This field is required" },
            minLength: { value: 4, message: "* min 4 character required" },
            maxLength: { value: 20, message: "* max 20 character allowed" },
            validate: {
              containsUppercase: value => /[A-Z]/.test(value) || "* atleast 1 capital letter required",
              containsLowercase: value => /[a-z]/.test(value) || "* atleast 1 lowercase letter required",
              containsNumber: value => /\d/.test(value) || "* atleast 1 number required"
            }
          })} className='rounded-md px-2 py-1 mb-2' />

          {/* Confirm Password */}
          <div className='flex justify-between'>
            <label>Confirm Password</label>
            {errors.confirm_password && <span className='text-sm flex items-end text-red-500'>{errors.confirm_password.message}</span>}
          </div>
          <input type={toggleCB ? "text" : "password"} {...register("confirm_password", {
            required: { value: true, message: "* This field is required" },
            validate: (val) => {
              if (watch('password') != val) {
                return "* Your passwords do no match";
              }
            },
          })}
            className='rounded-md px-2 py-1 mb-2' />

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

export default Signup
