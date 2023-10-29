import uuid from "react-native-uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getFirebaseApp } from "./firebase-helper";

export const uploadImage = async (uri: string) => {
  const app = getFirebaseApp();
  const blob: Blob = await new Promise((resolve, reject) => {
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
  });

  const pathFolder = "profilePics";
  const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);

  await uploadBytesResumable(storageRef, blob);

  // @ts-ignore - because blob actually has close function
  blob.close();

  return getDownloadURL(storageRef);
};
