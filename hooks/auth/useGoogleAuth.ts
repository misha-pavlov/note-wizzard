import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useSignUpMutation } from "../../store/userApi/user.api";

const useGoogleAuth = () => {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    iosClientId:
      "352040301940-1fj5f4hkfvjdk9fo7nrl9gplak31nesl.apps.googleusercontent.com",
  });

  const [signUpMutation, { data }] = useSignUpMutation();
  console.log("🚀 ~ file: useGoogleAuth.ts:15 ~ useGoogleAuth ~ data:", data);

  const errorHandler = (errorParam: unknown) => {
    const error = errorParam as { code: string };
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  };

  const signUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      signUpMutation({
        firstName: userInfo.user.givenName || "GoogleFirstname",
        lastName: userInfo.user.familyName || "GoogleLastName",
        email: userInfo.user.email,
        withGoogle: true,
      });
    } catch (errorParam) {
      errorHandler(errorHandler);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return { signUp, signOut, googleUserData: data };
};

export default useGoogleAuth;
