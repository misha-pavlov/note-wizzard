import { Text, Stack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, useWindowDimensions } from "react-native";
import { FC, useCallback } from "react";
import { constants } from "../../../../../config/constants";
import {
  useCustomNavigation,
  useGetFoldersForUserQueryWithFetchMore,
  useNoteWizardTheme,
  usePreviousProps,
} from "../../../../../hooks";
import { FolderType } from "../../../../../dataTypes/folder.types";
import {
  NoteFolderRow,
  NoteFolderSquare,
  NoteWizardSpinner,
} from "../../../../../components";

type FoldersListProps = {
  sortType: string | null;
};

const FoldersList: FC<FoldersListProps> = ({ sortType }) => {
  const { width } = useWindowDimensions();
  const { navigate } = useCustomNavigation();
  const { currentTheme } = useNoteWizardTheme();
  const previousProps = usePreviousProps<FoldersListProps>({
    sortType,
  });
  const {
    folders,
    isLoading,
    fetchMore,
    isRefreshing,
    onRefresh,
    isFetchingMore,
  } = useGetFoldersForUserQueryWithFetchMore();

  const renderItem = useCallback(
    ({ item }: { item: FolderType }) =>
      sortType === constants.sortTypes.rows ? (
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
      ) : (
        <NoteFolderSquare
          key={item._id}
          folder={item}
          onPress={() =>
            navigate(constants.screens.folderNotes, {
              folderName: item.title,
              noteIds: item.noteIds,
            })
          }
        />
      ),
    [sortType]
  );

  if (isLoading || !previousProps) {
    return <NoteWizardSpinner />;
  }

  return (
    <Stack space={4}>
      <Text fontWeight={700}>My Folders</Text>

      {/* 32 - padding left + right, 82% - height to the bottom nav*/}
      <View width={width - 32} height="82%">
        <FlashList
          data={folders}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text textAlign="center" fontSize={16}>
              {constants.emptyLists.folder}
            </Text>
          }
          estimatedItemSize={sortType === constants.sortTypes.rows ? 84 : 125}
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
          ListFooterComponent={isFetchingMore ? <NoteWizardSpinner /> : null}
        />
      </View>
    </Stack>
  );
};

export default FoldersList;
