import { SafeAreaView } from "react-native-safe-area-context";
import {
  Divider,
  FormControl,
  IconButton,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
  HStack,
  View,
  Center,
  Alert,
  VStack,
  CloseIcon,
} from "native-base";
import { useRouter } from "expo-router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/auth";
import { useNoteWizardTheme } from "../../hooks";
import { Button } from "../../components";
import { constants } from "../../config/constants";
import withCountryPicker, { SignInUpProps } from "./hocs/withCountryPicker";
import { useSignUpMutation } from "../../store/userApi/user.api";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
};

const SignUp: FC<SignInUpProps> = ({ InputLeftElement, countryCode }) => {
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const { signIn: authSignIn } = useAuth();
  const router = useRouter();
  const { light, dark } = useNoteWizardTheme();
  const [signUp, { data, error, isLoading }] = useSignUpMutation();

  useEffect(() => {
    if (data) {
      // set new token
      (async () =>
        AsyncStorage.setItem(constants.localStorageKeys.token, data.token))();
      // redirect to home screen
      authSignIn(data.token);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // show error message
      setShowError(true);
    }
  }, [error]);

  const onSignUp = useCallback(() => {
    const { firstName, lastName, phone, password } = state;
    countryCode &&
      signUp({ firstName, lastName, phone: countryCode + phone, password });
  }, [state, countryCode]);

  const onChange = useCallback(
    (newValue: string | boolean, key: string) =>
      setState({ ...state, [key]: newValue }),
    [state]
  );

  const isDisabled = useMemo(() => {
    const { firstName, lastName, phone, password } = state;
    return (
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      phone.length < 10 ||
      password === "" ||
      password.length < 8 ||
      isLoading
    );
  }, [state, isLoading]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View ml={9} mr={9}>
          <Text
            color={light.purple}
            fontWeight={700}
            textAlign="center"
            fontSize={28}
            mt={6}
            mb={20}
          >
            NoteWizard
          </Text>

          <Stack space={5} mb={20}>
            <Text color={dark.main}>Create Account</Text>
            <Input
              size="xl"
              borderColor={dark.main}
              borderRadius={8}
              placeholderTextColor={dark.main}
              color={dark.main}
              placeholder="First name"
              value={state.firstName}
              onChangeText={(text) => onChange(text, "firstName")}
              _focus={{
                backgroundColor: "transparency",
                borderColor: dark.main,
              }}
            />

            <Input
              size="xl"
              borderColor={dark.main}
              borderRadius={8}
              placeholderTextColor={dark.main}
              color={dark.main}
              placeholder="Last name"
              value={state.lastName}
              onChangeText={(text) => onChange(text, "lastName")}
              _focus={{
                backgroundColor: "transparency",
                borderColor: dark.main,
              }}
            />

            <Input
              size="xl"
              borderColor={dark.main}
              borderRadius={8}
              placeholderTextColor={dark.main}
              color={dark.main}
              placeholder="Phone"
              value={state.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => onChange(text, "phone")}
              _focus={{
                backgroundColor: "transparency",
                borderColor: dark.main,
              }}
              InputLeftElement={InputLeftElement}
            />

            <FormControl>
              <Input
                size="xl"
                borderColor={dark.main}
                borderRadius={8}
                placeholderTextColor={dark.main}
                color={dark.main}
                placeholder="Password"
                value={state.password}
                onChangeText={(text) => onChange(text, "password")}
                type={showPassword ? "text" : "password"}
                InputRightElement={
                  <Pressable
                    onPress={() => setShowPassword((prevProps) => !prevProps)}
                    pr={2}
                  >
                    {showPassword ? (
                      <Feather name="eye-off" size={24} color={dark.main} />
                    ) : (
                      <Feather name="eye" size={24} color={dark.main} />
                    )}
                  </Pressable>
                }
                _focus={{
                  backgroundColor: "transparency",
                  borderColor: dark.main,
                }}
              />
              <FormControl.HelperText alignSelf="flex-end">
                <Text color={light.gray}>at least 8 chapters</Text>
              </FormControl.HelperText>
            </FormControl>
          </Stack>

          <Stack space={10}>
            <Button text="Sign up" isDisabled={isDisabled} onPress={onSignUp} />

            <View position="relative" display="flex" justifyContent="center">
              <Divider bg={light.gray} />
              <Text
                color={light.gray}
                bg={light.white}
                position="absolute"
                alignSelf="center"
                pl="2"
                pr="2"
              >
                or Sign up with
              </Text>
            </View>

            <HStack alignItems="center" justifyContent="space-around">
              <IconButton
                icon={<AntDesign name="google" size={32} color="black" />}
                borderRadius="full"
              />
              <IconButton
                icon={<FontAwesome5 name="facebook" size={32} color="black" />}
                borderRadius="full"
              />
              <IconButton
                icon={<AntDesign name="apple1" size={32} color="black" />}
                borderRadius="full"
              />
            </HStack>

            <HStack alignItems="center" justifyContent="space-around">
              <Text color={light.gray} fontWeight={500} fontSize={16}>
                Already have an account?
              </Text>
              <Text
                color={light.purple}
                fontWeight={500}
                fontSize={16}
                onPress={() => router.replace(constants.routes.signIn)}
              >
                Sign in
              </Text>
            </HStack>
          </Stack>
        </View>

        {showError && error && (
          <Center position="absolute" top={120} w="100%">
            <Alert w="80%" status="error">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {/* @ts-ignore - because data is exists but types said that not */}
                      {error?.data?.message || error?.error}
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: "coolGray.600",
                    }}
                    onPress={() => setShowError(false)}
                  />
                </HStack>
              </VStack>
            </Alert>
          </Center>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default withCountryPicker(SignUp);
