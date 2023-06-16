import { SafeAreaView } from "react-native-safe-area-context";
import {
  Checkbox,
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
import { useState } from "react";
import { Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/auth";
import { useNoteWizardTheme } from "../../hooks";
import { Button } from "../../components";
import { constants } from "../../config/constants";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const { light, dark } = useNoteWizardTheme();

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

          <Stack space={5} mb={5}>
            <Text color={dark.main}>Create Account</Text>
            <FormControl isInvalid={false}>
              <Input
                size="xl"
                borderColor={dark.main}
                borderRadius={8}
                placeholderTextColor={dark.main}
                color={dark.main}
                placeholder="Name"
                _focus={{
                  backgroundColor: "transparency",
                  borderColor: dark.main,
                }}
              />
            </FormControl>

            <FormControl isInvalid={false}>
              <Input
                size="xl"
                borderColor={dark.main}
                borderRadius={8}
                placeholderTextColor={dark.main}
                color={dark.main}
                placeholder="Phone"
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

            <Checkbox value="purple" colorScheme="purple" defaultIsChecked>
              I agree to the Terms and Privacy
            </Checkbox>
          </Stack>

          <Stack space={10}>
            <Button text="Sign in" onPress={() => console.log("123")} />

            <View position="relative" display="flex" justifyContent="center">
              <Divider bg={light.gray} />
              <Text
                color={light.gray}
                bg="white"
                position="absolute"
                alignSelf="center"
                pl="2"
                pr="2"
              >
                or Sign up with
              </Text>
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
                Already have an account?
              </Text>
              <Text
                color={light.purple}
                fontWeight={500}
                fontSize={16}
                onPress={() => router.push(constants.routes.signIn)}
              >
                Sign in
              </Text>
            </VStack>
          </Stack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
