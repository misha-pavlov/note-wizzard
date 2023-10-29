import { Input, Stack, Text, View } from "native-base";
import { FC, useMemo, useState } from "react";
import { Button } from "../../components";
import { useCustomNavigation, useNoteWizardTheme } from "../../hooks";
import { constants } from "../../config/constants";
import withCountryPicker, { SignInUpProps } from "./hocs/withCountryPicker";

const ForgotPassword: FC<SignInUpProps> = ({
  InputLeftElement,
  countryCode,
}) => {
  const [phone, setPhone] = useState("");
  const { dark } = useNoteWizardTheme();
  const isDisabled = useMemo(() => phone === "" || phone.length < 10, [phone]);
  const { navigate } = useCustomNavigation();

  return (
    <View ml={9} mr={9} mt={10}>
      <Stack space={5}>
        <Text
          fontWeight={500}
          textAlign="center"
          fontSize={18}
          color={dark.main}
        >
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
          InputLeftElement={InputLeftElement}
        />

        <Button
          text="Send"
          isDisabled={isDisabled}
          onPress={() =>
            navigate(constants.screens.verification, {
              phone: phone.includes("+") ? phone : countryCode + phone,
            })
          }
        />
      </Stack>
    </View>
  );
};

export default withCountryPicker(ForgotPassword);
