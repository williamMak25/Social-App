
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { LoadingPage } from '../loading/loading';
import {SkeletonTheme}from 'react-loading-skeleton'
import logo from './logo.png'
import { ChatBox } from '../chat/chatBox';
import { FriendProfile } from '../DisplayPage/friendProfile';
import { useState } from 'react';
export const ActiveNow = () => {

  const {friends,loading} = useAuth();
  const [clicked,setclicked] = useState(false);
  const [profileId,setProfileId] = useState(null)
  const handleShow = (id) =>{
    setProfileId(id);
    if(!clicked || profileId !== id){
      setclicked(true)
    }else{
      setclicked(!clicked)
    }

  }
  return (
  <div className='bg-zinc-900 pr-3 h-screen w-full max-[395px]:hidden'>
    {loading ? <div className='w-25 opacity-25'>
                  <hr className='m-2'/> 
                  <div class="spinner-border text-light" role="status">
      
                      <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
      :
    <div className='flex flex-row w-full'>  
      <div className=' shadow shadow-zinc-400 p-5 h-screen w-2/5'>

        <h2 className='text-white min-[600px]:text-center'><i class="bi bi-search"></i> Find Friends</h2>
        <hr className='text-white'/>
      
        {friends?.map((name)=>{
     
          return(
            
            <div key={name.id} className={profileId === name.id ? 'cursor-pointer m-2 py-2 px-4 flex flex-row items-center justify-between hover:bg-zinc-900 bg-dark rounded' : 'cursor-pointer m-2 py-2 px-4 flex flex-row items-center justify-between hover:bg-zinc-900' }
           >
              <div className='flex flex-row items-center'  onClick={()=>handleShow(name.id)}>  
                <img src={name?.url} className='w-10 h-10 rounded-full mr-5'/>
                <span className='text-xl text-white'>{name?.username}</span>
              </div>
              <span className='text-white ml-5 text-xl'><i class="bi bi-plus-lg"></i></span>
              {/*<NavLink to={`/chatbox/${name.id}`} className='no-underline text-black'><i className="bi bi-chat-dots"></i></NavLink>*/}
            </div>)
                       
       })}
      </div>
      <div className='w-full bg-dark ml-3 text-white h-screen p-0'>
        {clicked ? <FriendProfile profileId={profileId}/> : 
        <div className='flex flex-col justify-center items-center h-full'>
          <img src='https://i.ibb.co/dQQ3cXB/wqewq.png' alt='ser' className='w-20'/>
          <p>Find Someone...?</p>
        </div>}
        
      </div>
    </div>}  
  </div>
  )
}
