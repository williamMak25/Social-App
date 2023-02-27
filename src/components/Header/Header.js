import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import './header.css'
import { Post } from './post'

export const Header = () => {
  const {currentUser,profileImgUrl} = useAuth();
  const notify = () =>{
   toast('🦄 Wow so easy!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  }

  return (
    <div className='headerWarp'>  
    <div className='headerContainer'>
    <nav className='navBar bg-dark border-bottom border-secondary-subtle border-opacity-25'>
       <NavLink to='/' onClick={notify}><li className='itemOne'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
</svg></li></NavLink>

{currentUser ? <button
                className='btn btn-white text-white border'
                onClick={()=>signOut(auth)}>Log Out</button>: null}
    </nav>
    </div>
    </div>
  )
}
