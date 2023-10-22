import { Text, Stack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";
import { FC } from "react";
import { constants } from "../../../../../config/constants";
import { usePreviousProps } from "../../../../../hooks";
import { useGetFoldersForUserQuery } from "../../../../../store/folderApi/folder.api";

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
          renderItem={({ item }) => (
            <Text
              onPress={() =>
                // TODO: fixe types here
                // @ts-ignore
                navigate<NavigateType>(constants.screens.folderNotes, {
                  folderName: "GG_FOLDER",
                })
              }
            >
              {item.title}
            </Text>
          )}
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
