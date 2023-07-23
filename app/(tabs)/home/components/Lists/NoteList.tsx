import { Text, Stack, View } from "native-base";
import { FC } from "react";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";
import { constants } from "../../../../../config/constants";

type NoteListProps = {
  isAllTab?: boolean;
  hideHeader?: boolean;
};

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

const NoteList: FC<NoteListProps> = ({ isAllTab, hideHeader }) => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

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
          data={DATA}
          renderItem={({ item }) => (
            <Text
              onPress={() =>
                // TODO: fixe types here
                // @ts-ignore
                navigate(constants.screens.note, {
                  note: "GG_NOTE",
                })
              }
            >
              {item.title}
            </Text>
          )}
          // TODO: SET TH NEXT VALUE CORRECTLY
          estimatedItemSize={200}
        />
      </View>
    </Stack>
  );
};

export default NoteList;
