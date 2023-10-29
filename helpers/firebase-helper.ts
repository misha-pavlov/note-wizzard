// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBsU_31d5P6sL3CuaVVNMUL3TbczJONMLg",
    authDomain: "note-wizard.firebaseapp.com",
    projectId: "note-wizard",
    storageBucket: "note-wizard.appspot.com",
    messagingSenderId: "352040301940",
    appId: "1:352040301940:web:66ef3ab7c7371377192821",
    measurementId: "G-0X3314JSK5",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
