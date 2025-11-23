import React from 'react'
import Style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


/*
  for use any component   =>
    1-flowbite
    2- react flowbite
    3-anti design
    4-daisyui
    5-hero ui
    6-prime react
    7-chakra ui
    8-shadcn ui   => include grid system 
    9-material ui => mui => include grid system 
*/ 

const Layout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
      <h1 className='text-center text-4xl'>Footer</h1>
    </main>
  )
}

export default Layout