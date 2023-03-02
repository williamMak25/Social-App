import { signOut } from 'firebase/auth'
import React, {useState } from 'react'
import { NavLink } from 'react-router-dom'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import background from '../profileBg.png'
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
//...... toggeling the change profile-picture box.......//

    const handleToggle = () =>{
      setToggleBox('show')
    }
    const handleToggleBack = () =>{
      setToggleBox('hidden')
    }

  return (
  <div className='bg-dark text-white h-screen'>
    <div className="flex flex-column justify-center items-center p-5 w-full h-screen">
      
      <div className='flex flex-column items-center mx-5 px-3'>
        <img src={profileImgUrl ? profileImgUrl : initialPhoto}
             alt='profilePicture'
             className='w-28 h-28 rounded-circle'
             />
        <div className='m-2'>
            <h3 className='text-center'>{oneUserName}</h3>
            <p className='opacity-50 text-center'>{currentUser.email}</p> 
        </div>
      </div>

      <div className='mx-5 px-4'>
        <button className='btn btn-primary m-2' onClick={handleSignOut}>Log Out</button>
        <button className='btn btn-primary m-2'
                onClick={handleToggle}>Edit Profile</button>
        <NavLink to='/'><button className='btn btn-primary m-2'>Home</button></NavLink>
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

      <div className='warp overflow-auto h-screen w-full flex flex-column items-center p-2'>
          {userTextPosts.map((post)=>{
            return (
              <div  className='p-2 flex flex-column justify-center items-center my-1 rounded border bg-dark' key={post.data.time}>

                <div className='border w-full border-dark rounded p-2'>
                  <div className='flex items-center justify-center'>
                      
                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                        className="img-fluid m-2"
                        style={{width: '40px',
                                height: '40px',
                                borderRadius: '50%'}}
                        alt='profileImg'/>
                    <div>
                        <h5 className='text-start m-0'>{oneUserName}</h5>
                        <small className='m-0 p-0 opacity-50'>{post.data.time}</small>
                    </div>
                  </div>

                  <div className='w-full '>
                            {/*<img src={postImgUrl}
                          className='img-fluid m-2' alt='postImg'/>*/}
                            <p className='p-2 mx-3'>{post.data.userpost}</p>
                  </div>
                        <hr className='m-1'/>
                  <div>
                      <button className='btn text-light'><i className="bi bi-hand-thumbs-up"></i> Like</button>
                      <button className='btn text-light'><i className="bi bi-chat-left"></i> Comment</button>
                  </div>
                </div>

              </div>)
          })}
      </div>

    </div>
  </div>
  )
}
