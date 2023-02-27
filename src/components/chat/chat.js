import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { realDataB } from '../../firebase/firebase'

export const Chat = () => {
  const [message,setMessage] = useState([])

  return (
    <div className='border mw-100'>
        <div>
          {message}
        </div>
        <input onChange={ e => setMessage(e.target.value)}></input>
        <button>Click me</button>

        
    </div>
  )
}
