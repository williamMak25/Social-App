import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import logo from '../ActiveNowPage/logo.png'
export const SideBar = () => {
    const {currentUser,oneUserName,ProfilePictureStore,profileImgUrl,userTextPosts} = useAuth();
    const [toggleBox,setToggleBox] = useState('hidden')
    const [profilePicture,setProfilePicture] = useState();
    const navigate = useNavigate()
    const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

    


  return (
    <div class="flex flex-column shadow shadow-zinc-300 text-white p-5 m-2 mt-2 w-1/4 h-screen max-[395px]:hidden">
      <div className='flex flex-column justify-center items-center'>
        <img src={profileImgUrl ? profileImgUrl : initialPhoto}
             alt='profilePicture'
             className='w-28 h-28 rounded-circle shadow shadow-zinc-300'/>
        <h4 className='mt-3 text-center text-cyan-400'> {oneUserName}</h4>
      </div><hr className=''width="100%"/>

      <div className='flex flex-column item-center'>
          <p className='text-center'>{currentUser.email}</p> 
          <button className='m-2 text-cyan-400'
                  onClick={()=> navigate('/profile')}>View Profile</button>
      </div>
      <hr className=''/>
      {currentUser ? <button
                className='text-rose-500'
                onClick={()=>signOut(auth)}>Log Out</button>: null}

<div className='text-white flex flex-column justify-center items-center opacity-25 h-64 mt-2 p-2'>
       <img src={logo} className='w-20 h-20 mb-2 '/>
       <h2 className='font-serif text-cyan-400'>ConNet</h2>
       <small className='text-center'>Spend Your valuable Time With Us</small>
    </div>
    </div>
  )
}
