
import { ActiveNow } from '../ActiveNowPage/ActiveNow'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { Header } from '../Header/Header'
import { Post } from '../Header/post'
import { SideBar } from '../sideBar/sideBar'
import { LoadingPage } from '../loading/loading'
import background from '../profileBg.png'
import { ChatBox } from '../chat/chatBox'
import '../../App.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  const {profileImgUrl,userData,allUserPost,alluserInfo,loading,commentFun,comments} = useAuth();
  const [show,setShow] = useState(false);
  const [commentBox,setCommentBox] = useState(null);
  const [like,setLike] = useState(false)
  const [comment,setComment] = useState('')
  const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

  const handleComment = (postId,e)=>{
    
    if (e.key === 'Enter') {
      commentFun(comment[postId],postId)
      setComment('')
    }
  }

  const handleShowComment = (id) =>{
    if(commentBox === id){
      setCommentBox(null)
    }else{
      setCommentBox(id)
    }
  }
  return (
    <>
    <Header/>
  <div className='overflow-hidden h-screen bg-zinc-900 flex flex-row items-start max-[414px]:py-0'>

{/*..................create post bar Section from post Component.......................*/}
    <div className='max-[414px]:hidden'>
      <Post/>
      <ChatBox/>
    </div> 
      
        
        {/*<button className='w-14 h-14 rounded-circle bg-cyan-800 absolute left-5 bottom-5 z-20 text-lg text-white max-[395px]:absolute '>
        {show ? <i className="bi bi-envelope-open "onClick={()=>setShow(false)}></i> :
         <i className="bi bi-envelope" onClick={()=>setShow(true)}></i>}</button>
  {show ? : null}*/}

    <div className=' overflow-auto warp w-1/2 max-[414px]:w-full h-screen'>

{/*.....................All user post or newfeed container.......................*/}
      {loading ? <LoadingPage/> :    
        allUserPost.map((ite)=>{  
        return ite.post?.map((it)=>{
        return ( 
        <div className='flex flex-column justify-start items-start bg-dark text-light m-3 rounded max-[414px]:min-w-min m-1 p-1 flex flex-column justify-center'
                           key={it.id}>
          <div className='p-3 flex flex-column justify-start w-100 max-[414px]:p-1 m-0'>
            <div className='flex flex-row'>

                <img src={alluserInfo?.find( item => item.id === ite.id)?.url}
                    className="m-2"
                    alt='profileImg'
                    style={{width: '40px',
                          height: '40px',
                          borderRadius: '50%'}} />
                <div>
                <NavLink to={`/friend/${ite.id}`} className='no-underline text-white'><h5 className='my-1'>{alluserInfo?.find( item => item.id === ite.id)?.username}</h5></NavLink>
                  <small className='my-0'>{it.time}</small>
                </div>

            </div>

            <div className='p-2'>
              {/*<img src={postImgUrl}
                  className='img-fluid m-2' alt='postImg'/>*/}
                <p className='m-2'>{it.userpost}</p>
            </div>    

            <hr className='w-100 mb-1'/>

  {/*..........................like and comment button.......................*/}            
            <div className='flex flex-row items-center justify-around'>
                <button className='btn text-light'><i className="bi bi-hand-thumbs-up text-lg"></i> Like</button>
                <button className='btn text-light' onClick={()=>handleShowComment(it.id)}><i className='bi bi-chat-square-dots'></i> Comment</button>
                                              
            </div>

            <hr className='w-100 mt-1'/>
                            
  {/*..........................Comment Section.......................*/}

              {(commentBox === it.id) ? comments?.filter((comment) => comment.postid === it.id)?.map((cmt) => {

               return cmt?.commentedUsers[1]?.map( item => {
                  
                  return item?.map( co => {
                  
                    return(
                      <>
                      <div key={cmt?.postId} className='mb-3 flex flex-row'>

                        <img src={alluserInfo?.find( user => user.id === cmt.commentedUsers[0])?.url}
                            className="m-2"
                            alt='profileImg'
                            style={{ width: '24px', height: '24px', borderRadius: '50%' }} />

                        <div className='flex flex-col justify-around bg-zinc-700 p-2 rounded-xl' key={co?.time}>

                          <span className='text-sm font-extrabold mx-2'>{alluserInfo?.find( user => user.id === cmt.commentedUsers[0])?.username}</span>
    
                          <span className='text-white mt-1 text-sm mx-2'>{co?.comment}</span>

                        </div>
                      </div>
                      
                      </>
                    )
                  })
                })
                        
                        
              }):null}
              <textarea value={comment[it.id] || ""}
              className='outline-none resize-none text-white bg-transparent rounded w-full h-7 px-1'
              placeholder='write comment here'
              onChange={e => setComment({ ...comment,[it.id]: e.target.value })}
              onKeyDown={(e)=>handleComment(it.id,e)}/>
            
          </div>
        </div>)})
            })}
      </div>
   {/*.....................show user profile in desktop mood.......................*/}
      

    </div>

  </>
  )
}
/*<textarea value={comment[it.id] || ""}
              className='outline-none resize-none text-white bg-transparent border rounded w-full h-7 px-1'
              onChange={e => setComment({ ...comment,[it.id]: e.target.value })}
              onKeyDown={(e)=>handleComment(it.id,e)}/>*/