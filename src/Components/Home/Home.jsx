import React from 'react'
// import  { useEffect, useState } from 'react'
// import Style from './Home.module.css'
// import UserInfo from '../UserInfo/UserInfo'
import Post from '../Post/Post'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import AddPost from '../AddPost/AddPost'
import { Helmet } from 'react-helmet'

const Home = () => {
  // const [allPosts, setAllPosts] = useState(null)
  // async function getAllPosts () {
  //   try {
  //     const { data } = await axios.get(
  //       'https://linked-posts.routemisr.com/posts?limit=50',
  //       {
  //         headers: {
  //           token: localStorage.getItem('token')
  //         }
  //       }
  //     )

  //     console.log(data.posts)

  //     setAllPosts(data.posts)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(function () {
  //   getAllPosts()
  // }, [])

  function getAllPosts () {
    return axios.get('https://linked-posts.routemisr.com/posts?limit=50', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
  }

  const { data, isLoading } = useQuery({
    // queryKey:"allPosts"
    queryKey: ['allPosts'],
    queryFn: getAllPosts
    // refetchInterval: 3000,
    // server => 0
    // development => 3

    // refetchOnMount: false,
    // retry: 3,
    // retryDelay: 3000,
    // gcTime: 3000,
  })

  // console.log(data, 'data')
  // console.log(isLoading, 'isLoading')
  // console.log(isError, 'isError')
  // console.log(isFetching, 'isFetching')

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
          <title>Linked Posts</title>
        </Helmet>
        <div className='mb-5 text-center'>
          <AddPost />
        </div>
        {data?.data?.posts.map(function (post, idx) {
          return <Post key={idx} post={post} />
        })}
      </section>
    </>
  )
}

export default Home
