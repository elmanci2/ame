import {useCallback, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimatedDrawer = (state: string) => {
  const animatedProgress = useRef(new Animated.Value(0));

  const isClosed = state === 'closed';

  useEffect(() => {
    const animation = Animated.spring(animatedProgress.current, {
      toValue: isClosed ? 0 : 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => {
      animation.stop();
    };
  }, [isClosed, animatedProgress]);

  const getAnimatedStyle = useCallback(() => {
    const scale = animatedProgress.current.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });

    const translateY = animatedProgress.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 25],
    });

    const rotate = animatedProgress.current.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '7deg'],
    });

    const borderRadius = animatedProgress.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 26],
    });

    const animatedStyle = {
      borderRadius,
      transform: [{scale}, {rotateZ: rotate}, {translateY}],
    };

    return animatedStyle;
  }, [animatedProgress]);

  return getAnimatedStyle();
};
