import {
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Modal,
  Pressable,
  Text,
} from "native-base";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";
import useNoteWizardTheme from "../theme/useNoteWizardTheme";
import { constants } from "../../config/constants";
import { getFolderTypeIcon } from "../../helpers/folder-helpers";
import { useGetAllUserNotesQuery } from "../../store/noteApi/note.api";
import { NoteType } from "../../dataTypes/note.types";
import { NoteFolderRow } from "../../components";

const useCreateFolderModal = (callback?: VoidFunction) => {
  // TODO: CONVERT ALL STATES INTO 1 USE_REDUCER
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  console.log(
    "🚀 ~ file: useCreateFolderModal.tsx:28 ~ useCreateFolderModal ~ selectedColor:",
    selectedColor
  );
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const { currentTheme } = useNoteWizardTheme();
  const { data: allUserNotes, isLoading } = useGetAllUserNotesQuery(undefined, {
    skip: currentStep !== 4,
  });
  const folderTypesList = constants.folderTypesList;

  const clearModal = () => {
    setCurrentStep(1);
    setFolderTitle("");
    setSelectedType("");
    setSelectedNotes([]);
    setSelectedColor("");
  };

  const onNextFinishPress = useCallback(() => {
    if (currentStep === 4) {
      setShowModal(false);

      if (callback) {
        callback();
      }
    }

    setCurrentStep(currentStep + 1);
  }, [currentStep, callback]);

  const disabled = useMemo(() => {
    switch (currentStep) {
      case 1:
        return folderTitle.length === 0;
      case 2:
        return selectedType.length === 0;
      case 3:
        return selectedColor.length === 0;
      case 4:
        return selectedNotes.length === 0;
      default:
        return true;
    }
  }, [currentStep, folderTitle, selectedType, selectedNotes, selectedColor]);

  const renderStep = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <FormControl>
            <FormControl.Label>Folder title</FormControl.Label>
            <Input
              value={folderTitle}
              onChangeText={(newText) => setFolderTitle(newText)}
              _focus={{
                backgroundColor: "transparency",
                borderColor: currentTheme.purple,
              }}
              color={currentTheme.purple}
            />
          </FormControl>
        );
      case 2:
        return (
          <FlashList
            data={folderTypesList}
            renderItem={({ item }) => (
              <Pressable onPress={() => setSelectedType(item)}>
                <HStack
                  space={2}
                  mb={
                    item !== folderTypesList[folderTypesList.length - 1] ? 4 : 0
                  }
                  alignItems="center"
                  borderColor={
                    selectedType === item
                      ? currentTheme.purple
                      : currentTheme.main
                  }
                  borderWidth={1}
                  p={2}
                  borderRadius={10}
                >
                  {getFolderTypeIcon(item, 24, currentTheme.purple)}
                  <Text>{item}</Text>
                </HStack>
              </Pressable>
            )}
            estimatedItemSize={24}
            extraData={selectedType}
          />
        );
      case 3:
        return (
          <Center>
            {/* @ts-ignore - escape of "'TriangleColorPicker' cannot be used as a JSX component." error */}
            <TriangleColorPicker
              color={selectedColor}
              onColorChange={(color) => setSelectedColor(fromHsv(color))}
              style={{ width: 250, height: 250 }}
            />
          </Center>
        );
      case 4:
        return isLoading || !allUserNotes ? (
          <ActivityIndicator />
        ) : (
          <FlashList
            data={allUserNotes}
            renderItem={({ item }: { item: NoteType }) => {
              const noteId = item._id;
              return (
                <NoteFolderRow
                  key={noteId}
                  note={item}
                  withoutDate
                  selected={selectedNotes.includes(noteId)}
                  onPress={() =>
                    setSelectedNotes((notes) =>
                      notes.includes(noteId)
                        ? notes.filter((n) => !n.includes(noteId))
                        : [...notes, noteId]
                    )
                  }
                />
              );
            }}
            estimatedItemSize={84}
            extraData={selectedNotes}
            ListEmptyComponent={<Text>{constants.emptyLists.note}</Text>}
          />
        );
      default:
        return <ActivityIndicator />;
    }
  }, [
    currentStep,
    folderTitle,
    selectedType,
    allUserNotes,
    selectedNotes,
    selectedColor,
  ]);

  const renderFolderModal = useMemo(
    () => (
      <Modal
        isOpen={showModal}
        onClose={() => {
          clearModal();
          setShowModal(false);
        }}
      >
        <Modal.Content backgroundColor={currentTheme.main}>
          <Modal.CloseButton />
          <Modal.Header backgroundColor={currentTheme.main}>
            Create your new folder
          </Modal.Header>
          {/* block scroll when selecting color */}
          <Modal.Body _scrollview={{ scrollEnabled: currentStep !== 3 }}>
            {renderStep}
          </Modal.Body>
          <Modal.Footer backgroundColor={currentTheme.main}>
            <Button.Group>
              <Button
                backgroundColor={currentTheme.purple}
                onPress={onNextFinishPress}
                disabled={disabled}
                isDisabled={disabled}
              >
                {currentStep === 4 ? "Finish" : "Next step"}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    ),
    [
      showModal,
      renderStep,
      currentStep,
      disabled,
      onNextFinishPress,
      clearModal,
    ]
  );

  return {
    showModalToggle: () => setShowModal((prevProps) => !prevProps),
    renderFolderModal,
    modalData: {
      title: folderTitle,
      iconType: selectedType,
      color: selectedColor,
      noteIds: selectedNotes,
      ready: currentStep === 4 && selectedNotes.length,
    },
    clearModal,
  };
};

export default useCreateFolderModal;
