import { useTheme } from "native-base";

type BaseColorsType = {
  main: string;
  purple: string;
  purple2: string;
  second: string;
  gray: string;
};

type NoteWizardColors = {
  noteWizard: {
    light: BaseColorsType;
    dark: BaseColorsType;
  };
};

const useNoteWizardTheme = () => {
  const { colors } = useTheme();
  // use unknown here because we need to rewrite primary type
  const noteWizardColors = colors as unknown as NoteWizardColors;
  return noteWizardColors.noteWizard;
};

export default useNoteWizardTheme;
