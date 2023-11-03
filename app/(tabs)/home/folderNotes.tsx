import { useSearchParams } from "expo-router";
import { View, Text } from "native-base";
import { useCallback, useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import { useCustomNavigation, useNoteWizardTheme } from "../../../hooks";
import { useGetNotesByIdsQuery } from "../../../store/noteApi/note.api";
import { NoteFolderRow, NoteWizardSpinner } from "../../../components";
import { constants } from "../../../config/constants";
import { NoteType } from "../../../dataTypes/note.types";

const FolderNotes = () => {
  const params = useSearchParams<{ folderName: string; noteIds: string[] }>();
  const { navigate, setOptions } = useCustomNavigation();
  const { currentTheme } = useNoteWizardTheme();
  const { data: notes, isLoading } = useGetNotesByIdsQuery(
    { noteIds: params.noteIds || [] },
    { skip: !params.noteIds }
  );

  useEffect(() => {
    setOptions({ title: `${params.folderName} Notes` });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: NoteType }) => (
      <NoteFolderRow
        key={item._id}
        note={item}
        onPress={() =>
          navigate(constants.screens.note, {
            noteName: item.name,
            noteId: item._id,
          })
        }
      />
    ),
    []
  );

  if (isLoading) {
    return <NoteWizardSpinner />;
  }

  return (
    <View backgroundColor={currentTheme.background} flex={1} px={4} py={4}>
      <FlashList
        data={notes}
        renderItem={renderItem}
        estimatedItemSize={84}
        ListEmptyComponent={<Text>{constants.emptyLists.note}</Text>}
      />
    </View>
  );
};

export default FolderNotes;
