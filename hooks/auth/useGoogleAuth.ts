import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useSignInMutation, useSignUpMutation } from "../../store/userApi/user.api";

const useGoogleAuth = () => {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    iosClientId:
      "352040301940-1fj5f4hkfvjdk9fo7nrl9gplak31nesl.apps.googleusercontent.com",
  });

  const [signUpMutation, { data: dataSignUp }] = useSignUpMutation();
  const [signInMutation, { data: dataSignIn }] = useSignInMutation();

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

  // TODO: ADD LOG IN FOR GOOGLE IOS AND SIGN UP/SIGN IN FOR ANDROID
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

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      signInMutation({
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

  return { signUp, signOut, signIn, googleUserData: dataSignUp || dataSignIn };
};

export default useGoogleAuth;
