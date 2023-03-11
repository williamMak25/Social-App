
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext';
import { LoadingPage } from '../loading/loading';
import background from '../profileBg.png'

export const FriendProfile = () => {
    const {user} = useParams(null);
    const {allUserPost,userNames,profileImgUrl} = useAuth(); // data from context
    const [friendData,setFriendData] = useState([])
    const [friendName,setFriendName] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    const navigate = useNavigate()
    useEffect(() => {
        try{
            let friendNames = userNames.find( name => name.id === user)
            let friendPosts = allUserPost.find(item => item.id === user);
            setFriendData(friendPosts);
            setFriendName(friendNames);
            setIsLoading(false)
        }
        catch(err){
          console.log(err)
        }

    }, [allUserPost, user]);



return (
    <>
 {isLoading ? <LoadingPage/> :
    <div className='bg-dark text-white h-screen'>
    <div className="flex flex-column justify-center items-center w-full h-screen max-[395px]:p-0 p-3">

        <div className='min-[395px]:flex flex-column items-center mx-5 px-3 max-[395px]:flex flex-row m-0 p-0'>
            <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                 alt='profilePicture'
                 className='max-[395px]:w-16 h-16 rounded-circle'/>
            <div className='m-2'>
                <h3 className='text-center'>{friendName?.username}</h3>
            </div>
            <div className='mx-1 px-1 mb-3'>
                <button className='text-blue-400 mx-3' onClick={()=>navigate('/')}>Home</button>
                 <NavLink to={`/chatbox/${user}`}><button className='text-blue-400 mx-3'>Message</button></NavLink>     
            </div>
        </div>

        <div className='warp overflow-auto h-screen w-full flex flex-column items-center'>
         {isLoading ? <LoadingPage/> : friendData?.post.map((data)=>{
            return (
              <div  className='min-[395px]: flex flex-column justify-start items-center my-1 rounded border bg-dark
                                max-[395px]:p-0 w-80' key={data.time}>
                <div className='border-dark rounded w-full'>
                    <div className='flex items-center justify-start'>
                      
                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                        className="img-fluid m-2"
                        style={{width: '40px',
                                height: '40px',
                                borderRadius: '50%'}}
                        alt='profileImg'/>
                      <div>
                        <h5 className='text-start m-0'>{friendName?.username}</h5>
                      </div>
                    </div>

                    <div className='w-full '>
                            {/*<img src={postImgUrl}
                          className='img-fluid m-2' alt='postImg'/>*/}
                            <p className='p-2 mx-3'>{data.userpost}</p>
                    </div>
                        <hr className='m-1'/>
                    <div>
                        <button className='btn text-light'><i className="bi bi-hand-thumbs-up"></i> Like</button>
                        <button className='btn text-light'><i className="bi bi-chat-left"></i> Comment</button>
                    </div>

                </div>
              </div>
            )

          })}
      </div>
    </div>
    </div>}
    </>
  )}
