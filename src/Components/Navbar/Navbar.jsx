import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from './../../Context/AuthContext'

const Navbar = () => {
  const { token , logout:contextLogout } = useContext(authContext)

  const Navigate = useNavigate()

  function logout(){
    contextLogout()
    Navigate("/login")
  }

  return (
    <>
      <div className='navbar px-16 py-3 bg-base-100 shadow-2xl dark:shadow-blue-950'>
        <div className='flex-1'>
          {token ? (
            <Link
              to='/'
              className='btn btn-ghost text-2xl text-blue-600 dark:text-white font-bold '
            >
              Linked Posts
            </Link>
          ) : (
            <h1 className='text-2xl'>Login first</h1>
          )}
        </div>

        {token ? (
          <div className='flex gap-2'>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
              >
                <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                </Link>
              </li>

                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link to='/login' className='justify-between'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
