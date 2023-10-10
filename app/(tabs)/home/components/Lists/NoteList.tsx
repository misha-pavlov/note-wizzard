import { Text, Stack, View, Divider } from "native-base";
import { FC } from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";
import { constants } from "../../../../../config/constants";
import { useGetAllUserNotesQuery } from "../../../../../store/noteApi/note.api";
import { NoteFolderRow } from "../../../../../components";

type NoteListProps = {
  isAllTab?: boolean;
  hideHeader?: boolean;
};

const NoteList: FC<NoteListProps> = ({ isAllTab, hideHeader }) => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { data: allUserNotes, isLoading } = useGetAllUserNotesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 10000,
  });

  if (isLoading || !allUserNotes) {
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
          renderItem={({ item }) => (
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
          )}
          // TODO: SET TH NEXT VALUE CORRECTLY
          estimatedItemSize={200}
          ListEmptyComponent={<Text>You don't have any notes</Text>}
        />
      </View>
    </Stack>
  );
};

export default NoteList;
