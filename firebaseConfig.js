import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA80UICgHc-2eBzjXiw5NTMXyo2EBqzyAQ",
  authDomain: "timecraft-stse.firebaseapp.com",
  projectId: "timecraft-stse",
  storageBucket: "timecraft-stse.appspot.com",
  messagingSenderId: "174603527770",
  appId: "1:174603527770:web:a5eb54efb666e57fa4da63",
  measurementId: "G-F1PVMH4VB9"
};

// Check if Firebase has already been initialized to prevent re-initializing
let auth;
if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  firestore = getFirestore(app);
} else {
  const app = getApps()[0]; // Use the already initialized app
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  firestore = getFirestore(app);
}

export default auth;
