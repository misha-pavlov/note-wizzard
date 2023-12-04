import { Button, Modal, Text } from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { Provider } from "react-redux";
import useNoteWizardTheme from "../theme/useNoteWizardTheme";
import useGetFoldersForUserQueryWithFetchMore from "./useGetFoldersForUserQueryWithFetchMore";
import { NoteFolderRow, NoteWizardSpinner } from "../../components";
import { FolderType } from "../../dataTypes/folder.types";
import { constants } from "../../config/constants";
import { store } from "../../store";

const useSelectNoteFolder = (
  onSubmit: (selectedFolderId: string) => void,
  defaultSelectedFolderId?: string
) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(
    defaultSelectedFolderId
  );

  // add this because useState doesn't works as expected for some reason
  useEffect(() => {
    if (defaultSelectedFolderId) {
      setSelectedFolderId(defaultSelectedFolderId);
    }
  }, [defaultSelectedFolderId]);

  const { currentTheme } = useNoteWizardTheme();
  const {
    folders,
    isLoading,
    fetchMore,
    isRefreshing,
    onRefresh,
    isFetchingMore,
  } = useGetFoldersForUserQueryWithFetchMore();

  const renderItem = useCallback(
    ({ item }: { item: FolderType }) => (
      <NoteFolderRow
        key={item._id}
        folder={item}
        withoutDate
        selected={item._id === selectedFolderId}
        onPress={() => setSelectedFolderId(item._id)}
      />
    ),
    [selectedFolderId]
  );

  const renderList = useMemo(() => {
    if (isLoading) {
      return <NoteWizardSpinner />;
    }

    return (
      <Provider store={store}>
        <FlashList
          data={folders}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text textAlign="center" fontSize={16}>
              {constants.emptyLists.folder}
            </Text>
          }
          estimatedItemSize={84}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl
              tintColor={currentTheme.purple}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
          extraData={selectedFolderId}
          onEndReached={fetchMore}
          ListFooterComponent={isFetchingMore ? <NoteWizardSpinner /> : null}
        />
      </Provider>
    );
  }, [
    isLoading,
    selectedFolderId,
    isRefreshing,
    renderItem,
    folders,
    isFetchingMore,
  ]);

  const renderSelectFolderModal = useMemo(
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
                  if (selectedFolderId) {
                    onSubmit(selectedFolderId);
                  }
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
    [showModal, renderList, onSubmit, selectedFolderId]
  );

  return {
    showModalToggle: () => setShowModal((prevProps) => !prevProps),
    renderSelectFolderModal,
  };
};

export default useSelectNoteFolder;
