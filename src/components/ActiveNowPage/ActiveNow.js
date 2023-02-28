
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { LoadingPage } from '../loading/loading';
import {SkeletonTheme}from 'react-loading-skeleton'
export const ActiveNow = () => {

  const {friends,loading} = useAuth();

  return (
    <div className='border border-dark w-25 bg-dark p-3 d-flex flex-column '>

      <h2><i class="bi bi-people"></i> Friends</h2>
      {loading ? <div className='w-25 opacity-25'>
                  <hr className='m-2'/> 
                  <div class="spinner-border text-light" role="status">
      
                      <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
      :
        friends?.map((name)=>{
          return(
            
            <div key={name.id} className='w-100 border my-2 rounded p-2'>
              <NavLink to={`/friend/${name.id}`} className='d-inline text-white text-decoration-none'>{name.username}</NavLink>
            </div>)
                       
       })}
    </div>
  )
}
