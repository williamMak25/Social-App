
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { LoadingPage } from '../loading/loading';
import {SkeletonTheme}from 'react-loading-skeleton'
import logo from './logo.png'
import { ChatBox } from '../chat/chatBox';
export const ActiveNow = () => {

  const {friends,loading} = useAuth();

  return (
  <div className='pr-3 h-screen w-1/4 max-[395px]:hidden'>
    <div className='min-[600px]:block shadow shadow-zinc-400 p-5 h-screen'>

      <h2 className='text-white min-[600px]:text-center'> Friends</h2>
      <hr className='text-white'/>
      {loading ? <div className='w-25 opacity-25'>
                  <hr className='m-2'/> 
                  <div class="spinner-border text-light" role="status">
      
                      <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
      :
        friends?.map((name)=>{
          return(
            
            <div key={name.id} className='bg-zinc-400 m-2 py-2 px-4 rounded flex flex-row justify-between hover:bg-violet-100'>
              <NavLink to={`/friend/${name.id}`} className='no-underline text-black mr-3'>{name.username}</NavLink>
              <NavLink to={`/chatbox/${name.id}`} className='no-underline text-black'><i className="bi bi-chat-dots"></i></NavLink>
            </div>)
                       
       })}
    </div>  
  </div>
  )
}
