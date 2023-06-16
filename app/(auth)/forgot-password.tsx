import { Input, Stack, Text, View } from "native-base";
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Button } from "../../components";
import { useNoteWizardTheme } from "../../hooks";
import { constants } from "../../config/constants";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { dark } = useNoteWizardTheme();
  const isDisabled = useMemo(() => phone === "" || phone.length < 10, [phone]);

  return (
    <View ml={9} mr={9} mt={10}>
      <Stack space={5}>
        <Text fontWeight={500} textAlign="center" fontSize={18}>
          Enter your phone number
        </Text>

        <Input
          size="xl"
          borderColor={dark.main}
          borderRadius={8}
          placeholderTextColor={dark.main}
          color={dark.main}
          placeholder="Phone"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(text)}
          _focus={{
            backgroundColor: "transparency",
            borderColor: dark.main,
          }}
        />

        <Button
          text="Send"
          isDisabled={isDisabled}
          onPress={() => router.push(constants.routes.verification)}
        />
      </Stack>
    </View>
  );
};

export default ForgotPassword;
