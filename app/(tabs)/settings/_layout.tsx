import { Stack } from "expo-router";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";

const SettingsLayout = () => {
  const { settingsIndex } = constants.screens;
  const { currentTheme } = useNoteWizardTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: currentTheme.background },
        headerTintColor: currentTheme.font,
      }}
    >
      <Stack.Screen name={settingsIndex} options={{ headerTitle: "Settings" }} />
    </Stack>
  );
};
export default SettingsLayout;
