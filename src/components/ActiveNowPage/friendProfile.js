
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
    <div className='bg-dark text-white py-2 px-5 vh-100'
    style={{backgroundImage:`url(${background})`,
            backgroundSize:'100vh',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'center'}}>
    <div className="d-flex flex-column align-items-center w-100 vh-100">

        <div className='d-flex flex-column m-2 align-items-center'>
            <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                 alt='profilePicture'
                 style={{width: '100px',
                    height: '100px',
                    borderRadius: '50%'}}/>
            <div className='d-inline m-3'>
                <h3 className='text-center'>{friendName?.username}</h3>
            </div>
            <div>
                <button className='btn btn-dark border mx-2 px-2' onClick={handleBack}>Home</button>
                <button className='btn btn-dark border mx-2 px-3'>Message</button>
            </div>
        </div>

        <div className='overflow-auto m-2 warp w-100'>
         {isLoading ? <LoadingPage/> : friendData?.post.map((data)=>{
            return (
              <div  className=' container p-2 my-1 w-100 rounded bg-black bg-opacity-25' key={data.time}>
                <div className='border w-100 border-dark rounded'>
                    <div className='d-flex align-items-center'>
                      
                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                        className="img-fluid m-2"
                        style={{width: '40px',
                                height: '40px',
                                borderRadius: '50%'}}
                        alt='profileImg'/>
                      <h5 className='align-middle'>{friendName?.username}</h5>

                    </div>

                    <div className='w-100 '>
                            {/*<img src={postImgUrl}
                          className='img-fluid m-2' alt='postImg'/>*/}
                            <p className='p-2 mx-3'>{data.userpost}</p>
                    </div>

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
