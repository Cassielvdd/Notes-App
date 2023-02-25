import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCMLKIOhQN0xquXmzYNlwy_DljPpSFwfG8",

  authDomain: "krakramaps.firebaseapp.com",

  projectId: "krakramaps",

  storageBucket: "krakramaps.appspot.com",

  messagingSenderId: "1059192754699",

  appId: "1:1059192754699:web:a52f50fab539d2f3ecad0e",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
