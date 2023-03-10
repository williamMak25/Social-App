
import { ActiveNow } from '../ActiveNowPage/ActiveNow'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { Header } from '../Header/Header'
import { Post } from '../Header/post'
import { SideBar } from '../sideBar/sideBar'
import { LoadingPage } from '../loading/loading'
import background from '../profileBg.png'
import { ChatBox } from '../chat/chatBox'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export const HomePage = () => {
  const {profileImgUrl,allUserPost,userNames,loading,commentFun,comments} = useAuth();
  const [show,setShow] = useState(false);
  const [commentBox,setCommentBox] = useState(false);
  const [like,setLike] = useState(false)
  const [comment,setComment] = useState('')
  const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
 //console.log(comments)
  const handleComment = (postId,e)=>{
    
    if (e.key === 'Enter') {
      commentFun(comment[postId],postId)
      setComment('')
    }
  }
  return (
    <>
    <Header/>
    <div className='overflow-auto h-screen bg-dark flex flex-row justify-around items-start max-[395px]:py-0'>
        <ActiveNow/>
        <button className='w-14 h-14 rounded-circle bg-cyan-800 absolute left-5 bottom-5 z-20 text-lg text-white max-[395px]:absolute '>
        {show ? <i className="bi bi-envelope-open "onClick={()=>setShow(false)}></i> :
         <i className="bi bi-envelope" onClick={()=>setShow(true)}></i>}</button>
        {show ? <ChatBox/>: null}

      <div className='h-screen mt-1 overflow-auto warp w-1/2 max-[395px]:w-full'>
{/*..................create post bar Section from post Component.......................*/} 
            <Post/>

{/*.....................All user post or newfeed container.......................*/}
            {loading ? <LoadingPage/> :    
              allUserPost.map((ite)=>{  
              return ite.post?.map((it)=>{
                  return ( 
                      <div className='flex flex-column justify-start items-start bg-zinc-900 text-light m-3 rounded 
                      max-[395px]:min-w-min m-1 p-1 flex flex-column justify-center'
                           key={it.id}>
                        <div className='p-3 flex flex-column justify-start w-100 max-[395px]:p-1 m-0'>
                            <div className='flex flex-row'>
                                  <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                                   className="m-2"
                                   alt='profileImg'
                                   style={{width: '40px',
                                          height: '40px',
                                          borderRadius: '50%'}} />
                                <div>
                                  <h5 className='my-1'>{userNames.find( item => item.id === ite.id).username}</h5>
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
                                <button className='btn text-light'><i className="bi bi-hand-thumbs-up-fill text-lg"></i> Like</button>
                                {commentBox ? <button className='btn text-light'><i className='bi bi-chat-square-dots-fill'onClick={()=>setCommentBox(false)}></i> Comment</button>
                                            : <button className='btn text-light'><i className='bi bi-chat-square-dots'onClick={()=>setCommentBox(true)}></i> Comment</button>}   
                            </div>
                            <hr className='w-100 mt-1'/>

  {/*..........................Comment Section.......................*/}
              {commentBox ? comments?.filter((comment) => comment.postid === it.id).map((comment) => {
                        
                        return (
                            <div className='mb-2 p-2 rounded bg-zinc-800' key={comment.postid}>
                              <h6 className='text-serif opacity-50 underline underline-offset-4'>Comments</h6>
                              
                              {comment.comment.map((comm)=>{
                              return comm.map((ite)=> {
                                  return(
                                    <>
                                    <div className='flex flex-row items-center'>
                                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                                          className="m-2"
                                          alt='profileImg'
                                          style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                      <p className='m-0'>{userNames?.find(name => name.id === comment.commentedUserId)?.username}</p>
                                    </div>
                                    <div className='w-auto ml-5' key={ite.time}>
                                      <div className='ml-5 p-2 bg-zinc-700 h-10 rounded'>
                                        <p className='inline text-white mx-2'>{ite.comment}</p>
                                        <small className='opacity-25 underline'>{ite.time}</small>
                                      </div>
                                    </div>
                                    </>)
                                })
                              })}
                              
                            </div>)}):null}
                            <textarea value={comment[it.id] || ""}
                                        className='outline-none resize-none text-white bg-transparent border rounded w-full h-7 px-1'
                                        onChange={e => setComment({ ...comment,[it.id]: e.target.value })}
                                        onKeyDown={(e)=>handleComment(it.id,e)}/>
                        </div>
                      </div>)
                })
            })}
      </div>
   {/*.....................show user profile in desktop mood.......................*/}
        <SideBar/>

    </div>

  </>
  )
}
