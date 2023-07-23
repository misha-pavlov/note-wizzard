import Animated, {
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { FC, useMemo } from "react";
import { useNoteWizardTheme } from "../../../../../hooks";

type RotateViewProps = {
  duration: number;
};

const RotateView: FC<RotateViewProps> = ({ duration }) => {
  const { currentTheme } = useNoteWizardTheme();

  const rotateAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withRepeat(
          withSequence(
            withTiming(360 + "deg", {
              duration,
              easing: Easing.linear,
            }),
            withTiming(0 + "deg", { duration, easing: Easing.linear })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  const animatedView = useMemo(
    () => (
      <Animated.View
        style={[
          {
            width: 150,
            height: 150,
            borderColor: currentTheme.purple,
            borderWidth: 2,
            position: "absolute",
          },
          rotateAnimation,
        ]}
      />
    ),
    [rotateAnimation]
  );

  return animatedView;
};

export default RotateView;
