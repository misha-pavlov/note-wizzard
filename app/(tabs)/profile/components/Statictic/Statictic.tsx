import { HStack, Text, View } from "native-base";
import { useCallback } from "react";
import { useNoteWizardTheme } from "../../../../../hooks";

const Statictic = () => {
  const { currentTheme } = useNoteWizardTheme();

  const renderItem = useCallback(
    (count: number, desc: string) => (
      <View
        backgroundColor={currentTheme.second}
        borderRadius={15}
        px={6}
        py={2}
      >
        <Text fontSize={16} textAlign="center">
          {count}
        </Text>
        <Text color={currentTheme.gray} textAlign="center" fontSize={13}>
          {desc}
        </Text>
      </View>
    ),
    []
  );

  return (
    <HStack justifyContent="space-between" alignItems="center">
      {renderItem(147, "All notes")}
      {renderItem(10, "Reminders")}
      {renderItem(26, "Important")}
    </HStack>
  );
};

export default Statictic;
