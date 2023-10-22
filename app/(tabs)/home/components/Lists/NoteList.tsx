import { Text, Stack, View } from "native-base";
import { FC, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";
import { constants } from "../../../../../config/constants";
import { useGetAllUserNotesQuery } from "../../../../../store/noteApi/note.api";
import { NoteFolderRow, NoteFolderSquare } from "../../../../../components";
import { NoteType } from "../../../../../dataTypes/note.types";
import { usePreviousProps } from "../../../../../hooks";

type NoteListProps = {
  isAllTab?: boolean;
  hideHeader?: boolean;
  sortType: string | null;
};

const NoteList: FC<NoteListProps> = ({ isAllTab, hideHeader, sortType }) => {
  const previousProps = usePreviousProps<NoteListProps>({
    isAllTab,
    hideHeader,
    sortType,
  });
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { data: allUserNotes, isLoading } = useGetAllUserNotesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const renderItem = useCallback(
    ({ item }: { item: NoteType }) =>
      sortType === constants.sortTypes.rows ? (
        <NoteFolderRow
          key={item._id}
          note={item}
          onPress={() =>
            // TODO: fixe types here
            // @ts-ignore
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
            // TODO: fixe types here
            // @ts-ignore
            navigate(constants.screens.note, {
              noteName: item.name,
              noteId: item._id,
            })
          }
        />
      ),
    [sortType]
  );

  if (isLoading || !allUserNotes || !previousProps) {
    return <ActivityIndicator />;
  }

  return (
    <Stack space={4}>
      {!hideHeader && (
        <Text fontWeight={700}>
          My {isAllTab ? "Notes" : "Important Notes"}
        </Text>
      )}

      {/* 32 - padding left + right, 81% - height to the bottom nav*/}
      <View width={width - 32} height="81%">
        <FlashList
          data={allUserNotes}
          renderItem={renderItem}
          estimatedItemSize={sortType === constants.sortTypes.rows ? 84 : 125}
          ListEmptyComponent={<Text>{constants.emptyLists.note}</Text>}
          // refetch FlashList on change sortType
          extraData={previousProps}
          numColumns={sortType === constants.sortTypes.rows ? 1 : 2}
        />
      </View>
    </Stack>
  );
};

export default NoteList;
