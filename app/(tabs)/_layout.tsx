import { Tabs } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { constants } from "../../config/constants";

const capitalizeText = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export default function AppLayout() {
  const { home, settings, profile, newNote } = constants.screens;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name={home}
        options={{
          tabBarLabel: capitalizeText(home),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-home" size={24} color="red" />
            ) : (
              <Ionicons name="ios-home-outline" size={24} color="red" />
            ),
          tabBarLabelStyle: {
            color: "red",
          },
        }}
      />
      <Tabs.Screen
        name={settings}
        options={{
          tabBarLabel: capitalizeText(settings),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings" size={24} color="black" />
            ) : (
              <Ionicons name="settings-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name={profile}
        options={{
          tabBarLabel: capitalizeText(profile),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color="black" />
            ) : (
              <FontAwesome5 name="user" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name={newNote}
        options={{
          tabBarIcon: () => <Ionicons name="ios-add" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
