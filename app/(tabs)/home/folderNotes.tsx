import { useRouter } from "expo-router";
import { View, Text } from "native-base";
import { constants } from "../../../config/constants";

const FolderNotes = () => {
  const router = useRouter();
  return (
    <View>
      <Text onPress={() => router.push(constants.routes.note)}>Note</Text>
      <Text onPress={router.back}>BAck</Text>
    </View>
  );
};

export default FolderNotes;
