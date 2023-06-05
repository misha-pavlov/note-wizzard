import { Button, useColorMode, useColorModeValue } from "native-base";
import { useNoteWizardTheme } from "../hooks";

const RootNavigator = () => {
  const colors = useNoteWizardTheme();
  const bg = useColorModeValue(colors.light.main, colors.dark.main);
  const variant = useColorModeValue("solid", "outline");
  const { toggleColorMode } = useColorMode();

  return (
    <Button bg={bg} variant={variant} mt={50} onPress={toggleColorMode}>
      Sample
    </Button>
  );
};

export default RootNavigator;
