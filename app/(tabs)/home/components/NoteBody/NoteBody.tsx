import { useColorMode } from "native-base";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useRef } from "react";
import { ActivityIndicator } from "react-native";
import { useNoteWizardTheme } from "../../../../../hooks";

const NoteBody = () => {
  const { currentTheme, dark, light } = useNoteWizardTheme();
  const { colorMode } = useColorMode();
  const richText = useRef<RichEditor>(null);

  return (
    <>
      <RichToolbar
        editor={richText}
        actions={[
          actions.keyboard,
          actions.undo,
          actions.redo,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.checkboxList,
          actions.insertLink,
          actions.removeFormat,
        ]}
      />
      <RichEditor
        ref={richText}
        initialContentHTML="Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>"
        editorStyle={{
          backgroundColor: currentTheme.background,
          color: colorMode === "dark" ? light.main : dark.main,
        }}
        onChange={(text) => {
          console.log("text:", text);
        }}
        placeholder="Your note here"
        renderLoading={() => <ActivityIndicator />}
      />
    </>
  );
};

export default NoteBody;
