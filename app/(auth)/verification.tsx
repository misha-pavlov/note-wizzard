import { Pressable, Stack, Text, HStack, View } from "native-base";
import { useWindowDimensions } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useNoteWizardTheme } from "../../hooks";
import { Button } from "../../components";
import { constants } from "../../config/constants";

const Verification = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const { light } = useNoteWizardTheme();
  const isDisabled = useMemo(() => !selected, [selected]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const numbers: number[] = [];

    for (let i = 0; i < 4; i++) {
      var randomNum;
      do {
        randomNum = Math.ceil(Math.random() * 100);
      } while (numbers.includes(randomNum));

      numbers.push(randomNum);
    }

    setNumbers(numbers);
  }, []);

  const renderNumbers = useMemo(() => {
    return (
      <HStack justifyContent="space-between">
        {numbers.map((number) => {
          const isSelected = selected === number;
          return (
            <Pressable
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

  return (
    <View ml={9} mr={9} mt={10}>
      <Stack space={5}>
        <Text fontWeight={500} textAlign="center" fontSize={18}>
          Select verification code
        </Text>

        {renderNumbers}

        <Button
          text="Verify"
          isDisabled={isDisabled}
          onPress={() => router.replace(constants.routes.newPassword)}
        />
      </Stack>
    </View>
  );
};

export default Verification;
