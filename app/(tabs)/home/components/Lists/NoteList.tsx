import { Text, Stack, View } from "native-base";
import { FC } from "react";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";

type NoteListProps = {
  isAllTab?: boolean;
};

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

const NoteList: FC<NoteListProps> = ({ isAllTab }) => {
  const { width } = useWindowDimensions();

  return (
    <Stack space={4}>
      <Text fontWeight={700}>My {isAllTab ? "Notes" : "Important Notes"}</Text>

      {/* 32 - padding left + right, 81% - height to the bottom nav*/}
      <View width={width - 32} height="81%">
        <FlashList
          data={DATA}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          // TODO: SET TH NEXT VALUE CORRECTLY
          estimatedItemSize={200}
        />
      </View>
    </Stack>
  );
};

export default NoteList;
