import React, { useEffect, useState } from 'react'
import { ActiveNow } from '../ActiveNowPage/ActiveNow'
import { Profile } from '../auth/profile'
import { Chat } from '../chat/chat'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { Post } from '../Header/post'
import { SideBar } from '../sideBar/sideBar'
import './homePage.css'

export const HomePage = () => {
  const {profileImgUrl,allUserPost,postImgUrl,userNames} = useAuth();
  const [newfeedPosts,setNewfeedPost] = useState([]);
  const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

  
  return (
    <div className='homePageContainer'>
      <ActiveNow/>
        <div className='warp overflow-auto w-50 shadow bg-dark pb-5'>

          <Post/>
            {allUserPost.map((ite)=>{
              
              return ite.post.map((it)=>{
                  return ( 
                <div className='container p-2 post my-1 rounded bg-black bg-opacity-25'key={it.time} >
                <div className='border w-100 border-dark rounded'>
                  <div className='d-flex align-items-center'>
                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                        className="img-fluid m-2 profileImg" alt='profileImg'/>
                        
                      <h5 className='align-middle'>{userNames.find( item => item.id === ite.id).username}</h5>
                  </div>
                  <div className='w-100 '>
                    {/*<img src={postImgUrl}
                          className='img-fluid m-2' alt='postImg'/>*/}
                    <p className='p-2'>{it.userpost}</p>
                  </div>    
                  <hr className='my-1'/>
                  <div>
                    <button className='btn text-light'><i className="bi bi-hand-thumbs-up"></i> Like</button>
                    <button className='btn text-light'><i className="bi bi-chat-left"></i> Comment</button>
                  </div>
                </div>
                </div>)
                })
             /* return(

             
              )*/
            })}

        </div>
        <SideBar/>
    </div>
  )
}
