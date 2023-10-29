import {
  Button as NativeBaseButton,
  useColorModeValue,
  Text,
} from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { ISizes } from "native-base/lib/typescript/theme/base/sizes";
import { FC } from "react";
import { useNoteWizardTheme } from "../../hooks";

type ButtonProps = {
  text: string;
  onPress: VoidFunction;

  borderRadius?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  useTextTag?: boolean;
  isRedButton?: boolean;
  size?: ResponsiveValue<ISizes | (string & {}) | number>;
};

const Button: FC<ButtonProps> = ({
  text,
  onPress,
  size = "md",
  isLoading,
  isDisabled,
  useTextTag,
  isRedButton,
  borderRadius,
}) => {
  const colors = useNoteWizardTheme();
  const bg = useColorModeValue(
    isRedButton ? colors.light.red : colors.light.purple,
    isRedButton ? colors.dark.red : colors.dark.purple
  );

  return (
    <NativeBaseButton
      onPress={onPress}
      size={size}
      isLoading={isLoading}
      isDisabled={isDisabled}
      bg={bg}
      borderRadius={borderRadius || 50}
      _pressed={{
        opacity: 0.5,
        bg,
      }}
    >
      {useTextTag ? <Text color={colors.currentTheme.main}>{text}</Text> : text}
    </NativeBaseButton>
  );
};

export default Button;
