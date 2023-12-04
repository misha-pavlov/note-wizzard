import { View, Pressable } from "native-base";
import { FC } from "react";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Animated } from "react-native";

type SwipeableBlockPropsType = {
  callback: VoidFunction;
  children: JSX.Element;
  rectElement: JSX.Element;
};

const SwipeableBlock: FC<SwipeableBlockPropsType> = ({
  callback,
  children,
  rectElement,
}) => {
  const renderRightAction = (
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Pressable _pressed={{ opacity: 0.5 }} onPress={callback}>
          <RectButton>{rectElement}</RectButton>
        </Pressable>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => <View>{renderRightAction(64, progress)}</View>;

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View>{children}</View>
    </Swipeable>
  );
};

export default SwipeableBlock;
