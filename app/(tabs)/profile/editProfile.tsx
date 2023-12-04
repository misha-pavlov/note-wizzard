import {
  ScrollView,
  VStack,
  Avatar,
  Pressable,
  View,
  useColorMode,
  KeyboardAvoidingView,
  useToast,
  Box,
  Text,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BottomSheet } from "react-native-btr";
import { Platform } from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import dayjs from "dayjs";
import { useNoteWizardTheme } from "../../../hooks";
import { Button, NoteWizardSpinner } from "../../../components";
import {
  useCurrentUserQuery,
  useUpdateUserProfileMutation,
} from "../../../store/userApi/user.api";
import { getUserInitials, validateEmail } from "../../../helpers/user-helpers";
import { UserType } from "../../../dataTypes/user.types";
import { uploadImage } from "../../../helpers/image-helpers";
import { findChangedFields } from "../../../helpers/genereal-helpers";

const EditProfile = () => {
  const { currentTheme } = useNoteWizardTheme();
  const { goBack } = useNavigation();
  const { colorMode } = useColorMode();
  const { data: user, isLoading, refetch } = useCurrentUserQuery();
  const [image, setImage] = useState(user?.image || "");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profile, setProfile] = useState(user);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const toast = useToast();
  const [updateUserProfile, { isLoading: updateUserProfileIsLoading }] =
    useUpdateUserProfileMutation();
  const isGoogleUser = profile?.isGoogleUser;

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const updateMasterState = useCallback(
    (attrName: string, value: string | Date) =>
      setProfile({ ...profile, [attrName]: value } as UserType),
    [profile]
  );

  const toggle = () => setVisible((prev) => !prev);

  const showError = useCallback((text: string) => {
    toast.show({
      placement: "top",
      render: () => {
        return (
          <Box bg={currentTheme.red} px="2" py="1" rounded="sm" mb={5}>
            {text}
          </Box>
        );
      },
    });

    return null;
  }, []);

  const onSubmit = useCallback(async () => {
    if (!isGoogleUser && profile?.email && !validateEmail(profile.email)) {
      return showError("Email is not valid");
    }

    if (profile?.firstName === "" || profile?.lastName === "") {
      return showError("First and last names can not be empty");
    }

    if (!isGoogleUser && profile?.phone === "") {
      return showError("Phone can not be empty");
    }

    let changedFields = findChangedFields(user, profile);

    if (oldPassword !== "" && password !== "") {
      if (oldPassword === password) {
        return showError("New password should not be the same as old one");
      }

      if (oldPassword.length < 8 || password.length < 8) {
        return showError("Password should be longer then 8 chars");
      }

      changedFields.oldPassword = oldPassword;
      changedFields.password = password;
    }

    if (image !== "") {
      setIsUploadingImage(true);
      changedFields.image = await uploadImage(image);
    }

    try {
      const res = await updateUserProfile(changedFields).unwrap();

      if (res?._id) {
        setIsUploadingImage(false);
        refetch();
        goBack();
      }
    } catch (error) {
      const typesError = error as { data: { message: string } };
      if (typesError?.data?.message) {
        return showError(typesError?.data?.message);
      }
    }
  }, [oldPassword, password, showError, profile, image, isGoogleUser]);

  const keyboardVerticalOffset = Platform.select({
    ios: 150,
    default: 0,
  });

  const defaultStyles = {
    customLabelStyles: {
      colorFocused: currentTheme.font,
      colorBlurred: currentTheme.gray,
    },
    containerStyles: {
      borderWidth: 1,
      borderColor: currentTheme.font,
      borderRadius: 10,
      height: 45,
      padding: 8,
    },
    inputStyles: {
      color: currentTheme.font,
      paddingTop: 8,
    },
  };

  if (isLoading || !user || !profile) {
    return <NoteWizardSpinner />;
  }

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
              uri: image,
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
            <Text color={currentTheme.font} fontSize={18}>
              {getUserInitials(user)}
            </Text>
          </Avatar>
        </Pressable>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
          overflow="hidden"
          width="100%"
        >
          <VStack space={4}>
            <FloatingLabelInput
              label="First Name"
              value={profile.firstName}
              onChangeText={(value) => updateMasterState("firstName", value)}
              {...defaultStyles}
            />

            <FloatingLabelInput
              label="Last Name"
              value={profile.lastName}
              onChangeText={(value) => updateMasterState("lastName", value)}
              {...defaultStyles}
            />

            <View alignItems="flex-start">
              <Button
                text={`${
                  profile?.birthday
                    ? dayjs(profile?.birthday).format("DD/MM/YYYY")
                    : "No date"
                } - Change?`}
                useTextTag
                size="xs"
                onPress={toggle}
                borderRadius={10}
              />
            </View>

            {!isGoogleUser && (
              <>
                <FloatingLabelInput
                  label="Email"
                  autoCapitalize="none"
                  value={profile?.email || ""}
                  onChangeText={(value) => updateMasterState("email", value)}
                  {...defaultStyles}
                />
                <FloatingLabelInput
                  label="Phone"
                  keyboardType="numeric"
                  value={profile.phone}
                  onChangeText={(value) => updateMasterState("phone", value)}
                  {...defaultStyles}
                />
                <FloatingLabelInput
                  label="Old password"
                  isPassword
                  value={oldPassword}
                  onChangeText={(value) => setOldPassword(value)}
                  customShowPasswordComponent={
                    <Feather name="eye" size={20} color={currentTheme.font} />
                  }
                  customHidePasswordComponent={
                    <Feather
                      name="eye-off"
                      size={20}
                      color={currentTheme.font}
                    />
                  }
                  {...defaultStyles}
                />

                <FloatingLabelInput
                  label="Password"
                  isPassword
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  customShowPasswordComponent={
                    <Feather name="eye" size={20} color={currentTheme.font} />
                  }
                  customHidePasswordComponent={
                    <Feather
                      name="eye-off"
                      size={20}
                      color={currentTheme.font}
                    />
                  }
                  {...defaultStyles}
                />
              </>
            )}
          </VStack>
        </KeyboardAvoidingView>

        <Button
          text="Save changes"
          onPress={onSubmit}
          useTextTag
          isLoading={updateUserProfileIsLoading || isUploadingImage}
        />

        <BottomSheet
          visible={visible}
          onBackButtonPress={toggle}
          onBackdropPress={toggle}
        >
          <View height="60%" backgroundColor={currentTheme.background}>
            <DateTimePicker
              mode="date"
              value={new Date(profile?.birthday || Date.now())}
              display="spinner"
              onChange={(e, date) =>
                updateMasterState("birthday", date || new Date())
              }
              themeVariant={colorMode as "light" | "dark"}
            />
          </View>
        </BottomSheet>
      </VStack>
    </ScrollView>
  );
};

export default EditProfile;
