import React from 'react'
import cookie from './cookie.png'
export const LoadingPage = () => {
  return (
      <div className='d-flex flex-column pt-2 justify-content-center align-items-center'>
        
          <img src={cookie} className='w-25 opacity-25' />
          <hr className='m-2'/>
          <div class="spinner-border text-info" role="status">
              <span class="visually-hidden">Loading...</span>
          </div> 
          <p className='m-2'>Please Wait</p>
          
      </div>
  )
}
