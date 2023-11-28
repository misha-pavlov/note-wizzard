import { useFocusEffect, useSearchParams } from "expo-router";
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
import { Platform, Pressable, useWindowDimensions } from "react-native";
import {
  useCallbackOnUnmount,
  useCustomNavigation,
  useNoteWizardTheme,
  useSelectNoteFolder,
  useSelectSharingWithModal,
  useUpdateNoteNameModal,
} from "../../../hooks";
import { Audio, NoteBody } from "./components";
import { constants } from "../../../config/constants";
import {
  useDeleteNoteByIdMutation,
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
} from "../../../store/noteApi/note.api";
import { NoteType } from "../../../dataTypes/note.types";
import { AnimatedDropdown, NoteWizardSpinner } from "../../../components";
import { findChangedFields } from "../../../helpers/genereal-helpers";

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
  // refs
  const isFirstRender = useRef(true);

  // nav
  const params = useSearchParams();
  const noteId = params.noteId as string;
  const navigation = useCustomNavigation();

  // state
  const [note, dispatch] = useReducer(reducer, {} as NoteType);
  const [showReminder, setShowReminder] = useState(false);

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
    {
      skip: !noteId,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  // mutaions
  const { renderUpdateNoteNameModal, updateNoteName } = useUpdateNoteNameModal(
    noteId,
    refetch
  );

  const [deleteNoteById, { error: deleteError }] = useDeleteNoteByIdMutation();
  const [updateNote] = useUpdateNoteMutation();
  useCallbackOnUnmount(() => {
    updateNote({ noteId, ...findChangedFields(noteById, note) });
    dispatch({ type: "SET_NOTE", payload: {} });
  });

  // modals
  const { renderSelectFolderModal, showModalToggle: selectNoteFolder } =
    useSelectNoteFolder(
      (selectedFolderId) =>
        dispatch({
          type: "UPDATE_NOTE",
          payload: { folderId: selectedFolderId },
        }),
      note?.folderId
    );
  const { renderSelectSharingWithModal, showModalToggle: selectSharingWith } =
    useSelectSharingWithModal(
      (sharedWith) =>
        dispatch({
          type: "UPDATE_NOTE",
          payload: { sharedWith },
        }),
      note?.sharedWith
    );

  const keyboardVerticalOffset = Platform.select({
    ios: height / 2,
    default: 0,
  });

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
            <Menu.Item onPress={selectNoteFolder}>Update note folder</Menu.Item>
            <Menu.Item onPress={selectSharingWith}>
              Share with in app users
            </Menu.Item>
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
    selectNoteFolder,
    selectSharingWith,
  ]);

  // set note data
  useEffect(() => {
    if (noteById) {
      dispatch({ type: "SET_NOTE", payload: noteById });
    }
  }, [noteById]);

  // refetch note data
  useFocusEffect(
    useCallback(() => {
      if (!isFirstRender.current) {
        refetch();
      }

      return () => {
        isFirstRender.current = false;
      };
    }, [])
  );

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
                      value={
                        note?.reminder ? new Date(note.reminder) : new Date()
                      }
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
                        onPress={() => {
                          dispatch({
                            type: "UPDATE_NOTE",
                            // @ts-ignore - becuase we must here use null for
                            // escate of filtering during sending on server
                            payload: { reminder: null },
                          });
                          setShowReminder(false);
                        }}
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
                  <MaterialIcons
                    name="timer"
                    size={16}
                    color={
                      note?.reminder ? currentTheme.font : currentTheme.purple
                    }
                    onPress={() => setShowReminder(true)}
                  />
                )
              }
            />

            {/* RECORDERS */}
            <AnimatedDropdown
              headerText={`Recorders (${note?.recorders?.length})`}
              disabled={!note?.recorders?.length}
            >
              <Audio
                recorders={note?.recorders}
                deleteCallback={(newRecorders: string[]) =>
                  dispatch({
                    type: "UPDATE_NOTE",
                    payload: {
                      recorders: newRecorders,
                    },
                  })
                }
              />
            </AnimatedDropdown>

            {/* NOTE */}
            <NoteBody
              content={note?.content || ""}
              onChange={(text) =>
                dispatch({ type: "UPDATE_NOTE", payload: { content: text } })
              }
            />
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
        onPress={() =>
          navigation.navigate(constants.screens.recording, {
            noteId,
          })
        }
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
      {renderSelectSharingWithModal}
    </>
  );
};

export default Note;
