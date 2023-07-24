import { useRouter } from "expo-router";
import { Avatar, ScrollView, Text, VStack } from "native-base";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";
import { Button } from "../../../components";
import { PersonalInfo, Statictic } from "./components";

const Profile = () => {
  const router = useRouter();
  const { currentTheme } = useNoteWizardTheme();

  return (
    <ScrollView
      flex={1}
      backgroundColor={currentTheme.background}
      px={4}
      py={6}
    >
      <VStack space={5}>
        <VStack alignItems="center" space={4} pb={6}>
          <Avatar
            bg={currentTheme.main}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            size="xl"
          />

          <Text fontSize={16} fontWeight={500}>
            First Last
          </Text>

          <Button
            text="Edit Profile"
            onPress={() => router.push(constants.routes.editProfile)}
            useTextTag
          />
        </VStack>

        <VStack space={4}>
          <Text fontSize={16}>Statistic</Text>
          <Statictic />
        </VStack>

        <VStack space={4}>
          <Text fontSize={16}>Personal info</Text>
          <PersonalInfo />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Profile;
