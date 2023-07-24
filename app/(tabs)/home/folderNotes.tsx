import { useNavigation, useRouter, useSearchParams } from "expo-router";
import { View } from "native-base";
import { useEffect } from "react";
import NoteList from "./components/Lists/NoteList";
import { useNoteWizardTheme } from "../../../hooks";

const FolderNotes = () => {
  const params = useSearchParams();
  const navigation = useNavigation();
  const { currentTheme } = useNoteWizardTheme();

  useEffect(() => {
    navigation.setOptions({ title: `${params.folderName} Notes` });
  }, []);

  return (
    <View backgroundColor={currentTheme.background} flex={1}>
      <NoteList hideHeader />
    </View>
  );
};

export default FolderNotes;
