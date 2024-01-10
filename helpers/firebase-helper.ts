// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
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

export const getBlob = async (uri: string) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    resolve(xhr.response);
  };

  xhr.onerror = function (e) {
    console.error(e);
    reject(new TypeError("Network request failed!"));
  };

  xhr.responseType = "blob";
  xhr.open("GET", uri, true);
  xhr.send();
}) as Promise<Blob>