
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { LoadingPage } from '../loading/loading';
import {SkeletonTheme}from 'react-loading-skeleton'
import logo from './logo.png'
export const ActiveNow = () => {

  const {friends,loading} = useAuth();

  return (
  <div className='pr-3 h-screen max-[395px]:hidden'>
    <div className='min-[600px]:block shadow shadow-zinc-400 p-5'>

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
            
            <div key={name.id} className='bg-neutral-300 m-2 py-2 px-5 rounded'>
              <NavLink to={`/friend/${name.id}`} className='no-underline text-black'>{name.username}</NavLink>
            </div>)
                       
       })}
    </div>
    <div className='text-white flex flex-column justify-center items-center opacity-50 h-64 mt-5 p-2'>
       <img src={logo} className='w-20 h-20 mb-2 '/>
       <h2 className='font-serif text-cyan-400'>ConNet</h2>
       <small className='text-center'>Spend Your valuable Time With Us</small>
    </div>
     
  </div>
  )
}
