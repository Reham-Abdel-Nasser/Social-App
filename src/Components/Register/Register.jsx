import React from 'react'
import Style from './Register.module.css'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const schema = z
    .object({
      name: z.string().min(3, 'min length 3').max(15, 'max length 15'),
      email: z.email('invalid email'),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          'enter valid password'
        ),
      rePassword: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          'enter valid rePassword'
        ),
      dateOfBirth: z.coerce.date().refine(function (value) {
        const currentYear = new Date().getFullYear()
        const userYear = value.getFullYear()

        if (currentYear - userYear >= 18) {
          return true
        }
        return false
      }, 'must age > 18'),
      gender: z.enum(['male', 'female'])
    })
    .refine(function (values) {
      if (values.password === values.rePassword) {
        return true
      }
      return false
    }, "rePassword doesn't match ")

  /*
    ui ux => name , email , password , gender

    BE => name , email , password , gender , phone

  */

  /*
    useformik => state 

	RHF => react hook form => use ref


  */

  const {
    register,
    // setError,
    // getValues,
    // watch,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    resolver: zodResolver(schema)
  })

  async function signup (values) {
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        'https://linked-posts.routemisr.com/users/signup',
        values
      )
      // console.log(data);
      toast.success(data.message)

      setIsLoading(false)
      navigate('/login')
    } catch (e) {
      toast.error(e.response.data.error)
      setIsLoading(false)
    }

    // console.log(data.response.data.error);

    // if (values.password === values.rePassword) {
    // console.log(values)

    // 	// call api
    // }else{
    // 	setError("rePassword", {message: "rePassword doesn't match"})

    // }

    /*
	"" , false , undefind , null , 0

	true && "fsgfd" && 0


	|| =>  OR

	const x = {nmae:"huda" , age:30}

	const y ={...x}

	headers  options  config  init  setting => datatype object {}
	*/
  }

  return (
    <section className='my-10 p-10 w-1/2 mx-auto shadow-xl dark:shadow-blue-500/20 shadow-white'>
      <h1 className='text-center mb-16'>Register Comp </h1>

      <form onSubmit={handleSubmit(signup)}>
        {/* name Input */}
        <input
          id='name'
          type='text'
          placeholder='Name'
          className='input input-primary w-full mb-4'
          {...register(
            'name'
            // ,	{
            //     required: {
            //       value: true,
            //       message: 'name is required'
            //     },
            //     minLength: {
            //       value: 3,
            //       message: 'min length 3'
            //     },
            //     maxLength: {
            //       value: 20,
            //       message: 'max length 20'
            //     }
            //   }
          )}
        />
        {errors?.name && touchedFields?.name && (
          <p className='text-red-500 mb-3'>{errors?.name?.message}</p>
        )}

        {/* email Input */}
        <input
          id='email'
          type='email'
          placeholder='Email'
          className='input input-primary w-full mb-4'
          {...register(
            'email'
            // ,	{
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
            // , {
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

        {/* rePassword Input */}
        <input
          id='rePassword'
          type='password'
          placeholder='rePassword'
          className='input input-primary w-full mb-4'
          {...register(
            'rePassword'
            // ,	{
            //     required: {
            //       value: true,
            //       message: 'rePassword is required'
            //     },
            //     pattern: {
            //       value:
            //         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            //       message:
            //         'rePassword must start uppercase , includes numbers , and special characters'
            //     },

            //     validate: function (value) {
            //       if (value == watch('password')) {
            //         return true
            //       }
            //       return 'hamada'
            //     }
            //   }
          )}
        />
        {errors?.rePassword && touchedFields?.rePassword && (
          <p className='text-red-500 mb-3'>{errors?.rePassword?.message}</p>
        )}

        {/* dateOfBirth Input */}
        <input
          id='dateOfBirth'
          type='date'
          placeholder='date Of Birth'
          className='input input-primary w-full mb-4'
          {...register(
            'dateOfBirth'
            // ,	{
            //     required: {
            //       value: true,
            //       message: 'date of birth is required'
            //     },
            //     valueAsDate: true,

            //     validate: function (value) {
            //       const currentYear = new Date().getFullYear()
            //       const userYear = value.getFullYear()

            //       if (currentYear - userYear >= 18) {
            //         return true
            //       }
            //       return 'must age > 18'
            //     }
            //   }
          )}
        />
        {errors?.dateOfBirth && touchedFields?.dateOfBirth && (
          <p className='text-red-500 mb-3'>{errors?.dateOfBirth?.message}</p>
        )}

        {/* gender Input */}
        <div className='mb-4'>
          <input
            id='male'
            type='radio'
            name='gender'
            value={'male'}
            className='radio radio-primary'
            {...register(
              'gender'
              // ,	{
              //   required: {
              //     value: true,
              //     message: 'gender is required'
              //   },
              //   pattern: {
              //     value: /^(male|female)$/
              //   }
              // }
            )}
          />
          <label htmlFor='male' className='ms-4 me-10'>
            Male
          </label>
          <input
            id='female'
            type='radio'
            name='gender'
            value={'female'}
            className='radio radio-primary'
            {...register(
              'gender'
              // ,	{
              //   required: {
              //     value: true,
              //     message: 'gender is required'
              //   },
              //   pattern: {
              //     value: /^(male|female)$/
              //   }
              // }
            )}
          />
          <label htmlFor='female' className='ms-4 me-10'>
            Female
          </label>
        </div>
        {errors?.gender && touchedFields?.gender && (
          <p className='text-red-500 mb-3'>{errors?.gender?.message}</p>
        )}

        <button type='submit' className='btn btn-primary w-full'>
          {isLoading ? (
            <i className='fa-solid fa-spinner fa-spin text-white'></i>
          ) : (
            'Register'
          )}
        </button>
      </form>
    </section>
  )
}

export default Register
