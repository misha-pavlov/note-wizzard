import {
  Avatar,
  Button,
  HStack,
  Modal,
  Pressable,
  Text,
  View,
} from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import useNoteWizardTheme from "../theme/useNoteWizardTheme";
import { NoteWizardSpinner } from "../../components";
import { constants } from "../../config/constants";
import {
  useCurrentUserQuery,
  useGetAllUsersQuery,
} from "../../store/userApi/user.api";
import { UserType } from "../../dataTypes/user.types";
import { getUserInitials, getUserName } from "../../helpers/user-helpers";

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
  const [sharedWith, setSharedWith] = useState(defaultSharedWith || []);
  const { currentTheme } = useNoteWizardTheme();
  const { data: users, isLoading } = useGetAllUsersQuery();
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
          <Modal.Body>{renderList}</Modal.Body>
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
    [showModal, renderList, onSubmit, sharedWith]
  );

  return {
    showModalToggle: () => setShowModal((prevProps) => !prevProps),
    renderSelectSharingWithModal,
  };
};

export default useSelectSharingWithModal;
