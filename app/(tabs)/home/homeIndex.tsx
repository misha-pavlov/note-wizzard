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
import {
  Feather,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useCreateFolderModal,
  useCustomNavigation,
  useNoteWizardTheme,
} from "../../../hooks";
import { Lists, NoteWizardTabs } from "./components";
import { TABS_KEYS } from "./config/constants";
import { constants } from "../../../config/constants";
import { useCurrentUserQuery } from "../../../store/userApi/user.api";
import { getUserInitials, getUserName } from "../../../helpers/user-helpers";
import { useCreateNoteMutation } from "../../../store/noteApi/note.api";
import { useCreateFolderMutation } from "../../../store/folderApi/folder.api";

const DEFAULT_TAB = TABS_KEYS.all;

const Home = () => {
  const { currentTheme } = useNoteWizardTheme();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState(DEFAULT_TAB);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<string | null>(null);
  const { navigate } = useCustomNavigation();
  const { data: user, isLoading } = useCurrentUserQuery();
  const [createNote, { isLoading: isCreateNoteLoading }] =
    useCreateNoteMutation();
  const [createFolder, { isLoading: isCreateFolderLoading }] =
    useCreateFolderMutation();
  const { showModalToggle, renderFolderModal, modalData, clearModal } =
    useCreateFolderModal(() => createNoteFolderOnPress(true));

  const { localStorageKeys, sortTypes, screens } = constants;

  useEffect(() => {
    AsyncStorage.getItem(localStorageKeys.sortType).then((value) =>
      // null condition for the first user open
      value === null ? setSortType(sortTypes.rows) : setSortType(value)
    );
  }, []);

  const createNoteFolderOnPress = useCallback(
    async (isCalledFromModal = false) => {
      try {
        if (selected === TABS_KEYS.folders) {
          if (!isCalledFromModal) {
            showModalToggle();
          }

          if (modalData.ready) {
            const { title, iconType, noteIds, color } = modalData;
            const createdFolder = await createFolder({
              title,
              iconType,
              noteIds,
              color,
            }).unwrap();

            if (createdFolder) {
              clearModal();
              navigate(screens.folderNotes, {
                folderName: createdFolder.title,
              });
            }
          }
        } else {
          const createdNote = await createNote().unwrap();

          if (createdNote) {
            navigate(screens.note, {
              noteName: createdNote.name,
              noteId: createdNote._id,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [selected, modalData]
  );

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

  const renderLists = useMemo(
    () => (
      <Lists
        currentTab={isSearchTermEaqual0 ? selected : ""}
        sortType={sortType}
      />
    ),
    [sortType, isSearchTermEaqual0, selected]
  );

  if (isLoading || !user) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: currentTheme.background, flex: 1 }}>
      <Stack px={4} space={4}>
        {/* HEADER */}
        <HStack justifyContent="space-between" alignItems="center">
          <Stack>
            <Text fontSize={12}>Welcome Back</Text>
            <Text fontSize={16} fontWeight={700}>
              {getUserName(user)}
            </Text>
          </Stack>

          <Avatar
            bg={currentTheme.main}
            source={{
              uri: user?.image,
            }}
          >
            {getUserInitials(user)}
          </Avatar>
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
              onPress={() => {
                const newSortType =
                  sortType === sortTypes.rows
                    ? sortTypes.squares
                    : sortTypes.rows;

                AsyncStorage.setItem(localStorageKeys.sortType, newSortType);
                setSortType(newSortType);
              }}
              minW="40px"
              alignItems="center"
              justifyContent="center"
            >
              <FontAwesome5
                name={sortType === sortTypes.rows ? "sort-amount-down" : "sort"}
                size={24}
                color={currentTheme.main}
              />
            </Pressable>
          )}
        </HStack>

        {/* TABS */}
        {isSearchTermEaqual0 && (
          <NoteWizardTabs selected={selected} selectTab={selectTab} />
        )}

        {/* LISTS */}
        {renderLists}

        {/* ADD BUTTON */}
        <Fab
          shadow={2}
          bottom={100}
          backgroundColor={currentTheme.purple}
          _pressed={{ opacity: 0.5 }}
          placement="bottom-right"
          onPress={() => createNoteFolderOnPress()}
          renderInPortal={false}
          disabled={isCreateNoteLoading || isCreateFolderLoading}
          icon={<Ionicons name="ios-add" size={24} color={currentTheme.main} />}
        />
      </Stack>
      {renderFolderModal}
    </SafeAreaView>
  );
};

export default Home;
