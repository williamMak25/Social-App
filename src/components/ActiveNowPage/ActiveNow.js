import React, { useEffect, useState } from 'react'
import { useAuth } from '../FunctionForPost/userFunctionContext'

export const ActiveNow = () => {

  const {friends} = useAuth();
  console.log(friends)

  return (
    <div className='border border-dark w-25 bg-dark p-3 d-flex flex-column '>
      <h2><i class="bi bi-people"></i> Friends</h2>
       {friends.map((name)=>{
        return(
          <div key={name.id} className='w-100 border my-2 rounded p-2'>
            <p className='d-inline'>{name.username}</p>
          </div>
        )
       })}
    </div>
  )
}
