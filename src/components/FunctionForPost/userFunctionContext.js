import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged,signOut} from 'firebase/auth';
import { getDownloadURL, uploadBytes,ref as storage_ref } from 'firebase/storage';
import { get, set,ref as database_ref, update } from 'firebase/database';
import React, { useContext, useState ,useEffect} from 'react'
import { auth, db, postRef, realDataB, storage } from '../../firebase/firebase';
import uuid from 'react-uuid';

// creating context 

const authContext = React.createContext();
export const useAuth = () =>{
    return useContext(authContext)
}

export const UserContext = ({children}) => {

const [postImgUrl,setPostImgUrl] = useState();
const [userData,setuserData] = useState([]);// registered all user name
const [currentUser,setCurrentUser] = useState([]);// current login user(authentication)
const [userTextPosts,setUserTextPosts] = useState([]);// one user(current user or you) text post
const [allUserPost,setAllUserPost] = useState([]);// all user who use these app text post
const [friends,setFriends] = useState();// userinfo except you
const [chatuserState,setChatuserState] = useState('');
const [alluserInfo,setAlluserInfo] = useState()
const [loading,setLoading] = useState(true); // loading state data is arrive or not from database
const [allChat,setAllChat] = useState([]);// all user chat 
const [comments,setComments] = useState()// all user comment

    const [userTypedSms,setUserTypedSms] = useState([]);
    const [otherSideSms,setOtherSideSms] = useState([]);
    const [allMessage,setAllMessage] = useState()

useEffect(()=>{
  onAuthStateChanged(auth, async(user)=>{ 
      if(user){
          setCurrentUser(user)// set user email to show on UI
    
          const profileRef = database_ref(realDataB,`profile/${user.uid}`);
          const postRef = database_ref(realDataB,`post/${user.uid}`);
          const allpostRef = database_ref(realDataB,'post/');
          const chatRef = database_ref(realDataB,'chat/');
          const commentRef = database_ref(realDataB,'comment/')

  //.......retrieving all chats from database......//
        get(chatRef).then((snapshot)=>{
          let temp = [];
          snapshot.forEach((chat)=>{
            temp.push({
              id:chat.key,
              chat: chat.val()
            })
          })
          setAllChat(temp)
        })
  //........retrieving data(all usernames) from firebase and adding into new array for display in UI...//

          const getProfileNames = database_ref(realDataB,'profile/')

          await get(getProfileNames).then((snapshot)=>{
            let userNameArray = []
            snapshot.forEach((item)=>{
              userNameArray.push({
                id:item?.key,
                username:item?.val().username,
                url:item?.val().url,
              })
            })
            setAlluserInfo(userNameArray); // all user info

            const loginuserDataTemp = userNameArray.filter( item => item.id === user.uid)
             setuserData(loginuserDataTemp); // set login user info for UI

             const tempusers = userNameArray.filter( (item) => item.id !== user.uid);
             setFriends(tempusers); // set user info without login user
            })

  //.......retrieving data(one user post or log in user post) form firebase and add into new array for display in UI...//

          await get(postRef).then((snapshot)=>{
              let userPostArray = []
              snapshot.forEach((data)=>{
                userPostArray.push({
                  id:data.key,
                  data: data.val()
                })
              })
              setUserTextPosts(userPostArray);
            })

  //.......retrieving data(all user post) from firebase........//

 
        await get(allpostRef).then((posts)=>{
              let allpostArray = [];
              posts.forEach((data)=>{
                
                allpostArray.push({
                  id:data.key,
                  post:data.val()
                 
                })
              })
              
              let tempArray = []
              allpostArray.forEach(item => {
                const ids = item.id;
                const post = Object.values(item.post)
               tempArray.push({
                id:ids,
                post:post
               })
              });
              setAllUserPost(tempArray)
            })

  //......retrieving comment..........//


      await get(commentRef).then((snapshot)=>{
        let temp = []
        snapshot.forEach((com)=>{
        
          let item = []
        Object.values(com.val()).forEach((ite)=>{
         item.push(Object.values(ite))
        })
          
          temp.push({
            postid:com.key,
            commentedUsers:[
               Object.keys(com.val()).toString(),
              item]
          })
          setComments(temp)
        })

      })
      
      setLoading(false)
      
      }else{
       setCurrentUser(null);
      }
  })
},[allUserPost,userData,allMessage])
//console.log(comments[0].commentedUsers)

// user Image post store in dataBase

const fileStore = (postfile)=>{
const imgRef = storage_ref(storage,`image/${currentUser.uid}/${postfile.name}`);
uploadBytes(imgRef,postfile)
.then((items)=>{
  getDownloadURL(imgRef)
  .then((url)=>{
    console.log(url)
    setPostImgUrl(url);  // Img url for display image on UI
  })
})
}

//user profile photo store

  const ProfilePictureStore = async(profilePicture) =>{
    const profileImgRef = storage_ref(storage,`profile/${currentUser.uid}/${profilePicture.name}`);

    await uploadBytes(profileImgRef,profilePicture)
    .then((snapshot)=>{
    
      let pfRef = storage_ref(storage,snapshot.metadata.fullPath);

        getDownloadURL(pfRef).then((url)=>{
          let updateRef = database_ref(realDataB,`profile/${currentUser.uid}/`);
          update(updateRef,{url: url})
        })
    })
  }

// user posting set on dataBase

const postTextStore = (postText) =>{
   const post1Ref = database_ref(realDataB,`post/${currentUser.uid}/${uuid()}`);

  set(post1Ref ,{
      time:new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString(),
      userpost:postText,
      id:uuid()
  })
}
// sign In for existing user
const login = (email,password)=>{
   signInWithEmailAndPassword(auth,email,password)
   .then((credential)=>{
    console.log(credential.user)
   })
}
// For user signUp 

const signup = (email,password,userName) =>{

  createUserWithEmailAndPassword(auth,email,password)
  .then((credential)=>{
  const profileRef = database_ref(realDataB,'profile/'+ credential.user.uid);
    set(profileRef,{
      username:userName,
      userId:credential.user.uid,
      url:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    });
  })
  .catch((error)=>{
    console.log(error.message)
  })
}
//.........ChatBox function(set and retrieving message to database)......./
const messaging = async(message,chatUserId)=>{
  const userMessageRef = database_ref(realDataB,`chat/${currentUser.uid}/${chatUserId}/messages${uuid()}`);
  await set(userMessageRef,{
    userSms:message,
    time:new Date().toString(),
    id:currentUser.uid
  })
}
//........comment section(set comment)....//
const commentFun = async(comment,postId)=>{
  const commentRef = database_ref(realDataB,`comment/${postId}/${currentUser?.uid}/${uuid()}` );
  await set(commentRef,{
    comment:comment,
    time:new Date(new Date().getTime()).toLocaleTimeString(),
  })
}


const chatFunction = (currentUser, chatUser) => {
  let getUserMessageRef = database_ref(realDataB, `chat/${currentUser?.uid}/${chatUser}`);
  let getOtherSideMessageRef = database_ref(realDataB, `chat/${chatUser}/${currentUser?.uid}`);

  Promise.all([get(getUserMessageRef), get(getOtherSideMessageRef)])
    .then(([userSnapshot, otherSideSnapshot]) => {
      let tempArray = [];
      userSnapshot.forEach((message) => {
        tempArray.push({
          id: message.val().id,
          time: message.val().time,
          SMS: message.val().userSms,
        });
      });

      setUserTypedSms(tempArray);

      let sectempArray = [];
      otherSideSnapshot.forEach((message) => {
        sectempArray.push({
          id: message.val().id,
          time: message.val().time,
          SMS: message.val().userSms,
        });
      });

      setOtherSideSms(sectempArray);

      let finaltemp = userTypedSms.concat(otherSideSms).sort((a, b) => new Date(a.time) - new Date(b.time));
      setAllMessage(finaltemp);
    })
    .catch((error) => {
      // Handle any errors that occurred during fetching data
    });
};

// context Values
  const value = {
    fileStore,
    postTextStore,
    ProfilePictureStore,
    login,
    signup,
    currentUser, // checking currently user log in or not
    userData, // username for display
    userTextPosts, // text-post data of one user 
    alluserInfo,
    allUserPost, // tesxt-post of all user
    postImgUrl,
    friends,
    loading,
    messaging,
    commentFun,
    allChat,
    comments,
    chatFunction,
    allMessage
  }

  return (
   <authContext.Provider value={value}>
    {children}
   </authContext.Provider>
  )
}
