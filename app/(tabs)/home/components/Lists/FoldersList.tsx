import { Text, Stack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import {
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { FC, useCallback } from "react";
import { constants } from "../../../../../config/constants";
import { useNoteWizardTheme, usePreviousProps } from "../../../../../hooks";
import { FolderType } from "../../../../../dataTypes/folder.types";
import { NoteFolderRow, NoteFolderSquare } from "../../../../../components";
import useGetFoldersForUserQueryWithFetchMore from "../../../../../hooks/folder/useGetFoldersForUserQueryWithFetchMore";

type FoldersListProps = {
  sortType: string | null;
};
type NavigateType = [string, { folderName: string }];

const FoldersList: FC<FoldersListProps> = ({ sortType }) => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
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
            // TODO: fixe types here
            // @ts-ignore
            navigate(constants.screens.folderNotes, {
              folderName: item.title,
            })
          }
        />
      ) : (
        <NoteFolderSquare
          key={item._id}
          folder={item}
          onPress={() =>
            // TODO: fixe types here
            // @ts-ignore
            navigate(constants.screens.folderNotes, {
              folderName: item.title,
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
      <Text fontWeight={700}>My Folders</Text>

      {/* 32 - padding left + right, 82% - height to the bottom nav*/}
      <View width={width - 32} height="82%">
        <FlashList
          data={folders}
          renderItem={renderItem}
          ListEmptyComponent={<Text>{constants.emptyLists.folder}</Text>}
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

export default FoldersList;
