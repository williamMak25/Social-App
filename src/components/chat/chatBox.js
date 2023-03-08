
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
    <div className='absolute left-10 bottom-10 w-76 overflow-auto z-10 p-2 bg-zinc-900 h-1/2 rounded shadow'>
      <h4 className='text-cyan-400 bg-dark p-2 rounded my-0 dotted text-center w-full mb-2'>Chat History</h4>
       {singleChat && singleChat?.map((item)=>{
        return(
        <div className='justify-between rounded text-white py-2 flex flex-row bg-dark'>
                
                <div className='ml-2 flex flex-row items-center mx-2'>
                  <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                      className='w-10 h-10 rounded-circle mr-2'/>
                      <small>{userNames?.find( name => name.id === item.id).username}</small>
                </div>
                <NavLink to={`/chatbox/${item.id}`}><button className='m-2 text-cyan-400 mx-2 px-3'>Message</button></NavLink>
        </div>)
       })}
    </div>
    </>
  )
}
