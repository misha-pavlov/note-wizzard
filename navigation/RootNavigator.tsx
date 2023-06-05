import {
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  View,
} from "native-base";
import { useNoteWizardTheme } from "../hooks";

// TODO: REMOVE BECAUSE THIS USE ONLY FOR SHOWING HOW TO WORK WITH THEME
const RootNavigator = () => {
  const colors = useNoteWizardTheme();
  const bg = useColorModeValue(colors.light.main, colors.dark.main);
  const variant = useColorModeValue("solid", "outline");
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button bg={bg} variant={variant} mt={50} onPress={toggleColorMode}>
        Sample
      </Button>

      <View mt={150} bg={colors.light.purple}>
        <Text>Regular</Text>
        <Text fontWeight={500}>Medium</Text>
        <Text fontWeight={700}>Bold</Text>
      </View>
    </>
  );
};

export default RootNavigator;
