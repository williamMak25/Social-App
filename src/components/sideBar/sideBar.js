import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import './sideBar.css'
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
    <div class="d-flex flex-column align-items-center justify-content-start p-5 bg-dark shadow profileContainer  w-25">
      <div className='d-flex flex-column align-items-center'>
        <img src={profileImgUrl ? profileImgUrl : initialPhoto}
             alt='profilePicture'
             className='profilePhoto border-dark border'/>
        <h3 className='d-inline text-white m-1'> {oneUserName}</h3>
      </div><hr className='text-primary'width="100%"/>

      <div className={toggleBox}>
        <div className='d-flex justify-content-center flex-column p-3 bg-light border rounded text-dark'>
            <span onClick={handleToggleBack}><h4><i className="bi bi-x float-end cross "></i></h4></span>
            <h4>Select Photo from Your Device</h4>
            <hr/>
            <input type='file' accept='image/*'
                   onChange={(e)=>setProfilePicture(e.target.files[0])}/>
            <button className='btn btn-dark w-25 d-block mt-3 w-100'
                    onClick={handleClick}>Add</button>
        </div>
      </div>

      <div>
          <p className='text-center'>{currentUser.email}</p> 
          <button className='btn btn-dark border m-2'
                  onClick={handleToggle}>Edit Profile</button>
          <button className='btn btn-dark border m-2'
                  onClick={()=> navigate('/profile')}>View Profile</button>
      </div>
    </div>
  )
}
