import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext'


export const Post = () => {

const [postText,setPostText] = useState('')
const [postfile,setPostFile] = useState(null)

const {fileStore,postTextStore} = useAuth()

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
    <div className='min-[395px]:sticky top-0 flex flex-column justify-center bg-dark rounded max-[390px]:m-0 rounded pb-1 bg-dark static'>
      <form className='flex flex-column items-start justify-center m-1 max-[395px]:p-1 '
       onSubmit={handleSubmit}>
        <textarea className='w-full outline-none p-2 max-[395px]:w-full rounded outline-none'
       // style={{width:'100%',height:100}}
        value={postText}
        onChange={(e)=>{setPostText(e.target.value)}}/>

        <input type='file' className='min:[395px]:block m-2 text-slate-500
                   file:mr-3 file:py-2 file:px-5
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100 max-[395px]:w-50 file:m-0'
        onChange={(e)=>{setPostFile(e.target.files[0])}}/>

        <button className="bg-blue-500 w-1/2 mt-1 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full max-[395px]:w-50 p-1 " >Post</button>
      </form>
    </div>
  )
}
