import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { useDropzone } from 'react-dropzone'


export const Post = () => {

const [postText,setPostText] = useState('')
const [postfile,setPostFile] = useState(null)
const [clicked,setClicked] = useState(false)
const {fileStore,postTextStore,userData} = useAuth()

const onDrop = useCallback(acceptedFiles => {
  
 setPostFile(acceptedFiles[0])
}, [])

const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


const handleSubmit = (e) => {
  e.preventDefault()
  if(postfile === null){
    postTextStore(postText);
  }else if(postfile !== null){
    postTextStore(postText,postfile)
  }
  setPostFile(null);
  setPostText('');
}

const handleImgPost = () =>{
  if(clicked){
  setClicked(false)
  }else{
    setClicked(true)
  }
}

  return (  
    <div className='z-10 p-1 sm:m-4 bg-dark sm:rounded max-sm:m-0 max-sm:p-0 max-sm:rounded-none '>
      
      <div className='flex flex-column p-2 justify-center m-1 max-sm:m-0 max-sm:p-1 '>
        <p className='text-white font-serif mx-2 max-sm:hidden'>Creat Post</p>
        <div className='flex flex-row items-center'>
          <img src={userData[0]?.url} className='w-10 h-10 rounded-full mr-3'/>
          <input type='text' className='w-full outline-none p-2 rounded-2xl outline-none h-10'
                    value={postText}
                    onChange={(e)=>{setPostText(e.target.value)}}/>
          <i class="bi bi-images text-green-500 text-3xl mx-2 sm:hidden" onClick={handleImgPost}></i>
        </div>
        
        {clicked ? <div className='w-full backdrop-blur-md mt-2 bg-white absolute sm:inset-x-80 inset-y-40 flex flex-col justify-center items-center p-3 rounded max-sm:inset-x-1'>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-row items-center'>
              <img src={userData[0]?.url} className='w-10 h-10 rounded-full'/> 
              <span className='mx-2'>{userData[0]?.username}</span>
            </div>
            <i class="bi bi-x-circle-fill text-dark text-2xl cursor-pointer" onClick={()=>setClicked(false)}></i>
          </div>
        <input type='text' className='w-full outline-none p-2 max-[414px]:w-full rounded outline-none h-10 border-b mt-2 '
                    value={postText}
                    onChange={(e)=>{setPostText(e.target.value)}} placeholder='Write Here'/>
        <div {...getRootProps()} className='rounded my-2 border-2 border-dark w-full h-full border-dotted flex flex-col justify-center items-center'>
          <input {...getInputProps()}  />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <>
              <p>Drag 'n' drop some files here, or click to select files</p>
              <i className="bi bi-dropbox text-dark text-5xl"></i>
              </>
          }
        </div>
      
        <button onClick={handleSubmit} className='bg-blue-500 w-full py-1 rounded'>Post</button>
        </div>
        : null }
        
        <div className='mt-1 ml-20 max-sm:hidden'>
          <button onClick={handleImgPost} className="mx-2 bg-yellow-500 w-20 mt-1 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full max-[395px]:w-50 p-1 " >Image</button>
          <button  onClick={handleSubmit} className="bg-blue-500 mt-1 w-20 mb-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full max-[395px]:w-50 p-1 " >Post</button>
        </div> 
      </div>
    </div>
  )
}
