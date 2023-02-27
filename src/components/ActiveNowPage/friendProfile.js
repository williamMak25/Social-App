
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext';

export const FriendProfile = () => {
    const {user,profileImgUrl} = useParams();
    const {allUserPost,userNames} = useAuth(); // data from context
    const [friendData,setFriendData] = useState([])
    const [friendName,setFriendName] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    const navigate = useNavigate()

    useEffect(() => {
            const friendNames = userNames.find( name => name.id === user)
            const friendPosts = allUserPost.find(item => item.id === user);
            setFriendData(friendPosts);
            setFriendName(friendNames)
            setIsLoading(false);

    }, [allUserPost, user]);

    const handleBack = () => {
        navigate('/')
    }

return (
    <>
    {isLoading ? (<div>Loading...</div>)
    :
    (<div className='bg-dark text-white vh-100'>
    <div className="d-flex flex-column align-items-center p-3 shadow w-100 vh-100">

        <div className='d-flex flex-column m-2 align-items-center'>
            <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                 alt='profilePicture'
                 className='photo'/>
            <div className='d-inline m-3'>
                <h3 className='text-center'>{friendName.username}</h3>
            </div>
            <div>
                <button className='btn btn-dark border mx-2 px-2' onClick={handleBack}>Home</button>
                <button className='btn btn-dark border mx-2 px-3'>Add</button>
            </div>
        </div>

        <div className='postContainer m-2'>
         {friendData?.post.map((data)=>{

            return (
              <div  className='container p-2 post my-1 rounded bg-black bg-opacity-25' key={data.time}>
                <div className='border w-100 border-dark rounded'>
                    <div className='d-flex align-items-center'>
                      
                      <img src={profileImgUrl ? profileImgUrl : initialPhoto}
                        className="img-fluid m-2 profileImg" alt='profileImg'/>
                      <h5 className='align-middle'>{friendName.username}</h5>

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
    </div>)}
    </>
  )}
