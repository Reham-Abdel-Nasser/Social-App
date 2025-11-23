import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useQuery } from '@tanstack/react-query'
import Post from '../Post/Post'
import AddPost from '../AddPost/AddPost'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const Profile = () => {
  const { user: loggedUserId } = jwtDecode(localStorage.getItem('token'))

  // console.log(loggedUserId);

  function getUserPosts () {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${loggedUserId}/posts`,
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }
    )
  }

  const { isLoading, data } = useQuery({
    queryKey: ['userPosts', loggedUserId],
    queryFn: getUserPosts,
    onSuccess: data => {
      console.log(data)
    },
    onError: error => {
      console.log(error)
    }
  })

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <i className='fa-solid fa-spinner fa-spin text-white text-7xl'></i>
      </div>
    )
  }

  return (
    <section className='w-full md:w-3/4 p-5 lg:w-1/2 my-4 mx-auto'>

      {/* in react version 19 possible  write title without using react helmet */}
      <Helmet>
        <title>Profile - {data?.data.posts[0].user.name}</title>
      </Helmet>
      <div className='mb-5 text-center'>
        <AddPost />
      </div>
      {data?.data?.posts.map(function (post, idx) {
        return <Post key={idx} post={post} />
      })}
    </section>
  )
}

export default Profile
