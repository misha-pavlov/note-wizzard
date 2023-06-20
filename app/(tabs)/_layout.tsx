import { Tabs } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { View } from "native-base";
import { constants } from "../../config/constants";
import { useNoteWizardTheme } from "../../hooks";

const capitalizeText = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export default function AppLayout() {
  const { home, settings, profile, newNote } = constants.screens;
  const { currentTheme } = useNoteWizardTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentTheme.purple,
        tabBarInactiveTintColor: currentTheme.purple2,
        tabBarStyle: {
          backgroundColor: currentTheme.second,
        },
      }}
    >
      <Tabs.Screen
        name={home}
        options={{
          tabBarLabel: capitalizeText(home),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-home" size={24} color={currentTheme.purple} />
            ) : (
              <Ionicons
                name="ios-home-outline"
                size={24}
                color={currentTheme.purple2}
              />
            ),
        }}
      />
      <Tabs.Screen
        name={settings}
        options={{
          tabBarLabel: capitalizeText(settings),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings" size={24} color={currentTheme.purple} />
            ) : (
              <Ionicons
                name="settings-outline"
                size={24}
                color={currentTheme.purple2}
              />
            ),
        }}
      />
      <Tabs.Screen
        name={profile}
        options={{
          tabBarLabel: capitalizeText(profile),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5
                name="user-alt"
                size={24}
                color={currentTheme.purple}
              />
            ) : (
              <FontAwesome5
                name="user"
                size={24}
                color={currentTheme.purple2}
              />
            ),
        }}
      />
      <Tabs.Screen
        name={newNote}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View
              position="absolute"
              backgroundColor={currentTheme.purple}
              p={5}
              bottom={3}
              borderRadius="full"
            >
              <Ionicons name="ios-add" size={24} color={currentTheme.main} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
