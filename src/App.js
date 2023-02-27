
import './App.css';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/homepage/HomePage';

import { useAuth, UserContext } from './components/FunctionForPost/userFunctionContext';
import { SignupPage } from './components/auth/signup';
import { LoginPage } from './components/auth/login';
import { Profile } from './components/auth/profile';
import { auth } from './firebase/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { PrivateRoute } from './components/utils/privateRoute';
import { Chat } from './components/chat/chat';

function App() {
  return (
  <UserContext>
      <Header/>
    
  <Routes>
    <Route element={<PrivateRoute/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Route>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
  </Routes>
    </UserContext>
  );
}

export default App;
