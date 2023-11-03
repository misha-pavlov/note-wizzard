import { useRouter } from "expo-router";
import { Avatar, ScrollView, Text, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../../../config/constants";
import { useNoteWizardTheme } from "../../../hooks";
import { Button, NoteWizardSpinner } from "../../../components";
import { PersonalInfo, Statistic } from "./components";
import { useAuth } from "../../../context/auth";
import { useCurrentUserQuery } from "../../../store/userApi/user.api";
import { getUserInitials, getUserName } from "../../../helpers/user-helpers";
import { useGetUserStatisticQuery } from "../../../store/noteApi/note.api";

const Profile = () => {
  const router = useRouter();
  const { currentTheme } = useNoteWizardTheme();
  const { signOut } = useAuth();
  const { data: user, isLoading } = useCurrentUserQuery();
  const { data: userStatistic, isLoading: isUserStatisticLoading } =
    useGetUserStatisticQuery(undefined, { pollingInterval: 10000 });

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
            <Text color={currentTheme.font} fontSize={18}>
              {getUserInitials(user)}
            </Text>
          </Avatar>

          <Text fontSize={16} fontWeight={500}>
            {getUserName(user)}
          </Text>

          <Button
            text="Edit Profile"
            onPress={() => router.push(constants.routes.editProfile)}
            useTextTag
          />
        </VStack>

        <VStack space={4}>
          <Text fontSize={16}>Statistic</Text>
          <Statistic isLoading={isUserStatisticLoading} {...userStatistic} />
        </VStack>

        <VStack space={4}>
          <Text fontSize={16}>Personal info</Text>
          <PersonalInfo user={user} />
        </VStack>

        <Button text="Log out" useTextTag isRedButton onPress={onPress} />
      </VStack>
    </ScrollView>
  );
};

export default Profile;
