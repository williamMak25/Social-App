
import './App.css';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth, UserContext } from './components/FunctionForPost/userFunctionContext';
import { SignupPage } from './components/auth/signup';
import { LoginPage } from './components/auth/login';
import { Profile } from './components/auth/profile';
import { PrivateRoute } from './components/utils/privateRoute';
import { ChatBox } from './components/chat/chatBox';

import { HomePage } from './components/DisplayPage/HomePage';
import { FriendProfile } from './components/DisplayPage/friendProfile';
import { ActiveNow } from './components/ActiveNowPage/ActiveNow';
import { Chat } from './components/chat/chat';

function App() {
  return (
  <UserContext>
  <Routes>
    <Route element={<PrivateRoute/>}>
      <Route path='/' element={<HomePage/>}/>   
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/friend' element={<ActiveNow/>}/>
      <Route path='/chatbox' element={<ChatBox/>}/>
      <Route path='/friend/:user' element={<FriendProfile/>}/>
      <Route path='/chatbox/:chatUser' element={<Chat/>}/>
    </Route>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
  </Routes>
    </UserContext>
  );
}

export default App;
