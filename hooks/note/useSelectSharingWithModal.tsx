import {
  Avatar,
  Button,
  HStack,
  Input,
  Modal,
  Pressable,
  Text,
  View,
} from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import useNoteWizardTheme from "../theme/useNoteWizardTheme";
import { NoteWizardSpinner } from "../../components";
import { constants } from "../../config/constants";
import {
  useCurrentUserQuery,
  useGetAllUsersQuery,
} from "../../store/userApi/user.api";
import { UserType } from "../../dataTypes/user.types";
import { getUserInitials, getUserName } from "../../helpers/user-helpers";
import { useDebounce } from "..";

const getNewSharedWith = (id: string, selectedIds: string[]) => {
  if (selectedIds.includes(id)) {
    return selectedIds.filter((sid) => sid !== id);
  } else {
    return [...selectedIds, id];
  }
};

const useSelectSharingWithModal = (
  onSubmit: (sharedWith: string[]) => void,
  defaultSharedWith?: string[]
) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sharedWith, setSharedWith] = useState(defaultSharedWith || []);
  const { currentTheme } = useNoteWizardTheme();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: users, isLoading } = useGetAllUsersQuery({
    searchTerm: debouncedSearchTerm,
  });
  const { data: currentUser } = useCurrentUserQuery();

  // add this because useState doesn't works as expected for some reason
  useEffect(() => {
    if (defaultSharedWith) {
      setSharedWith(defaultSharedWith);
    }
  }, [defaultSharedWith]);

  const renderItem = useCallback(
    ({ item }: { item: UserType }) =>
      item._id !== currentUser?._id ? (
        <Pressable
          _focus={{ opacity: 0.5 }}
          borderRadius={20}
          p={4}
          {...(sharedWith.includes(item._id) && {
            borderColor: currentTheme.purple,
            borderWidth: 1,
          })}
          onPress={() => setSharedWith(getNewSharedWith(item._id, sharedWith))}
        >
          <HStack alignItems="center" space={2}>
            <Avatar
              bg={currentTheme.purple}
              source={{
                uri: item?.image,
              }}
            >
              <Text color={currentTheme.font} fontSize={18}>
                {getUserInitials(item)}
              </Text>
            </Avatar>

            <View alignItems="center">
              <Text>{getUserName(item)}</Text>
            </View>
          </HStack>
        </Pressable>
      ) : null,
    [sharedWith, getNewSharedWith, currentUser]
  );

  const cancelButton = useMemo(
    () => (
      <Pressable
        pr={2}
        _pressed={{ opacity: 0.5 }}
        onPress={() => {
          setSearchTerm("");
        }}
      >
        <MaterialIcons name="cancel" size={24} color={currentTheme.purple} />
      </Pressable>
    ),
    []
  );

  const renderList = useMemo(() => {
    if (isLoading || !users) {
      return <NoteWizardSpinner />;
    }

    return (
      <FlashList
        data={users}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text textAlign="center" fontSize={16}>
            {constants.emptyLists.folder}
          </Text>
        }
        estimatedItemSize={84}
        ItemSeparatorComponent={() => <View mt="2px" />}
        extraData={sharedWith}
      />
    );
  }, [isLoading, sharedWith, renderItem, users]);

  const renderSearchInput = useMemo(
    () => (
      <Input
        size="xl"
        borderColor={currentTheme.purple}
        borderRadius={8}
        placeholderTextColor={currentTheme.purple}
        color={currentTheme.purple}
        placeholder="Search user"
        value={searchTerm}
        onChangeText={(newText) => setSearchTerm(newText)}
        _focus={{
          backgroundColor: "transparency",
          borderColor: currentTheme.purple,
        }}
        mb={2}
        InputLeftElement={
          <View pl={2}>
            <Feather name="search" size={24} color={currentTheme.purple} />
          </View>
        }
        // show icon only when value.length > 0
        {...(searchTerm.length !== 0 && {
          InputRightElement: cancelButton,
        })}
      />
    ),
    [searchTerm, cancelButton]
  );

  const renderSelectSharingWithModal = useMemo(
    () => (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Content backgroundColor={currentTheme.main}>
          <Modal.CloseButton />
          <Modal.Header backgroundColor={currentTheme.main}>
            Select folder
          </Modal.Header>
          <Modal.Body _scrollview={{ scrollEnabled: false }}>
            {renderSearchInput}
            {renderList}
          </Modal.Body>
          <Modal.Footer backgroundColor={currentTheme.main}>
            <Button.Group>
              <Button
                backgroundColor={currentTheme.purple}
                onPress={() => {
                  onSubmit(sharedWith);
                  setShowModal(false);
                }}
              >
                Done
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    ),
    [showModal, renderList, onSubmit, sharedWith, searchTerm]
  );

  return {
    showModalToggle: () => setShowModal((prevProps) => !prevProps),
    renderSelectSharingWithModal,
  };
};

export default useSelectSharingWithModal;
