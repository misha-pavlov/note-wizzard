import { Stack } from "expo-router";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";

const ProfileLayout = () => {
  const { profile, editProfile } = constants.screens;
  const { currentTheme } = useNoteWizardTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: currentTheme.background },
        headerTintColor: currentTheme.font,
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
