
import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext'


export const ChatBox = () => {
  const {allChat,currentUser,userNames} = useAuth()
  const [singleChat,setSingleChat] = useState([])
  const [userAllMessage,setUserAllMessage] = useState([])
 useEffect(()=>{
    
  setUserAllMessage(allChat?.filter(item => item.id === currentUser.uid));
  let temp = []
   userAllMessage.forEach((item)=>{
    temp.push({
      id:Object.keys(item.chat).toString(),
      message:Object.values(item.chat)
    })
    setSingleChat(temp)
  })
 },[allChat])
  return (
    <>
    <div className='mw-100 absolute bottom-20 left-10 z-10 p-2 bg-cyan-800 rounded max-[395px]:hidden'>
      <h4 className='text-white dotted ml-1'>Chat History</h4>
       {singleChat && singleChat?.map((item)=>{
        return(
        <div className='flex flex-row bg-white rounded'>
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                      className='w-10 h-10 rounded-circle'/>
                <div className='ml-2'>
                  <small>{userNames?.find( name => name.id === item.id).username}</small>
                  <NavLink to={`/chatbox/${item.id}`}><button className='m-2 text-cyan-400 mx-2 px-3'>Message</button></NavLink>
                </div>
        </div>)
       })}
    </div>
    </>
  )
}
