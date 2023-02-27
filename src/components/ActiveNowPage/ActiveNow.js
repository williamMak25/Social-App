
import { NavLink, useParams } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext'

export const ActiveNow = () => {

  const {friends} = useAuth();
  console.log(friends)

  return (
    <div className='border border-dark w-25 bg-dark p-3 d-flex flex-column '>
      <h2><i class="bi bi-people"></i> Friends</h2>
       {friends?.map((name)=>{
        return(
          <div key={name.id} className='w-100 border my-2 rounded p-2'>
            
            <NavLink to={`/friend/${name.id}`} className='d-inline text-white text-decoration-none'>{name.username}</NavLink>
          </div>
        )
       })}
       
    </div>
  )
}
