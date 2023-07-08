import { Stack } from "expo-router";
import { constants } from "../../../config/constants";

const HomeLayout = () => {
  const { home, folderNotes, note } = constants.screens;

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name={home} />
      <Stack.Screen options={{ title: 'Folder Notes' }} name={folderNotes} />
      <Stack.Screen name={note} />
    </Stack>
  );
};
export default HomeLayout;
