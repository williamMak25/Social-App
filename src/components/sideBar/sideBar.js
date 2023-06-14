import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import logo from '../ActiveNowPage/logo.png'
import { LoadingPage } from '../loading/loading'
export const SideBar = () => {

    const {currentUser,userData,loading} = useAuth();
    const navigate = useNavigate();

    return (
      <>
   {!loading ? <div class="absolute right-5 top-10 flex flex-column items-center rounded-b bg-dark shadow shadow-zinc-300 text-white py-4 m-2 mt-2 w-1/4 max-[414px]:hidden">
  
        <img src={userData[0]?.url}
             alt='profilePicture'
             className='w-20 rounded-circle shadow shadow-zinc-300'/>
        <h4 className='mt-3 text-center text-cyan-400'>{userData[0]?.username}</h4>
        <p className='text-center'>{currentUser?.email}</p> 
          <button className='text-cyan-400'
                  onClick={()=> navigate('/profile')}>View Profile</button>

     {/* {currentUser ? <button
                className='text-rose-500'
                onClick={()=>signOut(auth)}>Log Out</button>: null}

<div className='text-white flex flex-column justify-center items-center opacity-25 h-64 mt-2 p-2'>
       <img src={logo} className='w-20 h-20 mb-2 '/>
       <h2 className='font-serif text-cyan-400'>ConNet</h2>
       <small className='text-center'>Spend Your valuable Time With Us</small>
    </div>*/}
     </div>: <LoadingPage/>} 
    </>
  )
}
