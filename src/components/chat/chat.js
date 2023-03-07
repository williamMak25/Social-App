import { get, ref, set } from 'firebase/database';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { realDataB } from '../../firebase/firebase';
import { useAuth } from '../FunctionForPost/userFunctionContext';
import './chat.css'

export const Chat = () => {
    const {messaging,currentUser,userNames} = useAuth();
    const {chatUser,user} = useParams();
    const [message,setMessage] = useState([]);
    const [userTypedSms,setUserTypedSms] = useState([]);
    const [otherSideSms,setOtherSideSms] = useState([]);
    const [allMessage,setAllMessage] = useState()
   // const date = new Date(new Date().getTime() + 4*60*60*1000).toLocaleDateString();
    useEffect(()=>{
        const getUserMessageRef = ref(realDataB,`chat/${currentUser.uid}/${chatUser}`);
         get(getUserMessageRef).then((snapshot)=>{
          let tempArray = [];
          
            snapshot.forEach((message)=>{
              tempArray.push({
              id: message.val().id,
              time: message.val().time,
              SMS : message.val().userSms
            }) 
            })
            setUserTypedSms(tempArray)
          }) 
          const getOtherSideMessageRef = ref(realDataB,`chat/${chatUser}/${currentUser.uid}`);
          get(getOtherSideMessageRef).then((snapshot)=>{
           let sectempArray = [];

          snapshot.forEach((message)=>{
              sectempArray.push({
              id: message.val().id,
              time: message.val().time,
              SMS : message.val().userSms
            }) 
            })
             setOtherSideSms(sectempArray)
           })
           let finaltemp = userTypedSms.concat(otherSideSms).sort((a, b) => new Date(a.time) - new Date(b.time))
           setAllMessage(finaltemp)
    },[userTypedSms,otherSideSms]);

    const handleMessage = ()=>{
        messaging(message,chatUser);
        setMessage('') //// heeeeeeeeeeee
      }//
  return (
    <>
   
    <div className='flex flex-column justify-center items-center w-full h-screen bg-dark max-[395px]:block'>
    <NavLink to='/' className='text-4xl w-80 text-end max-[395px]:hidden'><i className="bi bi-x text-white"></i></NavLink>
        <div className='flex flex-row items-center justify-start bg-white w-80 px-2 py-1 rounded-t drop-shadow mt-1 max-[395px]:w-screen'>
            <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
               className='w-10 h-10 rounded-circle'/>
            <h4 className='pt-2 px-2 text-center text-gray-500'>{userNames?.find( name => name.id === chatUser).username}</h4>
        </div>

          <div className='messages-container flex flex-column overflow-y-auto w-80 h-1/2 bg-slate-400 max-[395px]:w-screen h-min'> 
              {allMessage && allMessage.map((message, index) => (
                <div key={index} className={message.id === currentUser.uid ? 'message user' : 'message sender'}>
                    <div className='text-sm text-lg'>{message.SMS}</div>
                    <div className='text-sm'>{}</div>
                </div>
              ))}
        </div>
  <div className='bg-white w-80 flex flex-row rounded-b max-[395px]:w-screen'>
    <input type='text'
           value={message}
           className='w-4/5 outline-none p-1 rounded'
           onChange={ e => setMessage(e.target.value)}/>
    <button className='w-1/5 bg-green-300 h-9 rounded'
            onClick={handleMessage}><i className="bi bi-send-fill"></i></button>
  </div>
    </div>
    </>
  )
}
