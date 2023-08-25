import { Stack } from "expo-router";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";

const HomeLayout = () => {
  const { homeIndex, folderNotes, note, recording } = constants.screens;
  const { currentTheme } = useNoteWizardTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: currentTheme.background },
        headerTintColor: currentTheme.font,
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name={homeIndex} />
      <Stack.Screen options={{ title: "Folder Notes" }} name={folderNotes} />
      <Stack.Screen options={{ title: "New Note" }} name={note} />
      <Stack.Screen options={{ title: "" }} name={recording} />
    </Stack>
  );
};
export default HomeLayout;
