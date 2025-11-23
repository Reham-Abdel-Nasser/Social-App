import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'

const Login = () => {
  const {insertUserToken} = useContext(authContext)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const schema = z
    .object({
      email: z.email('invalid email'),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          'enter valid password'
        ),
    })
    

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema)
  })

  async function signin (values) {
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        'https://linked-posts.routemisr.com/users/signin',
        values
      )
      // console.log(data);
      toast.success(data.message);
      localStorage.setItem("token" , data.token)
      insertUserToken(data.token);

      setIsLoading(false);
      navigate('/');
    } catch (e) {
      toast.error(e.response.data.error);
      setIsLoading(false);
    }
  }

  return (
    <section className='my-10 p-10 w-1/2 mx-auto shadow-xl dark:shadow-blue-500/20 shadow-white'>
      <h1 className='text-center mb-16'>Login Comp </h1>

      <form onSubmit={handleSubmit(signin)}>

        {/* email Input */}
        <input
          id='email'
          type='email'
          placeholder='Email'
          className='input input-primary w-full mb-4'
          {...register(
            'email'
            // 	,{
            //     required: {
            //       value: true,
            //       message: 'email is required'
            //     },
            //     pattern: {
            //       value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            //       message: 'invalid email'
            //     }
            //   }
          )}
        />
        {errors?.email && touchedFields?.email && (
          <p className='text-red-500 mb-3'>{errors?.email?.message}</p>
        )}

        {/* password Input */}
        <input
          id='password'
          type='password'
          placeholder='Password'
          className='input input-primary w-full mb-4'
          {...register(
            'password'
            //  , {
            //     required: {
            //       value: true,
            //       message: 'password is required'
            //     },
            //     pattern: {
            //       value:
            //         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            //       message:
            //         'password must start uppercase , includes numbers , and special characters'
            //     }
            //   }
          )}
        />
        {errors?.password && touchedFields?.password && (
          <p className='text-red-500 mb-3'>{errors?.password?.message}</p>
        )}

        <button type='submit' className='btn btn-primary w-full'>
          {isLoading ? (
            <i className='fa-solid fa-spinner fa-spin text-white'></i>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </section>
  )
}

export default Login
