import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGPccz2dWzdGNc2M0DQvprl7j2JXjYvEg",
  authDomain: "socialapp-b9ac1.firebaseapp.com",
  databaseURL: "https://socialapp-b9ac1-default-rtdb.firebaseio.com",
  projectId: "socialapp-b9ac1",
  storageBucket: "socialapp-b9ac1.appspot.com",
  messagingSenderId: "544489679921",
  appId: "1:544489679921:web:4048f4d8c11a041d26f910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const realDataB = getDatabase(app);
export const postRef = ref(realDataB,'post/');