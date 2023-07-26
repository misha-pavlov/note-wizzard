import { Pressable, View } from "native-base";
import { FC, useRef, useState } from "react";
import { Animated, Easing, TextInput } from "react-native";
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
};

const FloatingTitleTextInputField: FC<FloatingTitleTextInputFieldPropsType> = ({
  title,
  value,
  attrName,
  titleActiveSize,
  titleActiveColor,
  titleInActiveSize,
  updateMasterState,
  titleInactiveColor,
}) => {
  const [isFieldActive, setIsFieldActive] = useState(false);
  const position = new Animated.Value(isFieldActive ? 1 : 0);
  const { currentTheme } = useNoteWizardTheme();
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
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
      outputRange: [12, -10],
    });

    return {
      transform: [{ translateY }],
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
      ...(isFieldActive && {
        backgroundColor: currentTheme.background,
        // just for fix type
        alignSelf: "flex-start" as "flex-start",
        padding: 5,
      }),
    };
  };

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
        <TextInput
          ref={textInputRef}
          value={value}
          underlineColorAndroid="transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
        />
      </View>
    </Pressable>
  );
};

export default FloatingTitleTextInputField;
