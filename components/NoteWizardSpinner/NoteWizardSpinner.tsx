import { ActivityIndicator } from "react-native";
import { useNoteWizardTheme } from "../../hooks";

const NoteWizardSpinner = () => {
  const { currentTheme } = useNoteWizardTheme();
  return <ActivityIndicator color={currentTheme.purple} />;
};

export default NoteWizardSpinner;
