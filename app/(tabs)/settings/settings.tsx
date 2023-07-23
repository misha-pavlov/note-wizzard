import { Text, ScrollView, useColorMode, Switch, Divider } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNoteWizardTheme } from "../../../hooks";
import { SettingsItem } from "./components";

const settingsGroupTitle = (groupTitle: string) => groupTitle.toUpperCase();

const Settings = () => {
  const { currentTheme } = useNoteWizardTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <ScrollView p={4}>
      <Text color={currentTheme.purple} mb={4}>
        {settingsGroupTitle("General Settings")}
      </Text>
      <SettingsItem
        icon={<Ionicons name="ios-moon-outline" size={20} color="black" />}
        settingTitle="Dark mode"
        rightItem={
          <Switch
            trackColor={{
              false: currentTheme.background,
              true: currentTheme.purple,
            }}
            thumbColor={isDarkMode ? currentTheme.white : currentTheme.gray}
            ios_backgroundColor={currentTheme.background}
            onValueChange={toggleColorMode}
            value={isDarkMode}
            size="sm"
          />
        }
      />

      <Text color={currentTheme.purple} mb={4} mt={4}>
        {settingsGroupTitle("Other")}
      </Text>
      {/* TODO: ADD LOGIC FOR THE NEXT TWO SETTINGS */}
      <SettingsItem
        icon={<Ionicons name="ios-star-outline" size={20} color="black" />}
        settingTitle="Rate"
        rightItem={
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        }
      />
      <Divider mt={4} mb={4} backgroundColor={currentTheme.gray} />
      <SettingsItem
        icon={<Ionicons name="mail-outline" size={24} color="black" />}
        settingTitle="Contact me"
        rightItem={
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        }
      />
    </ScrollView>
  );
};

export default Settings;
