import { get, ref, set } from 'firebase/database';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { realDataB } from '../../firebase/firebase';
import { useAuth } from '../FunctionForPost/userFunctionContext';
import './chat.css'
import { LoadingPage } from '../loading/loading';

export const Chat = () => {
    const {messaging,currentUser,friends,chatFunction,allMessage} = useAuth(); 
    const {chatUser} = useParams();
    const [message,setMessage] = useState([]);
    const [windowWidth,setWindowWidth] = useState([])
    useEffect(()=>{
      chatFunction(currentUser,chatUser)
      let width = window.screen.width;
      setWindowWidth(width)
    },[currentUser,chatUser,allMessage]);
    console.log(windowWidth)


    const handleMessage = ()=>{
        messaging(message,chatUser);     
        setMessage('')
      }


  return (
    <>
   {allMessage ?
    <div className='p-px- flex flex-column w-full h-screen bg-dark'>
        
        <div className='w-full flex flex-row items-center justify-between bg-dark px-2 py-1 rounded-t drop-shadow mt-1'>
          <div className='flex flex-row p-2 items-center'>
            <img src={friends?.find( name => name.id === chatUser)?.url}
               className='w-10 h-10 rounded-circle mx-2'/>
            <h4 className='pt-2 px-2 text-center text-white'>{friends?.find( name => name.id === chatUser)?.username}</h4>
          </div>
          <NavLink to={windowWidth <= 414 ? '/chatbox' : '/'} className='text-4xl text-end '><i className="bi bi-x text-white"></i></NavLink> 
        </div>

        {(Object.keys(allMessage)?.length === 0)  ? 

        <div className='h-[530px] w-full text-white items-center messages-container flex flex-column justify-center overflow-y-auto bg-gray-600'>
          <p>There is no message!..</p>
          <p>Let's start now</p>
        </div> : 

        <div className='w-full messages-container flex flex-column overflow-y-auto w-80 bg-white'>
   
              {allMessage?.map((message, index) => (
                <div key={index} className={message?.id === currentUser.uid ? 'message user' : 'message sender'}>
                    <div className='text-sm text-lg'>{message?.SMS}</div>
                    <div className='text-sm opacity-70'>{new Date(message?.time).toLocaleTimeString()}</div>
                </div>
              ))}
        </div>

        }
        <div className='bg-dark w-full flex flex-row rounded-b py-2 px-1'>
          
          <input type='text'
           value={message}
           className='textInput outline-none p-1 rounded-lg'
           onChange={ e => setMessage(e.target.value)}/>

          <button className='messagebtn h-9 rounded'
            onClick={handleMessage}><i className="bi bi-send-fill text-white"></i></button>

        </div>

    </div> : <LoadingPage/>}
    </>
  )
}
