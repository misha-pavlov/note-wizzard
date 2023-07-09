import { useNavigation, useRouter, useSearchParams } from "expo-router";
import { View, Text, Pressable, useColorMode } from "native-base";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNoteWizardTheme } from "../../../hooks";

const Note = () => {
  const router = useRouter();
  const params = useSearchParams();
  const navigation = useNavigation();
  const { colorMode } = useColorMode();
  const { dark, light } = useNoteWizardTheme();

  useEffect(() => {
    navigation.setOptions({
      ...(params.note && { title: `${params.note}` }),
      headerRight: () => (
        <Pressable _pressed={{ opacity: 0.5 }}>
          <Feather
            name="more-vertical"
            size={24}
            color={colorMode === "dark" ? light.main : dark.main}
          />
        </Pressable>
      ),
    });
  }, []);

  return (
    <View>
      <Text onPress={router.back}>BAck</Text>
    </View>
  );
};

export default Note;
