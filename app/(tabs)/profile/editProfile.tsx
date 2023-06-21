import { useRouter } from "expo-router";
import { Text, View } from "native-base";

const EditProfile = () => {
  const router = useRouter();
  return (
    <View>
      <Text onPress={router.back}>Back</Text>
    </View>
  );
};

export default EditProfile;
