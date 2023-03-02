
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext';
import { LoadingPage } from '../loading/loading';
import background from '../profileBg.png'

export const FriendProfile = () => {
    const {user} = useParams(null);
    const {allUserPost,userNames,loading,profileImgUrl} = useAuth(); // data from context
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

    const handleBack = () => {
        navigate('/')
    }

return (
    <>
 {isLoading ? <LoadingPage/> :
    <div className='bg-dark text-white h-screen'>
    <div className="flex flex-column justify-center items-center p-5 w-full h-screen ">

        <div className='flex flex-column items-center mx-5 px-3 py-2'>
            <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                 alt='profilePicture'
                 className='w-28 h-28 rounded-circle'/>
            <div className='m-2'>
                <h3 className='text-center'>{friendName?.username}</h3>
            </div>
            <div>
                <button className='m-2 text-cyan-400 mx-2 px-2' onClick={handleBack}>Home</button>
                <button className='m-2 text-cyan-400 mx-2 px-3'>Message</button>
            </div>
        </div>

        <div className='warp overflow-auto h-screen w-full flex flex-column items-center p-2'>
         {isLoading ? <LoadingPage/> : friendData?.post.map((data)=>{
            return (
              <div  className='p-2 flex flex-column justify-center items-center w-96 my-1 rounded border bg-dark' key={data.time}>
                <div className='border w-full border-dark rounded p-2'>
                    <div className='flex items-start'>
                      
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
