import React, { useState, ReactNode, FC } from "react";
import { Animated, Easing } from "react-native";
import { View, Text, Pressable, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNoteWizardTheme } from "../../hooks";

interface AnimatedDropdownProps {
  children: ReactNode;
  headerText: string;
  showIcon?: boolean;
  disabled?: boolean;
}

const AnimatedDropdown: FC<AnimatedDropdownProps> = ({
  children,
  headerText,
  showIcon = true,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useNoteWizardTheme();
  const translateY = new Animated.Value(0);

  const toggleDropdown = () => {
    Animated.timing(translateY, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  return (
    <View>
      <Pressable
        _pressed={{ opacity: 0.5 }}
        _disabled={{ opacity: 0.5 }}
        onPress={toggleDropdown}
        disabled={disabled}
      >
        <HStack
          alignItems="center"
          justifyContent="space-between"
          borderWidth={1}
          borderColor={currentTheme.font}
          borderRadius={8}
          px={2}
          py={1}
        >
          <Text fontSize={16}>{headerText}</Text>
          {showIcon && (
            <AntDesign
              name={isOpen ? "up" : "down"}
              size={16}
              color={currentTheme.font}
            />
          )}
        </HStack>
      </Pressable>

      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -200],
                }),
              },
            ],
          },
        ]}
      >
        {isOpen && (
          <View
            py={4}
            borderBottomWidth={1}
            borderBottomColor={currentTheme.font}
          >
            {children}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default AnimatedDropdown;
