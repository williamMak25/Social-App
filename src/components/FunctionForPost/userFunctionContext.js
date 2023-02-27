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
const [friends,setFriends] = useState([]);
const [profileImgUrl,setProfileImgUrl] = useState('');
const [profileImgName,setProfileImgName] = useState('')
console.log(profileImgUrl)


// checking user log in or not ]

useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{ 
      if(user){
          setCurrentUser(user) // set user email to show on UI
    
          const profileRef = database_ref(realDataB,`profile/${user.uid}`);
          const postRef = database_ref(realDataB,`post/${user.uid}`);
          const allpostRef = database_ref(realDataB,'post/');

  //.........retrieving current log in user name from data base...................//

          get(profileRef).then((snapshot)=>{
              let user = [];
              snapshot.forEach((ite)=>{
                user.push(ite.val())
              })
              setOneUserName(user)
          })
  //........retrieving data(all usernames) from firebase and adding into new array for display in UI...//

          const getProfileNames = database_ref(realDataB,'profile/')
            get(getProfileNames).then((snapshot)=>{
            let userNameArray = []
            snapshot.forEach((item)=>{
              userNameArray.push({
                id:item.key,
                username:item.val().username
              })
            })
             setUserNames(userNameArray); // set username for UI
              console.log(userNameArray)
              let activeUser = []
             const tempusers = userNameArray.find( (item) => item.id !== currentUser.uid);
             activeUser.push(tempusers)
             console.log(tempusers)
             setFriends(activeUser);
            })

  //.......retrieving data(one user post) form firebase and add into new array for display in UI...//

            get(postRef).then((snapshot)=>{
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

 
            get(allpostRef).then((posts)=>{
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
                console.log(post)
               tempArray.push({
                id:ids,
                post:post
               })
              });
              console.log(tempArray)
              setAllUserPost(tempArray)
            })
  //......retrieving profile picture..........//
      }else{
       setCurrentUser(null);
      }
  })
},[])

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
      time:Date(),
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
    friends
  }

  return (
   <authContext.Provider value={value}>
    {children}
   </authContext.Provider>
  )
}
