import { Text, Pressable, VStack, IconButton, HStack } from "native-base";
import { FC, memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
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
  onLongPress
}) => {
  const { width } = useWindowDimensions();
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
      onLongPress={onLongPress}
      {...(selected && { borderColor: currentTheme.purple, borderWidth: 1 })}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
      >
        <HStack space={4} alignItems="center">
          <IconButton
            icon={getIcon()}
            backgroundColor={hexToRgba(getIconBackgroundColor(), 0.2)}
            size="xs"
            w={36}
            h={36}
          />
          {/* 116 - all required spaces */}
          <VStack space={1} {...(note && { w: width - 116 })}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight={700}>{note ? note.name : folder?.title}</Text>
              {note && (
                <Text color={currentTheme.gray} fontSize={11}>
                  {noteWizardDateFormat(note.createdAt)}
                </Text>
              )}
            </HStack>
            <RenderHtml
              contentWidth={100}
              baseStyle={{
                color: currentTheme.font,
                fontSize: 13,
                maxHeight: 15,
                overflow: "hidden",
              }}
              source={{ html: getSubText() }}
            />
          </VStack>
        </HStack>

        {!withoutDate && folder && (
          <VStack alignSelf={note ? "flex-start" : "center"}>
            <AntDesign name="right" size={24} color={currentTheme.font} />
          </VStack>
        )}
      </HStack>
    </Pressable>
  );
};

export default memo(NoteFolderRow);
