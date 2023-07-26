import { ScrollView, VStack, Avatar, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { useNavigation } from "expo-router";
import { useNoteWizardTheme } from "../../../hooks";
import { Button } from "../../../components";
import { FloatingTitleTextInputField } from "./components";

const EditProfile = () => {
  const { currentTheme } = useNoteWizardTheme();
  const [image, setImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ [x: string]: string }>({
    firstName: "",
  });
  const { goBack } = useNavigation();
  console.log("🚀 ~ file: editProfile.tsx:10 ~ EditProfile ~ image:", image);

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const updateMasterState = useCallback(
    (attrName: string, value: string) =>
      setProfile({ ...profile, [attrName]: value }),
    [profile]
  );

  return (
    <ScrollView
      flex={1}
      backgroundColor={currentTheme.background}
      px={4}
      py={6}
    >
      <VStack space={7} alignItems="center">
        <Pressable onPress={pickImage} _pressed={{ opacity: 0.5 }}>
          <Avatar
            bg={currentTheme.main}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            size="xl"
          >
            <Avatar.Badge
              backgroundColor={currentTheme.purple}
              alignItems="center"
              justifyContent="center"
            >
              <Feather name="edit" size={12} color={currentTheme.main} />
            </Avatar.Badge>
          </Avatar>
        </Pressable>

        <VStack width="100%" space={4}>
          <FloatingTitleTextInputField
            title="First Name"
            value={profile.firstName}
            updateMasterState={updateMasterState}
            attrName="firstName"
            titleActiveSize={12}
            titleInActiveSize={17}
            titleActiveColor={currentTheme.font}
            titleInactiveColor={currentTheme.gray}
          />

          <FloatingTitleTextInputField
            title="Last Name"
            value={profile.firstName}
            updateMasterState={updateMasterState}
            attrName="lastName"
            titleActiveSize={12}
            titleInActiveSize={17}
            titleActiveColor={currentTheme.font}
            titleInactiveColor={currentTheme.gray}
          />

          <FloatingTitleTextInputField
            title="Birthday"
            value={profile.firstName}
            updateMasterState={updateMasterState}
            attrName="birthday"
            titleActiveSize={12}
            titleInActiveSize={17}
            titleActiveColor={currentTheme.font}
            titleInactiveColor={currentTheme.gray}
          />

          {/* TODO: ADD FORMATIC */}
          <FloatingTitleTextInputField
            title="Phone"
            value={profile.firstName}
            updateMasterState={updateMasterState}
            attrName="phone"
            titleActiveSize={12}
            titleInActiveSize={17}
            titleActiveColor={currentTheme.font}
            titleInactiveColor={currentTheme.gray}
          />

          <FloatingTitleTextInputField
            title="Email"
            value={profile.firstName}
            updateMasterState={updateMasterState}
            attrName="email"
            titleActiveSize={12}
            titleInActiveSize={17}
            titleActiveColor={currentTheme.font}
            titleInactiveColor={currentTheme.gray}
          />

          <FloatingTitleTextInputField
            title="Password"
            value={profile.firstName}
            updateMasterState={updateMasterState}
            attrName="password"
            titleActiveSize={12}
            titleInActiveSize={17}
            titleActiveColor={currentTheme.font}
            titleInactiveColor={currentTheme.gray}
          />
        </VStack>

        <Button text="Save changes" onPress={goBack} useTextTag />
      </VStack>
    </ScrollView>
  );
};

export default EditProfile;
