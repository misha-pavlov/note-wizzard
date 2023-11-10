import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { FC, useRef } from "react";
import { useNoteWizardTheme } from "../../../../../hooks";
import { NoteWizardSpinner } from "../../../../../components";

type NoteBodyPropsType = {
  content: string;
  onChange: (text: string) => void;
};

const NoteBody: FC<NoteBodyPropsType> = ({ content, onChange }) => {
  const { currentTheme } = useNoteWizardTheme();
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
        style={{ backgroundColor: currentTheme.background }}
      />
      <RichEditor
        ref={richText}
        initialContentHTML={content}
        editorStyle={{
          backgroundColor: currentTheme.background,
          color: currentTheme.font,
        }}
        onChange={onChange}
        placeholder="Your note here"
        renderLoading={() => <NoteWizardSpinner />}
      />
    </>
  );
};

export default NoteBody;
