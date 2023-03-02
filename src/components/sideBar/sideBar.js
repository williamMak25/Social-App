import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
export const SideBar = () => {
    const {currentUser,oneUserName,ProfilePictureStore,profileImgUrl,userTextPosts} = useAuth();
    const [toggleBox,setToggleBox] = useState('hidden')
    const [profilePicture,setProfilePicture] = useState();
    const navigate = useNavigate()
    const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

    
    // adding profile-picture 

    const handleClick = () =>{
      ProfilePictureStore(profilePicture);
      setToggleBox('hidden');
      
    }

    // toggeling the change profile-picture box

    const handleToggle = () =>{
      setToggleBox('show')
    }
    const handleToggleBack = () =>{
      setToggleBox('hidden')
    }

  return (
    <div class="flex flex-column shadow shadow-zinc-300 text-white p-5 m-2 mt-2 max-[395px]:hidden">
      <div className='flex flex-column justify-center items-center'>
        <img src={profileImgUrl ? profileImgUrl : initialPhoto}
             alt='profilePicture'
             className='w-28 h-28 rounded-circle shadow shadow-zinc-300'/>
        <h4 className='mt-3 text-center text-cyan-400'> {oneUserName}</h4>
      </div><hr className=''width="100%"/>

      <div className={toggleBox}>
        <div className='bg-gray-600 rounded shadow shadow-inner shadow-zinc-400 absolute inset-x-96 p-5 inset-y-40 '>

            <h4 className='text-center text-cyan-400'>Select Photo from Your Device</h4>
            <hr/>
            <div className='mx-5 my-5'>
              <input type='file' accept='image/*'
                   className='m-5 px-3 block w-full text-sm text-slate-500
                   file:mr-3 file:py-2 file:px-5
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100'
                   onChange={(e)=>setProfilePicture(e.target.files[0])}/>
            </div>
            <div className='flex flex-row justify-center items-center p-1'> 
              <button className='bg-dark p-2 w-32 rounded text-rose-500 m-3'
                      onClick={handleToggleBack}>Discard</button>
              <button className='bg-dark p-2 w-32 rounded m-3'
                      onClick={handleClick}>Add</button>
            </div>

        </div>
      </div>

      <div className='flex flex-column item-center'>
          <p className='text-center'>{currentUser.email}</p> 
          <button className='m-2 text-cyan-400'
                  onClick={handleToggle}>Edit Profile</button>
          <button className='m-2 text-cyan-400'
                  onClick={()=> navigate('/profile')}>View Profile</button>
      </div>
      <hr className=''/>
      {currentUser ? <button
                className='text-rose-500'
                onClick={()=>signOut(auth)}>Log Out</button>: null}
    </div>
  )
}
