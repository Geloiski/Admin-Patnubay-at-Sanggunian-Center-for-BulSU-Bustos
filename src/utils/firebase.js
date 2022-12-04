import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
//import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  // apiKey: "AIzaSyCMw3-OS8TQwbsGYpiKxwtUCggIH8cSLiA",
  // authDomain: "patnubay-at-sanggunian-bulsu.firebaseapp.com",
  // projectId: "patnubay-at-sanggunian-bulsu",
  // storageBucket: "patnubay-at-sanggunian-bulsu.appspot.com",
  // messagingSenderId: "866992976659",
  // appId: "1:866992976659:web:4a0f318fe23b9d265c60e6"

  //apiKey: "AIzaSyAmfUn8ZVm3sVyKOdGJO0P4QjimW7hxrC4",
  //authDomain: "patnubay-at-sanggunian-bulsu-2.firebaseapp.com",
  //projectId: "patnubay-at-sanggunian-bulsu-2",
  //storageBucket: "patnubay-at-sanggunian-bulsu-2.appspot.com",
  //messagingSenderId: "590104772539",
  //appId: "1:590104772539:web:9fedbbad27e9b61e850e9e"
  apiKey: "AIzaSyC4gkqdzRiMZLklFGmlKPSS9alKbRHfC_8",
  authDomain: "pasan-587e7.firebaseapp.com",
  projectId: "pasan-587e7",
  storageBucket: "pasan-587e7.appspot.com",
  messagingSenderId: "308406508581",
  appId: "1:308406508581:web:0ff34d8831bef0caf9b3cc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
