import { HStack, Text, View } from "native-base";
import { FC, useCallback } from "react";
import { useNoteWizardTheme } from "../../../../../hooks";
import { NoteWizardSpinner } from "../../../../../components";

type StatisticPropsTypes = {
  isLoading: boolean;
  allNotesCount?: number;
  remindersCount?: number;
  importantCount?: number;
};

const Statistic: FC<StatisticPropsTypes> = ({
  isLoading,
  allNotesCount,
  remindersCount,
  importantCount,
}) => {
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
    [currentTheme]
  );

  if (isLoading) {
    return <NoteWizardSpinner />;
  }

  return (
    <HStack justifyContent="space-between" alignItems="center">
      {renderItem(allNotesCount || 0, "All notes")}
      {renderItem(remindersCount || 0, "Reminders")}
      {renderItem(importantCount || 0, "Important")}
    </HStack>
  );
};

export default Statistic;
