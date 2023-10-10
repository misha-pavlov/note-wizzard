import { Text, Pressable, VStack, IconButton, HStack } from "native-base";
import { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { NoteFolderComponentPropsTypes } from "../../dataTypes/note.types";
import { useNoteWizardTheme } from "../../hooks";
import { noteWizardDateFormat } from "../../helpers/date-helpers";
import { hexToRgba } from "../../helpers/color-helpers";

const NoteFolderSquare: FC<NoteFolderComponentPropsTypes> = ({
  onPress,
  note,
  folder,
}) => {
  const { currentTheme } = useNoteWizardTheme();
  const { width } = useWindowDimensions();

  if (!note && !folder) {
    return null;
  }

  const hasNoteFolderContent = note ? note?.content : folder.name;

  return (
    <Pressable
      onPress={onPress}
      _pressed={{ opacity: 0.5 }}
      backgroundColor={currentTheme.main}
      borderRadius={20}
      mb={4}
      p={4}
      w={(width - 32 - 16) / 2}
    >
      <VStack space={4}>
        <HStack justifyContent="space-between">
          <IconButton
            icon={
              <AntDesign
                name="question"
                size={24}
                color={currentTheme.purple}
              />
            }
            backgroundColor={hexToRgba(currentTheme.purple, 0.2)}
            size="xs"
          />

          <VStack>
            <Text fontWeight={700}>{note ? note.name : folder.name}</Text>
            {note && (
              <Text color={currentTheme.gray} fontSize={11}>
                {noteWizardDateFormat(note.createdAt)}
              </Text>
            )}
          </VStack>
        </HStack>

        <HStack>
          <Text fontSize={13}>
            {hasNoteFolderContent || "This note without content"}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default NoteFolderSquare;
