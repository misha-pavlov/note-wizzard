import { useNavigation, useSearchParams } from "expo-router";
import { Fab, HStack, Input, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNoteWizardTheme } from "../../../hooks";
import { Audio } from "./components";

const Note = () => {
  const params = useSearchParams();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [showReminder, setShowReminder] = useState(false);
  const { currentTheme } = useNoteWizardTheme();

  useEffect(() => {
    navigation.setOptions({
      ...(params.note && { title: `${params.note}` }),
    });
  }, []);

  return (
    <>
      <ScrollView px={4} pt={4}>
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
      </ScrollView>

      {/* BOTTOM */}
      <HStack
        alignItems="center"
        px={4}
        pt={4}
        pb={10}
        justifyContent="space-between"
        backgroundColor={currentTheme.second}
      >
        <Feather name="share" size={28} color={currentTheme.purple} />
        <MaterialIcons
          name="delete-outline"
          size={28}
          color={currentTheme.purple}
        />
        <MaterialCommunityIcons
          name="format-text"
          size={28}
          color={currentTheme.purple}
        />
        <MaterialIcons name="undo" size={28} color={currentTheme.purple} />
      </HStack>

      <Fab
        shadow={2}
        bottom={100}
        backgroundColor={currentTheme.purple}
        _pressed={{ opacity: 0.5 }}
        placement="bottom-right"
        // onPress={() => route.push(constants.routes.note)}
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
