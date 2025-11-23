import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useRef, useState } from 'react'

const HeaderPost = ({ userName, UserImg, createAt, userPostId, postId }) => {
  const { user: loggedUserId } = jwtDecode(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false)

  const profilePhoto = useRef(null)

  const handleAvatarClick = () => {
    profilePhoto.current?.click()
  }

  const handleFileChange = async () => {
    setIsLoading(true)
    const photo = profilePhoto.current.files[0]
    if (!photo) return

    const formData = new FormData()
    formData.append('photo', photo)

    // Example: Replace with your API endpoint
    try {
      const data = await axios.put(
        'https://linked-posts.routemisr.com/users/upload-photo',
        formData,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )
      // setIsLoading(false)
      console.log('Photo uploaded successfully', data)
    } catch (error) {
      // setIsLoading(false)
      console.error('Photo upload failed:', error)
    } finally {
      setIsLoading(false)
    }
    // Optionally update UI after upload
  }

  if (isLoading) {
    return (
      <div className='flex justify-start items-start'>
        <i className='fa-solid fa-spinner fa-spin'></i>
      </div>
    )
  }

  function deletePost () {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }


  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['userPosts', loggedUserId],
        
      })
    },
    onError: error => {
      console.log(error)
    }
  })

  return (
    <div className='flex justify-between items-center'>
      <div className='flex'>
        {/* avatar */}
        {UserImg ? (
          <div className='avatar rounded-full me-3'>
            <div
              className='w-12 rounded-full cursor-pointer'
              onClick={handleAvatarClick}
            >
              <img className='rounded-full' src={UserImg} alt='Profile' />
              <input
                ref={profilePhoto}
                onChange={handleFileChange}
                type='file'
                className='hidden'
                accept='image/*'
              />
            </div>
          </div>
        ) : null}
        {/* name ,and date */}
        <div>
          <h1>{userName}</h1>
          <p>{createAt}</p>
        </div>
      </div>

      {/* icon */}

      {loggedUserId === userPostId && (
        <details className='dropdown dropdown-left'>
          <summary className='btn m-1'>
            <i className='fa-solid fa-ellipsis'></i>
          </summary>
          <ul className='menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'>
            <li>
              <button onClick={mutate}>
                {isPending ? (
                  <i className='fa-solid fa-spinner fa-spin'></i>
                ) : (
                  'Delete'
                )}
              </button>
            </li>
            <li>
              <button>Update</button>
            </li>
          </ul>
        </details>
      )}
    </div>
  )
}

export default HeaderPost
