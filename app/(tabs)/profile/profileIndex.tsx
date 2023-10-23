import { useRouter } from "expo-router";
import { Avatar, ScrollView, Text, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";
import { Button, NoteWizardSpinner } from "../../../components";
import { PersonalInfo, Statictic } from "./components";
import { useAuth } from "../../../context/auth";
import { useCurrentUserQuery } from "../../../store/userApi/user.api";
import { getUserInitials } from "../../../helpers/user-helpers";

const Profile = () => {
  const router = useRouter();
  const { currentTheme } = useNoteWizardTheme();
  const { signOut } = useAuth();
  const { data: user, isLoading } = useCurrentUserQuery();

  const onPress = () => {
    signOut();
    (async () => AsyncStorage.removeItem(constants.localStorageKeys.token))();
  };

  if (isLoading || !user) {
    return <NoteWizardSpinner />;
  }

  return (
    <ScrollView
      flex={1}
      backgroundColor={currentTheme.background}
      px={4}
      py={6}
    >
      <VStack space={5} pb={10}>
        <VStack alignItems="center" space={4} pb={6}>
          <Avatar
            bg={currentTheme.main}
            source={{
              uri: user?.image,
            }}
            size="xl"
          >
            {getUserInitials(user)}
          </Avatar>

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

        <Button text="Log out" useTextTag isRedButton onPress={onPress} />
      </VStack>
    </ScrollView>
  );
};

export default Profile;
