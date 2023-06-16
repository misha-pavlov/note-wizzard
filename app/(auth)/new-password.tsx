import { FormControl, Input, Pressable, Stack, Text, View } from "native-base";
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Button } from "../../components";
import { useNoteWizardTheme } from "../../hooks";
import { constants } from "../../config/constants";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { light, dark } = useNoteWizardTheme();
  const isDisabled = useMemo(
    () =>
      password === "" ||
      password.length < 8 ||
      confirmPassword === "" ||
      confirmPassword.length < 8 ||
      password !== confirmPassword,
    [password, confirmPassword]
  );

  return (
    <SafeAreaView>
      <View ml={9} mr={9} mt={10}>
        <Stack space={5}>
          <Text fontWeight={500} textAlign="center" fontSize={18}>
            Enter new password
          </Text>

          <FormControl>
            <Input
              size="xl"
              borderColor={dark.main}
              borderRadius={8}
              placeholderTextColor={dark.main}
              color={dark.main}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
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

          <Input
            size="xl"
            borderColor={dark.main}
            borderRadius={8}
            placeholderTextColor={dark.main}
            color={dark.main}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            type={showConfirmPassword ? "text" : "password"}
            InputRightElement={
              <Pressable
                onPress={() =>
                  setShowConfirmPassword((prevProps) => !prevProps)
                }
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

          <Button
            text="Submit"
            isDisabled={isDisabled}
            onPress={() => router.replace(constants.routes.signIn)}
          />
        </Stack>
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;
