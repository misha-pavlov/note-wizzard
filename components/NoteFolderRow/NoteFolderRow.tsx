import { Text, Pressable, VStack, IconButton, HStack } from "native-base";
import { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { NoteFolderComponentPropsTypes } from "../../dataTypes/note.types";
import { useNoteWizardTheme } from "../../hooks";
import { noteWizardDateFormat } from "../../helpers/date-helpers";
import { hexToRgba } from "../../helpers/color-helpers";
import { constants } from "../../config/constants";

const NoteFolderRow: FC<NoteFolderComponentPropsTypes> = ({
  onPress,
  note,
  folder,
  withoutDate,
  selected,
}) => {
  const { currentTheme } = useNoteWizardTheme();

  if (!note && !folder) {
    return null;
  }

  const hasNoteFolderContent = note ? note?.content : folder?.title;

  return (
    <Pressable
      onPress={onPress}
      _pressed={{ opacity: 0.5 }}
      backgroundColor={currentTheme.main}
      borderRadius={20}
      mb={4}
      p={4}
      {...(selected && { borderColor: currentTheme.purple, borderWidth: 1 })}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space={4} alignItems="center">
          <IconButton
            icon={
              <AntDesign name="question" size={24} color={currentTheme.red} />
            }
            backgroundColor={hexToRgba(currentTheme.red, 0.2)}
            size="xs"
          />

          <VStack>
            <Text fontWeight={700}>{note ? note.name : folder?.title}</Text>
            <Text fontSize={13}>
              {hasNoteFolderContent || constants.thisNoteWithoutContent}
            </Text>
          </VStack>
        </HStack>

        {!withoutDate && (
          <VStack alignSelf={note ? "flex-start" : "center"}>
            {note && (
              <Text color={currentTheme.gray} fontSize={11}>
                {noteWizardDateFormat(note.createdAt)}
              </Text>
            )}
          </VStack>
        )}
      </HStack>
    </Pressable>
  );
};

export default NoteFolderRow;
