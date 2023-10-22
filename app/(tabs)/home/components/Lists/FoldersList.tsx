import { Text, Stack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";
import { FC, useCallback } from "react";
import { constants } from "../../../../../config/constants";
import { usePreviousProps } from "../../../../../hooks";
import { useGetFoldersForUserQuery } from "../../../../../store/folderApi/folder.api";
import { FolderType } from "../../../../../dataTypes/folder.types";
import { NoteFolderRow, NoteFolderSquare } from "../../../../../components";

type FoldersListProps = {
  sortType: string | null;
};
type NavigateType = [string, { folderName: string }];

const FoldersList: FC<FoldersListProps> = ({ sortType }) => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const previousProps = usePreviousProps<FoldersListProps>({
    sortType,
  });
  const { data: foldersForUser, isLoading } = useGetFoldersForUserQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    }
  );

  const renderItem = useCallback(
    ({ item }: { item: FolderType }) =>
      sortType === constants.sortTypes.rows ? (
        <NoteFolderRow
          key={item._id}
          folder={item}
          onPress={() =>
            // TODO: fixe types here
            // @ts-ignore
            navigate(constants.screens.note, {
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
            navigate(constants.screens.note, {
              folderName: item.title,
              noteId: item._id,
            })
          }
        />
      ),
    [sortType]
  );

  if (isLoading || !foldersForUser || !previousProps) {
    return <ActivityIndicator />;
  }

  return (
    <Stack space={4}>
      <Text fontWeight={700}>My Folders</Text>

      {/* 32 - padding left + right, 81% - height to the bottom nav*/}
      <View width={width - 32} height="81%">
        <FlashList
          data={foldersForUser}
          renderItem={renderItem}
          ListEmptyComponent={<Text>{constants.emptyLists.folder}</Text>}
          estimatedItemSize={sortType === constants.sortTypes.rows ? 84 : 125}
          extraData={previousProps}
          numColumns={sortType === constants.sortTypes.rows ? 1 : 2}
        />
      </View>
    </Stack>
  );
};

export default FoldersList;
