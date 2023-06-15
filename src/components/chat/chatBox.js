
import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { get, ref } from 'firebase/database'
import { realDataB } from '../../firebase/firebase'


export const ChatBox = () => {
  const {allChat,currentUser,friends,chatFunction,allMessage} = useAuth()
  const [singleChat,setSingleChat] = useState()
  
  
 useEffect(()=>{
  
  let findMess = [];
  const temp = allChat?.find( item => item?.id === currentUser?.uid)
  findMess.push(temp);
 
  if (findMess[0]?.chat) {
   const sectemp = Object.entries(findMess[0].chat).map(([id, message]) => {
      return{ id: id, message: message };
    });
    setSingleChat(sectemp)
  }
  
 },[allChat])

  return (
    <>
    <div className='h-[390px] p-2 bg-dark max-[414px]:h-screen min-[415px]:rounded min-[415px]:mx-4 max-[414px]:w-full max-[414px]:mx-0'>
      <NavLink to='/' className='min-[415px]:hidden'><i class="bi bi-arrow-up-left-circle-fill text-white"></i></NavLink>
      <h4 className='text-cyan-400 p-2 rounded my-0 dotted text-center mb-2 text-xl'>Chat History</h4>
        {singleChat && singleChat?.map((item)=>{
       {/**let lastIndex = Object.values(item.message[0]).length - 1;*/}
        return(
        <div className='flex flex-row justify-between items-center rounded text-white p-2 '>
          <div className='flex flex-row items-center'>
            <img src={friends?.find( name => name?.id === item.id)?.url} className='w-10 h-10 rounded-full'/>     
            <small className='mx-2 text-cyan-400'>{friends?.find( name => name?.id === item.id)?.username}</small>
               
          </div>
          <NavLink to={`/chatbox/${item?.id}`}><button className='m-2 text-cyan-400 mx-2 px-3'>Message</button></NavLink>
        </div>)
        
       })}
    </div>
    </>
  )
}


    
