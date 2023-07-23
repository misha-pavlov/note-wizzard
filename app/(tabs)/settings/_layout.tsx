import { Stack } from "expo-router";
import { constants } from "../../../config/constants";

const SettingsLayout = () => {
  const { settings } = constants.screens;

  return (
    <Stack>
      <Stack.Screen name={settings} options={{ headerTitle: "Settings" }} />
    </Stack>
  );
};
export default SettingsLayout;
