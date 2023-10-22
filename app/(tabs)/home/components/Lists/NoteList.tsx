import { Text, Stack, View } from "native-base";
import { FC, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import {
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { constants } from "../../../../../config/constants";
import { NoteFolderRow, NoteFolderSquare } from "../../../../../components";
import { NoteType } from "../../../../../dataTypes/note.types";
import {
  useCustomNavigation,
  useGetAllUserNotesQueryWithFetchMore,
  useNoteWizardTheme,
  usePreviousProps,
} from "../../../../../hooks";

type NoteListProps = {
  sortType: string | null;
  isAllTab?: boolean;
  isImportant?: boolean;
  hideHeader?: boolean;
};

const NoteList: FC<NoteListProps> = ({
  isAllTab,
  hideHeader,
  sortType,
  isImportant,
}) => {
  const previousProps = usePreviousProps<NoteListProps>({
    isAllTab,
    hideHeader,
    sortType,
  });
  const { width } = useWindowDimensions();
  const { navigate } = useCustomNavigation();
  const { currentTheme } = useNoteWizardTheme();
  const {
    notes,
    isLoading,
    fetchMore,
    isRefreshing,
    onRefresh,
    isFetchingMore,
  } = useGetAllUserNotesQueryWithFetchMore(isImportant);

  const renderItem = useCallback(
    ({ item }: { item: NoteType }) =>
      sortType === constants.sortTypes.rows ? (
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
      ) : (
        <NoteFolderSquare
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
    [sortType]
  );

  if (isLoading || !previousProps) {
    return <ActivityIndicator />;
  }

  return (
    <Stack space={4}>
      {!hideHeader && (
        <Text fontWeight={700}>
          My {isAllTab ? "Notes" : "Important Notes"}
        </Text>
      )}

      {/* 32 - padding left + right, 82% - height to the bottom nav*/}
      <View width={width - 32} height="82%">
        <FlashList
          data={notes}
          renderItem={renderItem}
          estimatedItemSize={sortType === constants.sortTypes.rows ? 84 : 125}
          ListEmptyComponent={<Text>{constants.emptyLists.note}</Text>}
          // refetch FlashList on change sortType
          extraData={previousProps}
          numColumns={sortType === constants.sortTypes.rows ? 1 : 2}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          refreshControl={
            <RefreshControl
              tintColor={currentTheme.purple}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReached={fetchMore}
          ListFooterComponent={
            isFetchingMore ? (
              <ActivityIndicator color={currentTheme.purple} />
            ) : null
          }
        />
      </View>
    </Stack>
  );
};

export default NoteList;
