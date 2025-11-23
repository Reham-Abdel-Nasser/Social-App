import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Profile from './Components/Profile/Profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './Components/PostDetails/PostDetails'

const App = () => {

    const client = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              {' '}
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              {' '}
              <Profile />{' '}
            </ProtectedRoute>
          )
        },
        {
          path: 'postDetails/:id',
          element: (
            <ProtectedRoute>
              {' '}
              <PostDetails />
            </ProtectedRoute>
          )
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: '*',
          element: (
            <div className='h-screen flex justify-center items-center'>
              <h1 className='text-7xl text-red-700'>404 NOT FOUND PAGE</h1>
            </div>
          )
        }
      ]
    }
  ])

  // tanstack query  one year ago its called react query

  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
