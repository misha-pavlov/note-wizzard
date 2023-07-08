import { Text, Stack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";

const DATA = [
  {
    title: "First Item 123",
  },
  {
    title: "Second Item 123",
  },
];

const FoldersList = () => {
  const { width } = useWindowDimensions();

  return (
    <Stack space={4}>
      <Text fontWeight={700}>My Folders</Text>

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

export default FoldersList;
