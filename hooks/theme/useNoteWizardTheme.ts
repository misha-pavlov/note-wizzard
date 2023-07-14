import { useColorMode, useTheme } from "native-base";
import { constants } from "../../config/constants";

type BaseColorsType = {
  main: string;
  purple: string;
  purple2: string;
  second: string;
  gray: string;
  white: string;
  red: string;
};

type NoteWizardColors = {
  noteWizard: {
    light: BaseColorsType;
    dark: BaseColorsType;
  };
};

const useNoteWizardTheme = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  // use unknown here because we need to rewrite primary type
  const noteWizardColors = colors as unknown as NoteWizardColors;
  return {
    ...noteWizardColors.noteWizard,
    currentTheme:
      noteWizardColors.noteWizard[colorMode || constants.theme.light],
  };
};

export default useNoteWizardTheme;
