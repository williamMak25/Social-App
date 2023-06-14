import { signOut } from 'firebase/auth'
import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { SideBar } from '../sideBar/sideBar';
import '../../App.css'

export const Header = () => {
  const [displayBar,setDisplayBar] = useState('hidden');
  const [drop,setDrop] = useState(false)
  const {userData,friends,loading} = useAuth()
  const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  const handleBar = () =>{
    setDisplayBar('block')
  }
  const handleDropdown = () =>{
    if(drop){
      setDrop(!drop)
    }else{
      setDrop(true)
    }
  }
  return (
    <>
      <div className='min-[415px]:hidden sticky top-0 z-[1] '>
        <nav className='bg-dark h-12 border-b flex flex-row justify-between items-center pt-2 m-0 '>
          <NavLink to='/' className='ml-3 text-white no-underline font-serif'><h2>ConNet</h2></NavLink>
          <div className='flex flex-row items-center mx-3 mt-2'>
            <NavLink to='/chatbox'><h4 className='mx-2'><i class="bi bi-chat text-white "></i></h4></NavLink>
            <h4 onClick={handleBar} className='mx-2'><i className="bi bi-grid text-white"></i></h4>
          </div>
        </nav>

        <div className={displayBar}>
          <div className='fixed top-0 z-10 bg-dark w-100 h-screen items-center'>
            <div className='p-4 pb-2 flex flex-row justify-between items-center'>
              <h1 className='text-white'>Menu</h1>
              <p className='text-white' onClick={()=>setDisplayBar('hidden')}><i className="bi bi-fullscreen-exit"></i></p>
            </div><hr className='text-white mt-0'/>

            <NavLink to='/profile' className='no-underline text-white '>
              <div className='mx-5 rounded bg-stone-700 p-3 w-75 flex flex-row items-center'>
              
                <img src={userData[0]?.url}
                      alt='profilePicture'
                      className='w-10 h-10 inline rounded-circle'/>
                <span className='inline ml-6 text-xl'>{userData[0]?.username}</span>
              
              </div>
            </NavLink> 
            <h4 className='text-white mt-4 text-center'>Find Friends</h4>
          
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
                  <div key={name.id} className='bg-stone-700 m-2 rounded flex flex-row items-center justify-between p-2'>
                    <NavLink to={`/friend/${name.id}`} className='no-underline text-light mx-2 font-serif '><h4>{name.username}</h4></NavLink>
                    <h4 className='mx-2'><i class="bi bi-plus text-xl text-white"></i></h4>
                  </div>)                
                  })}
                <div className='flex justify-center items-center mt-5 mb-0'>
                  <button onClick={()=>signOut(auth)} className='text-rose-400 text-lg'>Log Out</button>
                </div>
            </div>
            <h1 className='text-white text-body-tertiary text-center mb-0 mt-20 font-serif'>ConNet</h1>
            <small className='text-white block text-center'>Spend Your Valuable Time with us</small>
          </div>   
        </div>
      </div>
{/*-------------------------desktop view-------------------- */}
<div className='sticky top-0 z-[30] h-12 shadow bg-dark overflow-a flex items-center justify-between warp max-[414px]:hidden'>

      <NavLink to='/' className='ml-3 text-white no-underline font-serif text-md'>ConNet</NavLink>
      <input type='text' className='w-1/2 outline-none'/>
      <div className='flex flex-row text-white'>          
        <button className='mr-3' onClick={handleDropdown}>Profile <i class="bi bi-chevron-compact-down mt-2"></i></button>
        <NavLink to='/friend'className='mx-3 text-white no-underline'>Friends</NavLink>
        <button className='mx-3 text-red-500' onClick={()=>signOut(auth)}>Log out</button>
      </div>
    
  {drop ? <SideBar/> : null}
</div>
      </>)}
