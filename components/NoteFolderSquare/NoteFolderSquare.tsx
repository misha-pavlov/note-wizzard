import { Text, Pressable, VStack, IconButton, HStack } from "native-base";
import { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { NoteFolderComponentPropsTypes } from "../../dataTypes/note.types";
import { useNoteWizardTheme } from "../../hooks";
import { noteWizardDateFormat } from "../../helpers/date-helpers";
import { hexToRgba } from "../../helpers/color-helpers";
import { constants } from "../../config/constants";
import { getFolderTypeIcon } from "../../helpers/folder-helpers";

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

  const getIcon = () => {
    if (note) {
      return <AntDesign name="question" size={24} color={currentTheme.red} />;
    }

    if (folder) {
      return getFolderTypeIcon(folder.iconType, 24, folder.color);
    }
  };

  const getSubText = () => {
    if (note) {
      return note?.content || constants.thisNoteWithoutContent;
    }

    if (folder) {
      return `${folder.noteIds.length} notes`;
    }

    return "???";
  };

  return (
    <Pressable
      onPress={onPress}
      _pressed={{ opacity: 0.5 }}
      backgroundColor={currentTheme.main}
      borderRadius={20}
      mb={4}
      p={4}
      // 32 - container padding, 8 - space
      w={(width - 32 - 8) / 2}
    >
      <VStack space={4}>
        <HStack space={4}>
          <IconButton
            icon={getIcon()}
            backgroundColor={hexToRgba(
              folder ? folder.color : currentTheme.red,
              0.2
            )}
            size="xs"
          />

          <VStack>
            <Text fontWeight={700}>{note ? note.name : folder?.title}</Text>
            {note && (
              <Text color={currentTheme.gray} fontSize={11}>
                {noteWizardDateFormat(note.createdAt)}
              </Text>
            )}
          </VStack>
        </HStack>

        <RenderHtml
          contentWidth={100}
          baseStyle={{
            color: currentTheme.font,
            fontSize: 13,
            maxHeight: 100,
            overflow: "hidden",
          }}
          source={{ html: getSubText() }}
        />
      </VStack>
    </Pressable>
  );
};

export default NoteFolderSquare;
