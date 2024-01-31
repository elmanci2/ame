import {useRef, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';

export const useAnimationRelaxView = (animationController: any) => {
  const relaxRef = useRef<Text | null>(null);
  const window = useWindowDimensions();

  const relaxAnimation = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.8],
      outputRange: [-(26 * 2), 0, 0],
    });
  }, [animationController.current]);

  const textAnim = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8],
      outputRange: [0, 0, -window.width * 2, 0, 0],
    });
  }, [animationController.current, window.width]);

  const imageAnim = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8],
      outputRange: [0, 0, -350 * 4, 0, 0],
    });
  }, [animationController.current]);

  const slideAnim = useMemo(() => {
    return animationController.current.interpolate({
      inputRange: [0, 0.2, 0.4, 0.8],
      outputRange: [0, 0, -window.width, -window.width],
    });
  }, [animationController.current, window.width]);

  const animationREsult = useMemo(() => {
    return {relaxRef, relaxAnimation, textAnim, imageAnim, slideAnim};
  }, []);

  return animationREsult;
};
