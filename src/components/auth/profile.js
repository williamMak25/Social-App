import { signOut } from 'firebase/auth'
import { get, ref } from 'firebase/database'
import React, {useEffect, useState } from 'react'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import './profile.css'
export const Profile = () => {
    const {currentUser,oneUserName,ProfilePictureStore,profileImgUrl,userTextPosts} = useAuth();
    const [toggleBox,setToggleBox] = useState('hidden')
    const [profilePicture,setProfilePicture] = useState()
    const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    
   // 

    // for log out user account

    const handleSignOut = ()=>{
        signOut(auth);
        localStorage.setItem(`profileImg/`)
    }
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
  <div className='bg-dark text-white vh-100'>
    <div className="d-flex flex-column  justify-content-start p-5 shadow w-100 vh-100">
      
      <div className='d-flex flex-row'>
        <img src={profileImgUrl ? profileImgUrl : initialPhoto}
             alt='profilePicture'
             className='photo'/>
        <div className='d-inline m-3'>
            <h3 className='text-center'>Profile Name: {oneUserName}</h3>
            <p>{currentUser.email}</p> 
        </div>
      </div>

      <div>
        <button className='btn btn-primary w-25 m-2' onClick={handleSignOut}>Log Out</button>
        <button className='btn btn-primary w-25'
                onClick={handleToggle}>Edit Profile</button>
      </div>
        
      <div className={toggleBox}>
        <div className='position-absolute top-50 p-4 bg-primary rounded text-dark'>

            <span onClick={handleToggleBack}><h4><i class="bi bi-backspace"></i></h4></span>
            <h4>Select Photo from Your Device</h4>
            <label className='m-2'>Add Profile Picture</label>
            <input type='file'
                   onChange={(e)=>setProfilePicture(e.target.files[0])}/>
            <button className='btn btn-light w-25 d-block m-2'
                    onClick={handleClick}>Add</button>
        </div>
      </div>

      <div className='postContainer'>
          {userTextPosts.map((post)=>{
            return (
              <div key={post.data.id} className='bg-white text-dark p-2 my-4 rounded d-flex flex-column w-100 shadow-lg'>
              <h4 className='text-primary'>{oneUserName}</h4>
              <small>{post.data.time}</small>
              <p className='mx-2 p-2 ba'>{post.data.userpost}</p>
              </div>
            )
          })}
      </div>

    </div>
  </div>
  )
}
