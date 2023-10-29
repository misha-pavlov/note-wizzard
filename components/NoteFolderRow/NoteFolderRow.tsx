import { Text, Pressable, VStack, IconButton, HStack } from "native-base";
import { FC, memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { NoteFolderComponentPropsTypes } from "../../dataTypes/note.types";
import { useNoteWizardTheme } from "../../hooks";
import { noteWizardDateFormat } from "../../helpers/date-helpers";
import { hexToRgba } from "../../helpers/color-helpers";
import { constants } from "../../config/constants";
import { getFolderTypeIcon } from "../../helpers/folder-helpers";
import { useGetIconTypeByFolderIdQuery } from "../../store/folderApi/folder.api";

const NoteFolderRow: FC<NoteFolderComponentPropsTypes> = ({
  onPress,
  note,
  folder,
  withoutDate,
  selected,
}) => {
  const { currentTheme } = useNoteWizardTheme();
  const { data: noteIconTypeData } = useGetIconTypeByFolderIdQuery(
    { folderId: note?.folderId },
    { skip: !note?.folderId || !note }
  );

  if (!note && !folder) {
    return null;
  }

  const getIcon = () => {
    if (note) {
      return noteIconTypeData ? (
        getFolderTypeIcon(noteIconTypeData.iconType, 20, noteIconTypeData.color)
      ) : (
        <AntDesign name="question" size={24} color={currentTheme.red} />
      );
    }

    if (folder) {
      return getFolderTypeIcon(folder.iconType, 20, folder.color);
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

  const getIconBackgroundColor = () => {
    if (note) {
      return noteIconTypeData ? noteIconTypeData.color : currentTheme.red;
    }

    if (folder) {
      return folder.color;
    }

    return currentTheme.red;
  };

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
            icon={getIcon()}
            backgroundColor={hexToRgba(getIconBackgroundColor(), 0.2)}
            size="xs"
            w={36}
            h={36}
          />

          <VStack>
            <Text fontWeight={700}>{note ? note.name : folder?.title}</Text>
            <Text fontSize={13}>{getSubText()}</Text>
          </VStack>
        </HStack>

        {!withoutDate && (
          <VStack alignSelf={note ? "flex-start" : "center"}>
            {note ? (
              <Text color={currentTheme.gray} fontSize={11}>
                {noteWizardDateFormat(note.createdAt)}
              </Text>
            ) : (
              <AntDesign name="right" size={24} color={currentTheme.font} />
            )}
          </VStack>
        )}
      </HStack>
    </Pressable>
  );
};

export default memo(NoteFolderRow);
