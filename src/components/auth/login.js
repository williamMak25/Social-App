import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../FunctionForPost/userFunctionContext';
import { SignupPage } from './signup';

export const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
            e.preventDefault();
            login(email,password);
            navigate('/')
    }
  return (
    <>
    <form onSubmit={handleSubmit}
          className='d-flex flex-column justify-content-center align-items-center mx-5 my-5 w-auto '>
      <h2>Log In In Your Accout</h2><br/>
      <div>
        <label>Email</label>
        <input type='email'
               className='d-block'
               value={email}
               onChange={(e)=>setEmail(e.target.value)} />
      </div><br/>
      <div>
        <label>Password</label>
        <input type='password'
               className='d-block'
               value={password}
               onChange={e=>setPassword(e.target.value)}/>
      </div><br/>
        <button className='btn btn-primary'>Log In</button><br/>
      <div className='d'>
        <span className='d-block'>If you don't have account? <NavLink to='/signup'
                 className=''>Sign up</NavLink> here</span>
      </div>
    </form>
    </>
  )
}
