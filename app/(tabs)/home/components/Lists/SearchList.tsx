import { SectionList, Center, Heading, View } from "native-base";
import { FC, useCallback, useMemo } from "react";
import { SectionListData } from "react-native";
import {
  useCustomNavigation,
  useDebounce,
  useNoteWizardTheme,
} from "../../../../../hooks";
import { useSearchNotesAndFoldersReqQuery } from "../../../../../store/noteApi/note.api";
import { NoteFolderRow, NoteWizardSpinner } from "../../../../../components";
import { FolderType } from "../../../../../dataTypes/folder.types";
import { NoteType } from "../../../../../dataTypes/note.types";
import { constants } from "../../../../../config/constants";

type SearchListPropsType = {
  searchTerm: string;
};

const SearchList: FC<SearchListPropsType> = ({
  searchTerm: searchTermProp,
}) => {
  const { currentTheme } = useNoteWizardTheme();
  const searchTerm = useDebounce(searchTermProp, 500);
  const { navigate } = useCustomNavigation();
  const { data: searchResults, isLoading } = useSearchNotesAndFoldersReqQuery(
    {
      searchTerm,
    },
    { skip: searchTerm.length < 3 }
  );

  const data = useMemo(() => {
    const finalData = [];
    const notes = searchResults?.notes;
    const folders = searchResults?.folders;

    if (notes?.length) {
      finalData.push({
        title: "Notes",
        data: notes,
      });
    }

    if (folders?.length) {
      finalData.push({ title: "Folders", data: folders });
    }

    return finalData;
  }, [searchResults]) as unknown as readonly SectionListData<
    FolderType & NoteType,
    { title: string; data: NoteType[] } | { title: string; data: FolderType[] }
  >[];

  const renderItem = useCallback(
    ({
      item,
      section: { title },
    }: {
      item: FolderType & NoteType;
      section: { title: string };
    }) => {
      if (title === "Notes") {
        return (
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
        );
      }

      if (title === "Folders") {
        return (
          <NoteFolderRow
            key={item._id}
            folder={item}
            onPress={() =>
              navigate(constants.screens.folderNotes, {
                folderName: item.title,
                noteIds: item.noteIds,
              })
            }
          />
        );
      }

      return null;
    },
    [navigate]
  );

  if (isLoading) {
    return <NoteWizardSpinner />;
  }

  return (
    <View>
      <SectionList
        // for escape of hidding last items
        mb={220}
        sections={data}
        keyExtractor={(item, index) => index + item._id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View backgroundColor={currentTheme.background}>
            <Heading fontSize="xl" pb="4">
              {title}
            </Heading>
          </View>
        )}
        ListEmptyComponent={() =>
          !isLoading && (
            <Center>
              <Heading>We found nothing!</Heading>
            </Center>
          )
        }
      />
    </View>
  );
};

export default SearchList;
