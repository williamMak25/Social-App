import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,onAuthStateChanged,signOut} from 'firebase/auth';
import { getDownloadURL, uploadBytes,ref as storage_ref } from 'firebase/storage';
import { get, set,ref as database_ref, onValue } from 'firebase/database';
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
const [uid,setUid] = useState('');
const [userNames,setUserNames] = useState([]);
const [currentUser,setCurrentUser] = useState([]);
const [userTextPosts,setUserTextPosts] = useState([]);
const [allUserPost,setAllUserPost] = useState([]);
const [oneUserName,setOneUserName] = useState('');
const [friends,setFriends] = useState();
const [profileImgUrl,setProfileImgUrl] = useState('');
const [profileImgName,setProfileImgName] = useState('')
const [loading,setLoading] = useState(true);
const [allChat,setAllChat] = useState([])
const initialPhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
// checking user log in or not ]

useEffect(()=>{
  onAuthStateChanged(auth, async(user)=>{ 
      if(user){
          setCurrentUser(user)// set user email to show on UI
    
          const profileRef = database_ref(realDataB,`profile/${user.uid}`);
          const postRef = database_ref(realDataB,`post/${user.uid}`);
          const allpostRef = database_ref(realDataB,'post/');
          const chatRef = database_ref(realDataB,'chat/')

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

  //.........retrieving current log in user name from data base...................//

        await get(profileRef).then((snapshot)=>{
              let user = [];
              snapshot.forEach((ite)=>{
                user.push(ite.val())
              })
              setOneUserName(user)
          })
  //........retrieving data(all usernames) from firebase and adding into new array for display in UI...//

          const getProfileNames = database_ref(realDataB,'profile/')

          await get(getProfileNames).then((snapshot)=>{
            let userNameArray = []
            snapshot.forEach((item)=>{
              userNameArray.push({
                id:item.key,
                username:item.val().username
              })
            })
             setUserNames(userNameArray); // set username for UI

             const tempusers = userNameArray.filter( (item) => item.id !== user.uid);
             setFriends(tempusers);
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
            setLoading(false)
  //......retrieving profile picture..........//
      }else{
       setCurrentUser(null);
      }
  })
},[allUserPost])

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
  const ProfilePictureStore = (profilePicture) =>{
    const profileImgRef = storage_ref(storage,`profile/${currentUser.uid}/${profilePicture.name}`);
    setProfileImgName(profilePicture.name)
    uploadBytes(profileImgRef,profilePicture)
    .then((snapshot)=>{
      console.log(snapshot)
    })
 
  }
// user posting set on dataBase

const postTextStore = (postText) =>{
   const post1Ref = database_ref(realDataB,`post/${currentUser.uid}/${uuid()}`);

  set(post1Ref ,{
      time:new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString(),
      userpost:postText,
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
    setUid(credential.user.uid)
  const profileRef = database_ref(realDataB,'profile/'+ credential.user.uid);
    set(profileRef,{
      username:userName,
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


// context Values
  const value = {
    fileStore,
    postTextStore,
    ProfilePictureStore,
    login,
    signup,
    currentUser, // checking currently user log in or not
    userNames, // username for display
    userTextPosts, // text-post data of one user 
    profileImgUrl,
    allUserPost, // tesxt-post of all user
    postImgUrl,
    oneUserName,
    friends,
    initialPhoto,
    loading,
    messaging,
    allChat
  }

  return (
   <authContext.Provider value={value}>
    {children}
   </authContext.Provider>
  )
}
