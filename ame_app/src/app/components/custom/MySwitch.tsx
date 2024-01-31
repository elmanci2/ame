import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useState, useEffect, memo} from 'react';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import {colors} from '../../../constants/Constants';

interface Props {
  activeColor?: string;
  inActiveColor?: string;
  value: boolean;
  onValueChange: (e: boolean) => void;
}

const MySwitch = ({
  activeColor = colors.tertiary,
  inActiveColor = 'grey',
  value = false,
  onValueChange,
}: Props) => {
  const switchTranslate = useSharedValue(value ? 22 : 4);
  const [active, setActive] = useState(value);

  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0);
  });

  useEffect(() => {
    switchTranslate.value = withTiming(active ? 22 : 4);
  }, [active, switchTranslate]);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 14,
            stiffness: 200,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [inActiveColor, activeColor],
    );
    return {
      backgroundColor,
    };
  });

  const toggleSwitch = () => {
    setActive(!active);
  };

  const onSwitchValueChange = () => {
    if (onValueChange) {
      onValueChange(!active);
    }
    toggleSwitch();
  };

  return (
    <TouchableWithoutFeedback onPress={onSwitchValueChange}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default memo(MySwitch);

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#F2F5F7',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
