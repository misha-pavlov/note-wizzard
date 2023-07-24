import { Stack } from "expo-router";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";

const SettingsLayout = () => {
  const { settings } = constants.screens;
  const { currentTheme } = useNoteWizardTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: currentTheme.background },
        headerTintColor: currentTheme.font,
      }}
    >
      <Stack.Screen name={settings} options={{ headerTitle: "Settings" }} />
    </Stack>
  );
};
export default SettingsLayout;
