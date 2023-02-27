import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { realDataB } from '../../firebase/firebase'

export const Chat = () => {
  const [count,setcount] = useState(0)

  const handleMeassage = () =>{
    const chatRef = ref(realDataB,`chat/chatid1/message/message${count}`);
    set(chatRef,{
      message:'hello'
    })
   setcount(count + 1)
  }
    

  return (
    <div className='border mw-100'>
        <button onClick={handleMeassage}>Click me</button>
        <h1></h1>
    </div>
  )
}
