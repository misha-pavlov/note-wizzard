import { useRouter, useSearchParams } from "expo-router";
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
  useToast,
} from "native-base";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  Pressable,
  useWindowDimensions,
  Share,
  Animated,
} from "react-native";
import {
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import { Easing } from "react-native-reanimated";
import {
  useCustomNavigation,
  useNoteWizardTheme,
  useSelectNoteFolder,
  useUpdateNoteNameModal,
} from "../../../hooks";
import { Audio, NoteBody } from "./components";
import { constants } from "../../../config/constants";
import {
  useDeleteNoteByIdMutation,
  useGetNoteByIdQuery,
} from "../../../store/noteApi/note.api";
import { NoteType } from "../../../dataTypes/note.types";
import { NoteWizardSpinner } from "../../../components";

type UpdateFields = {
  title?: string;
  content?: string;
  reminder?: Date;
  privacy?: "private" | "public";
  sharedWith?: string[];
  recorders?: string[];
  folderId?: string;
  isImportant?: boolean;
};

const reducer = (
  state: NoteType,
  action: {
    type: string;
    payload: UpdateFields;
  }
): NoteType => {
  switch (action.type) {
    case "UPDATE_NOTE":
      return { ...state, ...action.payload };
    case "SET_NOTE":
      return action.payload as NoteType;
    default:
      return state;
  }
};

const Note = () => {
  // nav
  const params = useSearchParams();
  const noteId = params.noteId as string;
  const navigation = useCustomNavigation();
  const router = useRouter();

  // state
  const [note, dispatch] = useReducer(reducer, {} as NoteType);
  const [showReminder, setShowReminder] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  // styles
  const { currentTheme } = useNoteWizardTheme();
  const { height } = useWindowDimensions();
  const { colorMode } = useColorMode();
  const toast = useToast();

  // fetch
  const {
    data: noteById,
    isLoading,
    refetch,
  } = useGetNoteByIdQuery(
    {
      noteId,
    },
    { skip: !noteId }
  );

  // mutaions
  const { renderUpdateNoteNameModal, updateNoteName } = useUpdateNoteNameModal(
    noteId,
    refetch
  );
  const [deleteNoteById, { error: deleteError }] = useDeleteNoteByIdMutation();
  const { renderSelectFolderModal, showModalToggle } = useSelectNoteFolder(
    (selectedFolderId) =>
      dispatch({
        type: "UPDATE_NOTE",
        payload: { folderId: selectedFolderId },
      }),
    note?.folderId
  );

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

  const onZoomEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: true,
  });

  const onZoomStateChange = (
    event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 2500,
        delay: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  // render top dots
  useEffect(() => {
    navigation.setOptions({
      ...(params.noteName && {
        title: `${
          noteById && noteById.name !== params.noteName
            ? noteById.name
            : params.noteName
        }`,
      }),
      headerRight: () => (
        <HStack alignItems="center" space={3}>
          {note?.isImportant ? (
            <MaterialIcons
              name="star"
              size={20}
              color={currentTheme.purple}
              onPress={() =>
                dispatch({
                  type: "UPDATE_NOTE",
                  payload: { isImportant: false },
                })
              }
            />
          ) : (
            <MaterialIcons
              name="star-border"
              size={20}
              color={currentTheme.purple}
              onPress={() =>
                dispatch({
                  type: "UPDATE_NOTE",
                  payload: { isImportant: true },
                })
              }
            />
          )}
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
            <Menu.Item onPress={updateNoteName}>Update note name</Menu.Item>
            <Menu.Item onPress={showModalToggle}>Update note folder</Menu.Item>
            <Menu.Item onPress={shareNote}>Share</Menu.Item>
            <Menu.Item
              onPress={() => deleteNoteById({ noteId })}
              backgroundColor={currentTheme.red}
            >
              Delete
            </Menu.Item>
          </Menu>
        </HStack>
      ),
    });
  }, [
    currentTheme,
    updateNoteName,
    noteById,
    deleteNoteById,
    dispatch,
    note,
    showModalToggle,
  ]);

  // set note data
  useEffect(() => {
    if (noteById) {
      dispatch({ type: "SET_NOTE", payload: noteById });
    }
  }, [noteById]);

  // show errors
  useEffect(() => {
    const error = deleteError as { data?: string & { message?: string } };
    if (error) {
      if (error?.data === "Deleted") {
        navigation.goBack();
      } else {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Box bg={currentTheme.red} px="2" py="1" rounded="sm" mb={5}>
                {error?.data?.message}
              </Box>
            );
          },
        });
      }
    }
  }, [deleteError]);

  // zoom in/out
  useEffect(() => {
    const loopAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 0.8,
            duration: 2500,
            easing: Easing.in(Easing.ease),
            delay: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 2500,
            delay: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    const intervalId = setInterval(loopAnimation, 5000);

    // Call loopAnimation once when the component mounts
    loopAnimation();

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading || !noteById || !note) {
    return <NoteWizardSpinner />;
  }

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
              value={note.title}
              onChangeText={(newTitle) =>
                dispatch({ type: "UPDATE_NOTE", payload: { title: newTitle } })
              }
              InputRightElement={
                showReminder ? (
                  <HStack space={1} alignItems="center">
                    <DateTimePicker
                      value={note?.reminder ? note.reminder : new Date()}
                      onChange={(event, date) =>
                        dispatch({
                          type: "UPDATE_NOTE",
                          payload: { reminder: date },
                        })
                      }
                      mode="datetime"
                      themeVariant={colorMode || undefined}
                      style={{ width: 180, height: 27 }}
                    />
                    {note?.reminder && (
                      <MaterialIcons
                        name="delete"
                        size={16}
                        color={currentTheme.red}
                        onPress={() => setShowReminder(false)}
                      />
                    )}
                    <MaterialIcons
                      name="cancel"
                      size={16}
                      color={currentTheme.red}
                      onPress={() => setShowReminder(false)}
                    />
                  </HStack>
                ) : (
                  <PinchGestureHandler
                    onGestureEvent={onZoomEvent}
                    onHandlerStateChange={onZoomStateChange}
                  >
                    <Animated.View
                      style={note?.reminder && [{ transform: [{ scale }] }]}
                    >
                      <MaterialIcons
                        name="timer"
                        size={16}
                        color={
                          note?.reminder
                            ? currentTheme.font
                            : currentTheme.purple
                        }
                        onPress={() => setShowReminder(true)}
                      />
                    </Animated.View>
                  </PinchGestureHandler>
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
        bottom="5%"
        right="5%"
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

      {renderUpdateNoteNameModal}
      {renderSelectFolderModal}
    </>
  );
};

export default Note;
