
import { ActiveNow } from '../ActiveNowPage/ActiveNow'
import { useAuth } from '../FunctionForPost/userFunctionContext'
import { Header } from '../Header/Header'
import { Post } from '../Header/post'
import { SideBar } from '../sideBar/sideBar'
import { LoadingPage } from '../loading/loading'
import background from '../profileBg.png'

export const HomePage = () => {
  const {profileImgUrl,allUserPost,userNames,loading} = useAuth();

  const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

  
  return (
    <>
    <Header/>
    <div className='overflow-auto h-screen bg-dark py-2 flex flex-row justify-around items-start max-[395px]:py-0'>
        <ActiveNow/>
        <div className='h-screen overflow-auto warp'>
            <Post/>
            {loading ? <LoadingPage/> :    
              allUserPost.map((ite)=>{  
              return ite.post.map((it)=>{
                  return ( 
                      <div className='flex flex-column justify-start items-start bg-zinc-900 text-light m-3 rounded max-[395px]:min-w-min m-1 p-1 flex flex-column justify-center'
                           key={it.time}>
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

                            <hr className='w-100'/>

                            <div>
                                <button className='btn text-light'><i className="bi bi-hand-thumbs-up"></i> Like</button>
                                <button className='btn text-light'><i className="bi bi-chat-left"></i> Comment</button>
                            </div>
                        </div>
                      </div>)
                })
            })}
        </div>

        <SideBar/>

    </div>
  </>
  )
}
