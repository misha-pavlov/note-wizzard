import {
  Pressable,
  Stack,
  Text,
  HStack,
  View,
  Center,
  Alert,
  VStack,
  IconButton,
  CloseIcon,
} from "native-base";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "expo-router";
import { useCustomNavigation, useNoteWizardTheme } from "../../hooks";
import { Button } from "../../components";
import { constants } from "../../config/constants";
import { useSendVerificationCodeMutation } from "../../store/userApi/user.api";
import withCountryPicker, { SignInUpProps } from "./hocs/withCountryPicker";

const Verification: FC<SignInUpProps> = ({ countryCode }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctNumber, setCorrectNumber] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const { navigate } = useCustomNavigation();
  const { light } = useNoteWizardTheme();
  const isDisabled = useMemo(() => !selected, [selected]);
  const { width } = useWindowDimensions();
  const params = useSearchParams();
  const [sendVerificationCode, { isLoading }] =
    useSendVerificationCodeMutation();

  useEffect(() => {
    const numbersArray: number[] = [];

    for (let i = 0; i < 4; i++) {
      var randomNum;
      do {
        randomNum = Math.ceil(Math.random() * 100);
      } while (numbers.includes(randomNum));

      numbersArray.push(randomNum);
    }

    setNumbers(numbersArray);

    const phone = params.phone;

    if (phone && typeof phone === "string") {
      const randomIndex = Math.floor(Math.random() * numbersArray.length);
      const randomNumber = numbersArray[randomIndex];
      setCorrectNumber(randomNumber);
      sendVerificationCode({ phone, verificationCode: randomNumber });
    }
  }, []);

  const onPress = useCallback(() => {
    const phone = params.phone;
    if (selected === correctNumber && phone && typeof phone === "string") {
      navigate(constants.screens.newPassword, {
        phone: countryCode + phone,
      });
    } else {
      setShowError(true);
    }
  }, [setShowError, params, countryCode, selected, correctNumber]);

  const renderNumbers = useMemo(() => {
    return (
      <HStack justifyContent="space-between">
        {numbers.map((number) => {
          const isSelected = selected === number;
          return (
            <Pressable
              key={number}
              borderColor={isSelected ? light.purple : light.gray}
              borderWidth={1}
              borderRadius={30}
              width={width * 0.15}
              height={width * 0.15}
              justifyContent="center"
              onPress={() => setSelected(number)}
            >
              <Text
                color={isSelected ? light.purple : light.gray}
                textAlign="center"
              >
                {number}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    );
  }, [numbers, selected]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View ml={9} mr={9} mt={10}>
      <Stack space={5}>
        <Text
          fontWeight={500}
          textAlign="center"
          fontSize={18}
          color={light.font}
        >
          Select verification code
        </Text>

        {renderNumbers}

        <Button text="Verify" isDisabled={isDisabled} onPress={onPress} />
      </Stack>

      {showError && (
        <Center position="absolute" top={0} w="100%">
          <Alert w="80%" status="error">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Selected incorrect number
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
    </View>
  );
};

export default withCountryPicker(Verification);
