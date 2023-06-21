import { Stack } from "expo-router";
import { constants } from "../../../config/constants";

const ProfileLayout = () => {
  const { profile, editProfile } = constants.screens;

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen name={profile} options={{ headerTitle: "My Profile" }} />
      <Stack.Screen
        name={editProfile}
        options={{ headerTitle: "Edit Profile" }}
      />
    </Stack>
  );
};
export default ProfileLayout;
