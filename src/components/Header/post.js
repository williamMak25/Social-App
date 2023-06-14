import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext'


export const Post = () => {

const [postText,setPostText] = useState('')
const [postfile,setPostFile] = useState(null)

const {fileStore,postTextStore,userData} = useAuth()

const handleSubmit = (e) => {
  e.preventDefault()
  if(postfile === null){
    postTextStore(postText);
  }else if(postfile !== null){
    fileStore(postfile);
    postTextStore(postText)
  }
  setPostFile(null);
  setPostText('');
}

  return (  
    <div className='z-10 m-4 flex flex-column justify-center bg-dark rounded max-[414px]:m-0 rounded pb-1 '>
      
      <form className='flex flex-column p-2 justify-center m-1 max-[414px]:p-1 '
       >
        <p className='text-white font-serif mx-2'>Creat Post</p>
        <div className='flex flex-row'>
          <img src={userData[0]?.url} className='w-10 h-10 rounded-full mx-3'/>
          <input type='text' className='w-full outline-none p-2 max-[414px]:w-full rounded outline-none h-10'
                    value={postText}
                    onChange={(e)=>{setPostText(e.target.value)}}/>
        </div>
        
        
       {/*<input type='file' className='min:[395px]:block m-2 text-slate-500
                   file:mr-3 file:py-2 file:px-5
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100 max-[395px]:w-50 file:m-0'
        onChange={(e)=>{setPostFile(e.target.files[0])}}/> */}
        <div className='mt-2 ml-20'>
          <button className="mx-2 bg-yellow-500 w-20 mt-1 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full max-[395px]:w-50 p-1 " >Image</button>
          <button  onClick={handleSubmit} className="bg-blue-500 mt-1 w-20 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full max-[395px]:w-50 p-1 " >Post</button>
        </div> 
      </form>
    </div>
  )
}
