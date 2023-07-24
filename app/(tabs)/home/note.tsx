import { useNavigation, useRouter, useSearchParams } from "expo-router";
import {
  Fab,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  Box,
  Menu,
  useColorMode,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Pressable, useWindowDimensions, Share } from "react-native";
import { useNoteWizardTheme } from "../../../hooks";
import { Audio, NoteBody } from "./components";
import { constants } from "../../../config/constants";

const Note = () => {
  const params = useSearchParams();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [showReminder, setShowReminder] = useState(false);
  const { currentTheme } = useNoteWizardTheme();
  const { height } = useWindowDimensions();
  const router = useRouter();
  const { colorMode } = useColorMode();

  const keyboardVerticalOffset = Platform.select({
    ios: height / 2,
    default: 0,
  });

  const shareNote = useCallback(async () => {
    try {
      await Share.share({
        title: "Look on this amazing note",
        url: "https://google.com",
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      ...(params.note && { title: `${params.note}` }),
      headerRight: () => (
        <Box alignItems="center">
          <Menu
            w="150"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color={currentTheme.font}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={shareNote}>Share</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
          </Menu>
        </Box>
      ),
    });
  }, [currentTheme]);

  return (
    <>
      <ScrollView px={4} pt={4} backgroundColor={currentTheme.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
          flex={1}
        >
          <VStack space={4}>
            <Input
              size="xl"
              variant="unstyled"
              placeholder="Title"
              value={title}
              onChangeText={(newTitle) => setTitle(newTitle)}
              InputRightElement={
                showReminder ? (
                  <HStack space={1} alignItems="center">
                    <DateTimePicker
                      value={new Date()}
                      mode="datetime"
                      themeVariant={colorMode || undefined}
                      style={{ width: 180, height: 27 }}
                    />
                    <MaterialIcons
                      name="cancel"
                      size={16}
                      color={currentTheme.red}
                      onPress={() => setShowReminder(false)}
                    />
                  </HStack>
                ) : (
                  <MaterialIcons
                    name="timer"
                    size={16}
                    color={currentTheme.purple}
                    onPress={() => setShowReminder(true)}
                  />
                )
              }
            />

            {/* RECORDERS */}
            <Audio />

            {/* NOTE */}
            <NoteBody />
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>

      <Fab
        shadow={2}
        backgroundColor={currentTheme.purple}
        _pressed={{ opacity: 0.5 }}
        placement="bottom-right"
        onPress={() => router.push(constants.routes.recording)}
        renderInPortal={false}
        icon={
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color={currentTheme.main}
          />
        }
      />
    </>
  );
};

export default Note;
