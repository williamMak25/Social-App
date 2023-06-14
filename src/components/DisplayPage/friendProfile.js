
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../FunctionForPost/userFunctionContext';
import { LoadingPage } from '../loading/loading';
import background from '../profileBg.png'

export const FriendProfile = ({profileId}) => {
    const {user} = useParams(null);
    const {allUserPost,friends,profileImgUrl} = useAuth(); // data from context
    const [friendData,setFriendData] = useState([])
    const [ID,setID] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    const navigate = useNavigate()

    
    useEffect(() => {
      let id = user ? user : profileId ;
      setID(id)
        if(allUserPost && friends){
          setIsLoading(false)
        }else{
          setIsLoading(true)
        }

    },[allUserPost,friends,ID]);
return (
    <>
 {isLoading ? <LoadingPage/> :
    <div className='text-white h-screen w-full'>
    <div className="bg-zinc-900 flex flex-column justify-center items-center w-full h-screen max-[414px]:p-0 p-3">

        <div className='min-[415px]:flex flex-column items-center mx-5 px-3 max-[414px]:flex flex-row m-0 p-0'>
            <img src={friends?.filter( name => name?.id === ID)[0]?.url}
                 alt='profilePicture'
                 className='max-[414px]:w-16 max-[414px]:h-16 rounded-full w-40 h-40'/>
            <div className='m-2'>
                <h3 className='text-center'>{friends?.filter( name => name?.id === ID)[0]?.username}</h3>
            </div>
            <div className='mx-1 px-1 mb-3'>
                <button className='text-blue-400 mx-3' onClick={()=>navigate('/')}>Home</button>
                 <NavLink to={`/chatbox/${ID}`}><button className='text-blue-400 mx-3'>Message</button></NavLink>     
            </div>
        </div>

        <div className='warp overflow-auto h-screen min-[415px]:w-[500px] flex flex-column items-center max-[414px]:w-full'>
         {allUserPost ? allUserPost?.find( name => name?.id === ID)?.post?.map((data)=>{
          
            return (
              <div  className=' flex flex-column justify-start items-center my-1 rounded border bg-dark p-2
                                max-[414px]:p-0 w-full' key={data.time}>
                <div className='border-dark rounded w-full'>
                    <div className='flex items-center justify-start'>
                      
                      <img src={friends?.filter( name => name?.id === ID)[0]?.url} className=" m-2 w-[30px] h-[30px] rounded-full"alt='profileImg'/>
                      <div className='mx-2'>
                        <h5 className='text-start m-0'>{friends?.filter( name => name?.id === ID)[0]?.username}</h5>
                        <small className='text-sm opacity-50'>{data?.time}</small>
                      </div>
                    </div>

                    <div className='w-full mt-1'>
                            {/*<img src={postImgUrl}
                          className='img-fluid m-2' alt='postImg'/>*/}
                            <p className='p-2'>{data.userpost}</p>
                            
                    </div>
                        <hr className='m-1'/>
                    <div>
                        <button className='btn text-light'><i className="bi bi-hand-thumbs-up"></i> Like</button>
                        <button className='btn text-light'><i className="bi bi-chat-left"></i> Comment</button>
                    </div>

                </div>
              </div>
            )

          }) : <LoadingPage/> }
      </div>
    </div>
    </div>}
    </>
  )}
