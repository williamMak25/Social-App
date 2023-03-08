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
  <div className='bg-dark text-white h-screen '>
    <div className="flex flex-column justify-center items-center w-full h-screen max-[395px]:p-0 p-3">
      
      <div className='min-[395px]:flex flex-column items-center mx-5 px-3 max-[395px]:flex flex-row m-0 p-0'>
        <img src={profileImgUrl ? profileImgUrl : initialPhoto}
             alt='profilePicture'
             className='max-[395px]:w-16 h-16 rounded-circle'
             />
        <div className='m-1'>
            <h3 className='text-center'>{oneUserName}</h3>
            <p className='opacity-50 text-center'>{currentUser.email}</p> 
        </div>
      </div>

      <div className='mx-1 px-1 mb-3'>
        <button className='text-blue-400' onClick={handleSignOut}>LogOut</button>
        <NavLink to='/'><button className='text-blue-400 mx-3'>Home</button></NavLink>
        <button className='text-blue-400'
                onClick={handleToggle}>Edit</button>
        
      </div>
        
      <div className={toggleBox}>
        <div className='bg-gray-600 rounded shadow shadow-inner shadow-zinc-400 absolute inset-x-40 p-5 inset-y-40 max-[395px]:abosolute left-0 right-0 inset-y-40 z-10'>

            <h4 className='text-center text-cyan-400'>Select Photo from Your Device</h4>
            <hr/>
            <div className='mx-5 my-5 max-[395px]:mx-2 my-2'>
              <input type='file' accept='image/*'
                   className='m-5 px-3 block w-full text-sm text-slate-500
                   file:mr-3 file:py-2 file:px-5
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100
                   '
                   onChange={(e)=>setProfilePicture(e.target.files[0])}/>
            </div>
            <div className='flex flex-row justify-center items-center p-1'> 
              <button className='bg-dark p-2 w-32 rounded text-rose-500 m-3'
                      onClick={handleToggleBack}>Discard</button>
              <button className='bg-dark p-2 w-32 rounded m-3 '
                      onClick={handleClick}>Add</button>
            </div>

        </div>
      </div>

      <div className='warp overflow-auto h-screen w-full flex flex-column items-center'>
          {userTextPosts.map((post)=>{
            return (
              <div  className='min-[395px]: flex flex-column justify-start items-center my-1 rounded border bg-dark
                                max-[395px]:p-0 w-80' key={post.data.time}>

                <div className='border-dark rounded w-full'>
                  <div className='flex items-center justify-start'>
                      
                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                        className="img-fluid m-2"
                        style={{width: '40px',
                                height: '40px',
                                borderRadius: '50%'}}
                        alt='profileImg'/>
                    <div>
                        <h5 className='text-start m-0'>{oneUserName}</h5>
                        <small className='m-0 p-0 text-sm opacity-50'>{post.data.time}</small>
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
