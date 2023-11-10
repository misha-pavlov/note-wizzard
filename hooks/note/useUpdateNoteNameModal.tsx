import { useCallback, useMemo, useState } from "react";
import { Button, Input, Modal, Text } from "native-base";
import { useCurrentUserQuery } from "../../store/userApi/user.api";
import useNoteWizardTheme from "../theme/useNoteWizardTheme";
import {
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
} from "../../store/noteApi/note.api";

const useUpdateNoteNameModal = (noteId: string, refetch?: VoidFunction) => {
  const [showModal, setShowModal] = useState(false);
  const [newNoteName, setNewNoteName] = useState("");
  const { currentTheme } = useNoteWizardTheme();
  const { data: noteById } = useGetNoteByIdQuery(
    {
      noteId,
    },
    { skip: !noteId }
  );
  const [updateNote] = useUpdateNoteMutation();
  const oldNoteName = noteById?.name;

  const cleanModal = () => {
    setShowModal(false);
    setNewNoteName("");
  };

  const onUpdate = useCallback(() => {
    updateNote({ noteId, name: newNoteName }).then(() => {
      cleanModal();
      if (refetch) refetch();
    });
  }, [newNoteName, updateNote, cleanModal]);

  const disabled = useMemo(
    () => newNoteName === "" || oldNoteName === newNoteName,
    [oldNoteName, newNoteName]
  );

  const renderUpdateNoteNameModal = useMemo(
    () => (
      <Modal isOpen={showModal} onClose={cleanModal}>
        <Modal.Content backgroundColor={currentTheme.main}>
          <Modal.CloseButton />
          <Modal.Header backgroundColor={currentTheme.main}>
            <Text maxW="85%" fontSize={16}>
              Update note name (Old name: "{oldNoteName}")
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={newNoteName}
              onChangeText={(newText) => setNewNoteName(newText)}
              _focus={{
                backgroundColor: "transparency",
                borderColor: currentTheme.purple,
              }}
              color={currentTheme.purple}
            />
          </Modal.Body>
          <Modal.Footer backgroundColor={currentTheme.main}>
            <Button.Group>
              <Button
                backgroundColor={currentTheme.purple}
                onPress={onUpdate}
                disabled={disabled}
                isDisabled={disabled}
              >
                Done
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    ),
    [disabled, newNoteName, showModal, onUpdate, cleanModal]
  );

  return {
    renderUpdateNoteNameModal,
    updateNoteName: () => setShowModal(true),
  };
};

export default useUpdateNoteNameModal;
