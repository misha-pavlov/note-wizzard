import { Button as NativeBaseButton, useColorModeValue } from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { ISizes } from "native-base/lib/typescript/theme/base/sizes";
import { FC } from "react";
import { useNoteWizardTheme } from "../../hooks";

type ButtonProps = {
  text: string;
  onPress: VoidFunction;

  isLoading?: boolean;
  isDisabled?: boolean;
  size?: ResponsiveValue<ISizes | (string & {}) | number>;
};

const Button: FC<ButtonProps> = ({
  text,
  onPress,
  size = "md",
  isLoading,
  isDisabled,
}) => {
  const colors = useNoteWizardTheme();
  const bg = useColorModeValue(colors.light.purple, colors.dark.purple);

  return (
    <NativeBaseButton
      onPress={onPress}
      size={size}
      isLoading={isLoading}
      isDisabled={isDisabled}
      bg={bg}
      borderRadius={50}
      _pressed={{
        opacity: 0.5,
        bg,
      }}
    >
      {text}
    </NativeBaseButton>
  );
};

export default Button;
