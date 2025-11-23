import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const PostDetails = () => {
  const { id } = useParams()

  console.log({ id })

  function getSinglePost () {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }
  // call api post dependence => id

  const { data, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: getSinglePost
  })

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <i className='fa-solid fa-spinner fa-spin text-white text-7xl'></i>
      </div>
    )
  }

  return (
    <>
      <section className='w-full md:w-3/4 p-5 lg:w-1/2 my-4 mx-auto'>
        <Helmet>
          <title>Post Details - {data?.data?.post?.user?.name}</title>
        </Helmet>
        <Post post={data?.data.post} isPostDetails={true} />
      </section>
    </>
  )
}

export default PostDetails
