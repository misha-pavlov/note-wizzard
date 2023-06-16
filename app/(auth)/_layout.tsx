import { Stack } from "expo-router";
import { constants } from "../../config/constants";

const AuthLayout = () => (
  <Stack>
    <Stack.Screen
      name={constants.screens.signIn}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={constants.screens.signUp}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={constants.screens.forgotPassword}
      options={{
        title: "Forgot Password",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={constants.screens.verification}
      options={{
        title: "Verification",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={constants.screens.newPassword}
      options={{
        title: "New Password",
        headerShown: false,
      }}
    />
  </Stack>
);

export default AuthLayout;
