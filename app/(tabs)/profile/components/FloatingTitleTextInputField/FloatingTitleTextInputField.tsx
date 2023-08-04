import { HStack, Pressable, View } from "native-base";
import { FC, useRef, useState } from "react";
import { Animated, Easing, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNoteWizardTheme } from "../../../../../hooks";

type FloatingTitleTextInputFieldPropsType = {
  title: string;
  value: string;
  attrName: string;
  titleActiveColor: string;
  titleInactiveColor: string;

  titleActiveSize: number;
  titleInActiveSize: number;

  updateMasterState: (attrName: string, newValue: string) => void;

  isPassword?: boolean;

  onFocus?: () => void;
};

const FloatingTitleTextInputField: FC<FloatingTitleTextInputFieldPropsType> = ({
  title,
  value,
  onFocus,
  attrName,
  isPassword,
  titleActiveSize,
  titleActiveColor,
  titleInActiveSize,
  updateMasterState,
  titleInactiveColor,
}) => {
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const position = new Animated.Value(isFieldActive ? 1 : 0);
  const { currentTheme } = useNoteWizardTheme();
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
      // FIXME: BLIKING FOCUS
      if (onFocus) {
        onFocus();

        if (textInputRef.current) {
          textInputRef.current.blur();
        }
      } else {
        Animated.timing(position, {
          toValue: 1,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();

        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }
    }
  };

  const handleBlur = () => {
    if (isFieldActive && !value) {
      setIsFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const onChangeText = (updatedValue: string) =>
    updateMasterState(attrName, updatedValue);

  const returnAnimatedTitleStyles = () => {
    const translateY = position.interpolate({
      inputRange: [0, 1],
      outputRange: [12, -12],
    });

    const isActive = isFieldActive && !onFocus;

    return {
      transform: [{ translateY }],
      fontSize: isActive ? titleActiveSize : titleInActiveSize,
      color: isActive ? titleActiveColor : titleInactiveColor,
      ...(isActive && {
        backgroundColor: currentTheme.background,
        // just for fix type
        alignSelf: "flex-start" as "flex-start",
        padding: 5,
      }),
    };
  };

  const styles = StyleSheet.create({
    textInput: {
      color: currentTheme.font,
    },
  });

  return (
    <Pressable onPress={handleFocus}>
      <View
        width="100%"
        borderRadius={10}
        height={45}
        p={2}
        pb={4}
        borderWidth={1}
        borderColor={currentTheme.font}
        justifyContent="center"
      >
        <Animated.Text style={[returnAnimatedTitleStyles()]}>
          {title}
        </Animated.Text>

        <HStack alignItems="center" justifyContent="space-between">
          <TextInput
            style={styles.textInput}
            ref={textInputRef}
            value={value}
            underlineColorAndroid="transparent"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !showPassword}
          />

          {isFieldActive && isPassword && (
            <Pressable
              onPress={() => setShowPassword((prevProps) => !prevProps)}
              pr={2}
            >
              {showPassword ? (
                <Feather name="eye-off" size={20} color={currentTheme.font} />
              ) : (
                <Feather name="eye" size={20} color={currentTheme.font} />
              )}
            </Pressable>
          )}
        </HStack>
      </View>
    </Pressable>
  );
};

export default FloatingTitleTextInputField;
