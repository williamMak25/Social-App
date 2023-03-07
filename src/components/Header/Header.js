
import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ActiveNow } from '../ActiveNowPage/ActiveNow'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { NavigateBar } from './navigatebar'

export const Header = () => {
  const [displayBar,setDisplayBar] = useState('hidden');
  const {oneUserName,friends,loading} = useAuth()
  const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  const handleBar = () =>{
    setDisplayBar('block')
  }

  return (
      <div className='min-[395px]:hidden sticky top-0 z-[1] max-[395px]:block'>
        <nav className='bg-dark border-b flex flex-row justify-between items-center pt-2 m-0 '>
          <NavLink to='/' className='ml-3 text-white no-underline font-serif'><h2>ConNet</h2></NavLink>
          <div className='flex flex-row'>
           
            <button className='mx-3' onClick={handleBar}><h4><i className="bi bi-grid text-blue-500"></i></h4></button>
          </div>
        </nav>

        <div className={displayBar}>
          <div className='fixed top-0 z-10 bg-dark w-100 h-screen items-center'>
            <div className='p-4 pb-2 flex flex-row justify-between items-center'>
              <h1 className='text-white'>Menu</h1>
              <p className='text-white' onClick={()=>setDisplayBar('hidden')}><i className="bi bi-fullscreen-exit"></i></p>
            </div><hr className='text-white mt-0'/>
          
            <div className='mx-5 rounded-tl-none rounded bg-stone-700 p-3 w-75'>
              <NavLink to='/profile' className='no-underline text-white '>
                <img src={initialPhoto}
                      alt='profilePicture'
                      className='w-10 h-10 inline rounded-circle'/>
                <h3 className='inline ml-2'>{oneUserName}</h3>
              </NavLink> 
            </div>

            <h4 className='text-white mt-4 text-center'> Friends</h4>
          
            <div className='mx-5'> 
              {loading ? <div className='w-25 opacity-25'>
                              <hr className='m-2'/> 
                              <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                              </div>
                         </div>
              :
              friends?.map((name)=>{
                return(
                  <div key={name.id} className='bg-stone-700  m-2 rounded flex flex-row items-center justify-center'>
                    <NavLink to={`/friend/${name.id}`} className='no-underline text-light m-2 font-serif text-center'><h4>{name.username}</h4></NavLink>
                    <NavLink to={`/chatbox/${name.id}`} className='m-2'><h4><i className="bi bi-chat-dots"></i></h4></NavLink>
                  </div>)                
                  })}
            </div>
            <h1 className='text-white text-body-tertiary text-center mb-0 mt-20 font-serif'>ConNet</h1>
            <small className='text-white block text-center'>Spend Your Valuable Time with us</small>
          </div>   
        </div>
      </div>)}
