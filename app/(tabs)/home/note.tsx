import { useRouter } from "expo-router";
import { View, Text } from "native-base";

const Note = () => {
  const router = useRouter();
  return (
    <View>
      <Text onPress={router.back}>BAck</Text>
    </View>
  );
};

export default Note;
