import {
  Avatar,
  Input,
  Pressable,
  Stack,
  Text,
  HStack,
  View,
  Fab,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNoteWizardTheme } from "../../../hooks";
import { Lists, NoteWizardTabs } from "./components";
import { TABS_KEYS } from "./config/constants";
import { constants } from "../../../config/constants";

const DEFAULT_TAB = TABS_KEYS.all;

const Home = () => {
  const { currentTheme } = useNoteWizardTheme();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState(DEFAULT_TAB);
  const [searchTerm, setSearchTerm] = useState("");
  const route = useRouter();

  const selectTab = useCallback((key: string) => setSelected(key), []);

  const isSearchTermMore0 = searchTerm.length > 0;
  const isSearchTermEaqual0 = searchTerm.length === 0;

  const cancelButton = useMemo(
    () => (
      <Pressable
        pr={2}
        _pressed={{ opacity: 0.5 }}
        onPress={() => {
          setSelected(DEFAULT_TAB);
          setSearchTerm("");
        }}
      >
        <MaterialIcons name="cancel" size={24} color={currentTheme.purple} />
      </Pressable>
    ),
    []
  );

  return (
    <SafeAreaView>
      <Stack px={4} space={4}>
        {/* HEADER */}
        <HStack justifyContent="space-between" alignItems="center">
          <Stack>
            <Text fontSize={12}>Welcome Back</Text>
            <Text fontSize={16} fontWeight={700}>
              User Name
            </Text>
          </Stack>

          <Avatar
            bg={currentTheme.main}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          ></Avatar>
        </HStack>

        {/* SEARCH */}
        <HStack justifyContent="space-between" alignItems="center" space={4}>
          {/* 32 - padding left + right, 56 - right icon */}
          <View width={isSearchTermMore0 ? width - 32 : width - 32 - 56}>
            <Input
              size="xl"
              borderColor={currentTheme.purple}
              borderRadius={8}
              placeholderTextColor={currentTheme.purple}
              color={currentTheme.purple}
              placeholder="Search notes..."
              value={searchTerm}
              onChangeText={(newText) => setSearchTerm(newText)}
              _focus={{
                backgroundColor: "transparency",
                borderColor: currentTheme.purple,
              }}
              InputLeftElement={
                <View pl={2}>
                  <Feather
                    name="search"
                    size={24}
                    color={currentTheme.purple}
                  />
                </View>
              }
              // show icon only when value.length > 0
              {...(isSearchTermMore0 && {
                InputRightElement: cancelButton,
              })}
            />
          </View>

          {isSearchTermEaqual0 && (
            <Pressable
              backgroundColor={currentTheme.purple}
              p={2}
              borderRadius={15}
              _pressed={{ opacity: 0.5 }}
            >
              <Octicons name="sort-desc" size={24} color={currentTheme.main} />
            </Pressable>
          )}
        </HStack>

        {/* TABS */}
        {isSearchTermEaqual0 && (
          <NoteWizardTabs selected={selected} selectTab={selectTab} />
        )}

        {/* LISTS */}
        <Lists currentTab={isSearchTermEaqual0 ? selected : ""} />

        {/* ADD BUTTON */}
        <Fab
          shadow={2}
          bottom={150}
          backgroundColor={currentTheme.purple}
          _pressed={{ opacity: 0.5 }}
          placement="bottom-right"
          onPress={() => route.push(constants.routes.note)}
          renderInPortal={false}
          icon={<Ionicons name="ios-add" size={24} color={currentTheme.main} />}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default Home;
