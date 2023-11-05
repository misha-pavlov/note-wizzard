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
  Alert,
  VStack,
  CloseIcon,
  Center,
} from "native-base";
import { useRouter } from "expo-router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/auth";
import { useGoogleAuth, useNoteWizardTheme } from "../../hooks";
import { Button } from "../../components";
import { constants } from "../../config/constants";
import withCountryPicker, { SignInUpProps } from "./hocs/withCountryPicker";
import { useSignInMutation } from "../../store/userApi/user.api";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

const initialState = {
  phone: "",
  password: "",
};

const SignIn: FC<SignInUpProps> = ({ InputLeftElement, countryCode }) => {
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const { signIn: authSignIn } = useAuth();
  const router = useRouter();
  const { light, dark } = useNoteWizardTheme();
  const [signIn, { data, error, isLoading }] = useSignInMutation();
  const { signIn: signInWithGoogle, googleUserData } = useGoogleAuth();

  useEffect(() => {
    const newUserData = data || googleUserData;
    if (newUserData) {
      // set new token
      (async () =>
        AsyncStorage.setItem(
          constants.localStorageKeys.token,
          newUserData.token
        ))();
      // redirect to home screen
      authSignIn(newUserData.token);
    }
  }, [data, googleUserData]);

  useEffect(() => {
    if (error) {
      // show error message
      setShowError(true);
    }
  }, [error]);

  const onSignIn = useCallback(
    () =>
      countryCode &&
      signIn({ phone: countryCode + state.phone, password: state.password }),
    [state, countryCode]
  );

  const onChange = useCallback(
    (newValue: string | boolean, key: string) =>
      setState({ ...state, [key]: newValue }),
    [state]
  );

  const isDisabled = useMemo(() => {
    const { phone, password } = state;
    return (
      phone === "" ||
      phone.length < 10 ||
      password === "" ||
      password.length < 8
    );
  }, [state]);

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
            Note Wizard
          </Text>

          <Stack space={5} mb={20}>
            <Text color={dark.main}>Login to your Account</Text>
            <FormControl isInvalid={false}>
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
            </FormControl>

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
                <Text
                  color={light.gray}
                  onPress={() => router.push(constants.routes.forgotPassword)}
                >
                  Forgot password?
                </Text>
              </FormControl.HelperText>
            </FormControl>
          </Stack>

          <Stack space={10}>
            <Button
              text="Sign in"
              isDisabled={isDisabled || isLoading}
              onPress={onSignIn}
            />

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
                or Sign in with
              </Text>
            </View>

            <HStack alignItems="center" justifyContent="center">
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={signInWithGoogle}
              />
            </HStack>

            <HStack alignItems="center" justifyContent="space-around">
              <Text color={light.gray} fontWeight={500} fontSize={16}>
                Don't have an account?
              </Text>
              <Text
                color={light.purple}
                fontWeight={500}
                fontSize={16}
                onPress={() => router.replace(constants.routes.signUp)}
              >
                Sign up
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

export default withCountryPicker(SignIn);
