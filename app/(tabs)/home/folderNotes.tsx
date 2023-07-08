import { useNavigation, useRouter, useSearchParams } from "expo-router";
import { View, Text } from "native-base";
import { useEffect } from "react";
import NoteList from "./components/Lists/NoteList";

const FolderNotes = () => {
  const params = useSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `${params.folderName} Notes` as string });
  }, []);

  return (
    <View>
      <NoteList hideHeader />
    </View>
  );
};

export default FolderNotes;
