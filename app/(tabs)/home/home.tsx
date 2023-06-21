import { useRouter } from "expo-router";
import { Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { constants } from "../../../config/constants";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text onPress={() => router.push(constants.routes.folderNotes)}>FN</Text>
    </SafeAreaView>
  );
};

export default Home;
