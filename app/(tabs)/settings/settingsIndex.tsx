import { Text, ScrollView, useColorMode, Switch, Divider } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useNoteWizardTheme } from "../../../hooks";
import { SettingsItem } from "./components";
import withNetInfo from "../../../hocs/withNetInfo";

const settingsGroupTitle = (groupTitle: string) => groupTitle.toUpperCase();

const Settings = () => {
  const { currentTheme } = useNoteWizardTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const renderDarkModeSwitcher = useMemo(
    () => (
      <Switch
        trackColor={{
          false: currentTheme.background,
          true: currentTheme.purple,
        }}
        thumbColor={isDarkMode ? currentTheme.white : currentTheme.gray}
        ios_backgroundColor={currentTheme.background}
        onToggle={toggleColorMode}
        value={isDarkMode}
        size="sm"
      />
    ),
    [isDarkMode]
  );

  return (
    <ScrollView p={4} backgroundColor={currentTheme.background}>
      <Text color={currentTheme.purple} mb={4}>
        {settingsGroupTitle("General Settings")}
      </Text>
      <SettingsItem
        icon={
          <Ionicons
            name="ios-moon-outline"
            size={20}
            color={currentTheme.font}
          />
        }
        settingTitle="Dark mode"
        rightItem={renderDarkModeSwitcher}
      />

      <Text color={currentTheme.purple} mb={4} mt={4}>
        {settingsGroupTitle("Other")}
      </Text>
      <SettingsItem
        icon={
          <Ionicons
            name="ios-star-outline"
            size={20}
            color={currentTheme.font}
          />
        }
        settingTitle="Rate"
        rightItem={
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={currentTheme.font}
          />
        }
      />
      <Divider mt={4} mb={4} backgroundColor={currentTheme.gray} />
      <SettingsItem
        icon={
          <Ionicons name="mail-outline" size={24} color={currentTheme.font} />
        }
        settingTitle="Contact me"
        rightItem={
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={currentTheme.font}
          />
        }
      />
    </ScrollView>
  );
};

export default withNetInfo(Settings);
