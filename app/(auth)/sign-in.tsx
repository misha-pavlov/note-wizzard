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
  VStack,
  View,
} from "native-base";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Feather,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { useAuth } from "../../context/auth";
import { useNoteWizardTheme } from "../../hooks";
import { Button } from "../../components";
import { constants } from "../../config/constants";

const initialState = {
  phone: "",
  password: "",
};

const SignIn = () => {
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const { light, dark } = useNoteWizardTheme();

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
            NoteWizard
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
              isDisabled={isDisabled}
              onPress={signIn}
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

            <View alignItems="center">
              <IconButton
                icon={
                  <MaterialCommunityIcons
                    name="face-recognition"
                    size={45}
                    color={light.purple}
                  />
                }
                borderRadius="full"
              />
              <Text color={dark.main}>Use Face ID</Text>
            </View>

            <VStack
              alignItems="center"
              justifyContent="space-around"
              flexDirection="row"
            >
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
            </VStack>

            <VStack
              alignItems="center"
              justifyContent="space-around"
              flexDirection="row"
            >
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
            </VStack>
          </Stack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
