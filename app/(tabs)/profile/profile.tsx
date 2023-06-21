import { useRouter } from "expo-router";
import { Text, View } from "native-base";
import { constants } from "../../../config/constants";

const Profile = () => {
  const router = useRouter();
  return (
    <View>
      <Text onPress={() => router.push(constants.routes.editProfile)}>Edit Profile</Text>
    </View>
  );
};

export default Profile;
