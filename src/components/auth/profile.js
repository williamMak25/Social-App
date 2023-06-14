import { signOut } from 'firebase/auth'
import React, {useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { auth} from '../../firebase/firebase'
import { useAuth } from '../FunctionForPost/userFunctionContext'


export const Profile = () => {
    const {currentUser,userData,ProfilePictureStore,userTextPosts} = useAuth();
    const [toggleBox,setToggleBox] = useState('hidden')
    const [profilePicture,setProfilePicture] = useState()
    // for log out user account

    const handleSignOut = ()=>{
        signOut(auth);
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
    <div className="flex flex-column justify-center items-center w-full h-screen max-[414px]:p-0 p-3">
      
      <div className='min-[414px]:flex flex-column items-center mx-5 px-3 max-[414px]:flex flex-row m-0 p-0'>
        <img src={userData[0]?.url}
             alt='profilePicture'
             className='max-[414px]:w-16 h-16 rounded-circle'
             />
        <div className='m-1'>
            <h3 className='text-center'>{userData[0]?.username}</h3>
            <p className='opacity-50 text-center'>{currentUser?.email}</p> 
        </div>
      </div>

      <div className='mx-1 px-1 mb-3'>
        <button className='text-blue-400' onClick={handleSignOut}>LogOut</button>
        <NavLink to='/'><button className='text-blue-400 mx-3'>Home</button></NavLink>
        <button className='text-blue-400'
                onClick={handleToggle}>Edit</button>
        
      </div>
        
      <div className={toggleBox}>
        <div className='bg-gray-600 rounded shadow shadow-inner shadow-zinc-400 absolute inset-x-40 p-5 inset-y-40 max-[414px]:abosolute left-0 right-0 inset-y-40 z-10'>

            <h4 className='text-center text-cyan-400'>Select Photo from Your Device</h4>
            <hr/>
            <div className='mx-5 my-5 max-[414px]:mx-2 my-2'>
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

      <div className='warp overflow-auto h-screen min-[415px]:w-[500px] flex flex-column items-center max-[414px]:w-full'>
          {userTextPosts.map((post)=>{
            return (
              <div  className=' flex flex-column justify-start items-center my-1 rounded border bg-dark p-2
              max-[414px]:p-0 w-full' key={post.data.time}>

                <div className='border-dark rounded w-full'>
                  <div className='flex items-center justify-start'>
                      
                      <img src={userData[0]?.url}
                        className=" m-2 w-[30px] h-[30px] rounded-full"
                        alt='profileImg'/>
                    <div>
                        <h5 className='text-start m-0'>{userData[0]?.username}</h5>
                        <small className='m-0 p-0 text-sm opacity-50'>{post.data.time}</small>
                    </div>
                  </div>

                  <div className='w-full '>
                            {/*<img src={postImgUrl}
                          className='img-fluid m-2' alt='postImg'/>*/}
                            <p className='p-2 mx-3'>{post?.data.userpost}</p>
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
