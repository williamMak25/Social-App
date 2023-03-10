import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext';

export const SignupPage = () => {
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {signup} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email,password,userName);
        navigate('/')
    }
  return (
    <>
        <form onSubmit={handleSubmit}
              className='flex flex-column justifycenter items-center mx-5 my-5 w-auto '>
          <h2>Create Your Accout</h2><br/>
          <div>
            <label>User Name</label>
            <input type='text'
                   value={userName}
                   className='block border outline-none rounded p-1'
                   onChange={(e)=>setUserName(e.target.value)}/>
          </div><br/>
          <div>
            <label>Email</label>
            <input type='email'
                   value={email}
                   className='block border outline-none rounded p-1'
                   onChange={(e)=>setEmail(e.target.value)}/>
          </div><br/>
          <div>
            <label>Password</label>
            <input type='password'
                   value={password}
                   className='block border outline-none rounded p-1'
                   onChange={(e)=>setPassword(e.target.value)}/>
          </div><br/>
            <button className='btn btn-primary'>Sign Up</button><br/>
          <div>
            <span>If You already have account<NavLink to='/login'>Log In </NavLink>Here.</span>
          </div>
        </form>
    </>
  )
}
