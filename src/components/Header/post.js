import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import './post.css'

export const Post = () => {

const [postText,setPostText] = useState('')
const [postfile,setPostFile] = useState(null)

const {fileStore,postTextStore} = useAuth()

const handleSubmit = (e) => {
  e.preventDefault()
  fileStore(postfile);
  postTextStore(postText);
  setPostFile(null);
  setPostText('');
}

  return (  
    <div className='container sticky-sm-top my-3 bg-dark rounded p-2'>
      <form className='d-flex flex-column rounded textArea'
       onSubmit={handleSubmit}>
        <textarea className='h-100 d-inline-block my-1'
        style={{width:'100%',height:600}}
        value={postText}
        onChange={(e)=>{setPostText(e.target.value)}}/>

        <input type='file' className='my-1 h-100'
        onChange={(e)=>{setPostFile(e.target.files[0])}}/>

        <button className="btn btn-dark border my-1" >Post</button>
      </form>
    </div>
  )
}
