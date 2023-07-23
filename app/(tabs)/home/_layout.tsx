import { Stack } from "expo-router";
import { constants } from "../../../config/constants";

const HomeLayout = () => {
  const { home, folderNotes, note, recording } = constants.screens;

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name={home} />
      <Stack.Screen options={{ title: "Folder Notes" }} name={folderNotes} />
      <Stack.Screen options={{ title: "New Note" }} name={note} />
      <Stack.Screen options={{ title: "" }} name={recording} />
    </Stack>
  );
};
export default HomeLayout;
