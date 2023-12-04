import uuid from "react-native-uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { getBlob, getFirebaseApp } from "./firebase-helper";

export const uploadImage = async (uri: string) => {
  const app = getFirebaseApp();
  const blob = await getBlob(uri);
  const pathFolder = "profilePics";
  const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);

  await uploadBytesResumable(storageRef, blob);

  // @ts-ignore - because blob actually has close function
  blob.close();

  return getDownloadURL(storageRef);
};
