import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const CommentForm = ({ id }) => {
  const [content, setContent] = useState('')

  // const [isLoading, setIsLoading] = useState(false)

  // async function createComment () {
  //   setIsLoading(true)
  //   const values = {
  //     content: content,
  //     post: id
  //   }

  //   // console.log(values);

  //   try {
  //     const { data } = await axios.post(
  //       'https://linked-posts.routemisr.com/comments',
  //       values,
  //       {
  //         headers: {
  //           token: localStorage.getItem('token')
  //         }
  //       }
  //     )

  //     console.log(data)

  //     setIsLoading(false)

  //     toast.success(data.message)
  //   } catch (error) {
  //     console.log(error)

  //     setIsLoading(false)

  //     toast.error(error.response.data.error)
  //   }
  // }

  // add comment => ref => single post

  const queryClient = useQueryClient()

  function createComment () {
    const values = {
      content: content,
      post: id
    }

    return axios.post("https://linked-posts.routemisr.com/comments", values, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  const {isPending , mutate} = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      // console.log(data)
      // setIsLoading(false)
      toast.success(data.data.message) 
      queryClient.invalidateQueries({
        queryKey: ['post' , id],
      })
      setContent("")
    },
    onError: (error) => {
      // console.log(error)
      // setIsLoading(false)
      toast.error(error.response.data.error)
    }
  })

  return (
    <div className='join mt-4 !w-full'>
      <div className='!w-full'>
        <label className='input join-item !w-full'>
          <input
            className='!w-full'
            type='text'
            placeholder='Enter Your Comment'
            required
            value={content}
            onChange={e => {
              setContent(e.target.value)
            }}
          />
        </label>
      </div>
      <button onClick={mutate} className='btn btn-primary join-item'>
        {isPending ? (
          <i className='fa-solid fa-spinner fa-spin'></i>
        ) : (
          <i className='fa-solid fa-paper-plane'></i>
        )}
      </button>
    </div>
  )
}

export default CommentForm
