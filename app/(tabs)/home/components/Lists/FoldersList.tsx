import { Text, Stack, View } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";
import { constants } from "../../../../../config/constants";

const DATA = [
  {
    title: "First Item 123",
  },
  {
    title: "Second Item 123",
  },
];

type NavigateType = [string, { folderName: string }];

const FoldersList = () => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  return (
    <Stack space={4}>
      <Text fontWeight={700}>My Folders</Text>

      {/* 32 - padding left + right, 81% - height to the bottom nav*/}
      <View width={width - 32} height="81%">
        <FlashList
          data={DATA}
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
          // TODO: SET TH NEXT VALUE CORRECTLY
          estimatedItemSize={200}
        />
      </View>
    </Stack>
  );
};

export default FoldersList;
