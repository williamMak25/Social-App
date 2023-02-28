
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
    <div className='d-flex justify-content-between flex-row vh-100 w-100 text-white bg-dark'
         style={{ backgroundImage:`url(${background})`,
                  backgroundSize:'100vh',
                  backgroundRepeat:'no-repeat',
                  backgroundPosition:'center'}}>

        <ActiveNow/>
        <div className='warp overflow-auto w-50 pb-3'>

            <Post/>

            {loading ? <LoadingPage/> :    
              allUserPost.map((ite)=>{  
              return ite.post.map((it)=>{
                  return ( 
                      <div className='container d-flex flex-column justify-content-start align-items-start p-2 my-1 rounded bg-black bg-opacity-50'
                           key={it.time}>
                        <div className='border w-100 border-dark rounded p-2'>
                            <div className='d-flex align-items-center'>
                                  <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                                   className="img-fluid m-2"
                                   alt='profileImg'
                                   style={{width: '40px',
                                          height: '40px',
                                          borderRadius: '50%'}} />
                                <div>
                                  <h5 className='align-middle m-0'>{userNames.find( item => item.id === ite.id).username}</h5>
                                  <small className='m-0 p-0 opacity-50'>{it.time}</small>
                                </div>
                            </div>

                            <div className='w-100 '>
                                {/*<img src={postImgUrl}
                                        className='img-fluid m-2' alt='postImg'/>*/}
                                  <p className='p-2'>{it.userpost}</p>
                            </div>    

                            <hr className='my-1'/>

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
