import {View, StyleSheet, Text} from 'react-native';
import React, {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
//@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {colors, dimensions} from '../../../constants/Constants';
const Toast = forwardRef(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastText, setToastText] = useState('');
  const [message, setMessage] = useState('');
  const [toastDuration, setToastDuration] = useState(5000);
  // If you're not using react-native-bars, please use the one below by uncommenting it
  const TOP_VALUE = 60;
  // const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;

  const width = useSharedValue(0); // Ancho inicial

  const startAnimation = () => {
    width.value = withTiming(dimensions.width - 50, {duration: toastDuration});
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    //@ts-ignore
    [show],
  );

  useEffect(() => {
    if (!showing) {
      width.value = 0;
    }
  }, [showing]);

  const show = useCallback<any>(
    ({
      type,
      text,
      duration,
      message,
    }: {
      type: 'success' | 'warning' | 'error';
      text: string;
      duration: number;
      message: string;
    }) => {
      startAnimation();
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setMessage(message);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          duration,
          //@ts-ignore
          withTiming(-100, null, finish => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          }),
        ),
      );
    },
    [TOP_VALUE, toastTopAnimation],
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      width.value = 0;
      context.value = toastTopAnimation.value;
    })
    .onUpdate(event => {
      if (event.translationY < 100) {
        width.value = 0;
        toastTopAnimation.value = withSpring(
          context.value + event.translationY,
          {
            damping: 600,
            stiffness: 100,
          },
        );
      }
    })
    .onEnd(event => {
      if (event.translationY < 0) {
        width.value = 0;
        //@ts-ignore
        toastTopAnimation.value = withTiming(-100, null, finish => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        width.value = 0;
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            //@ts-ignore
            withTiming(-100, null, finish => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            }),
          ),
        );
      }
    });

  return (
    <>
      {showing && (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.toastContainer,
              toastType === 'success'
                ? styles.successToastContainer
                : toastType === 'warning'
                ? styles.warningToastContainer
                : styles.errorToastContainer,
              animatedTopStyles,
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {toastType === 'success' ? (
                <MaterialIcons
                  name="check-circle-outline"
                  size={25}
                  color={'#1f8722'}
                />
              ) : toastType === 'warning' ? (
                <Ionicons name="warning" size={25} color="#f08135" />
              ) : (
                <MaterialIcons
                  name="error"
                  size={25}
                  color={colors.secundario}
                />
              )}

              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.toastText,
                    toastType === 'success'
                      ? styles.successToastText
                      : toastType === 'warning'
                      ? styles.warningToastText
                      : styles.errorToastText,
                  ]}>
                  {toastText}
                </Text>
                <Text style={styles.message}>{message}</Text>
              </View>
            </View>

            <Animated.View
              style={[
                styles.box,
                {
                  backgroundColor:
                    toastType === 'success'
                      ? '#1f8722'
                      : toastType === 'warning'
                      ? '#f08135'
                      : colors.secundario,
                },
                animatedStyle,
              ]}
            />
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
});

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    width: '90%',
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
    elevation: 4,
  },
  toastText: {
    fontSize: 16,
  },

  message: {
    color: colors.icon,
    fontSize: 16,
  },
  toastIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  successToastContainer: {
    borderColor: '#1f8722',
    shadowColor: '#1f8722',
  },
  warningToastContainer: {
    borderColor: '#f08135',
    shadowColor: '#f08135',
  },
  errorToastContainer: {
    borderColor: '#d9100a',
    shadowColor: '#d9100a',
  },
  successToastText: {
    color: '#1f8722',
  },
  warningToastText: {
    color: '#f08135',
  },
  errorToastText: {
    color: '#e8433d',
  },

  textContainer: {
    justifyContent: 'flex-start',
  },

  box: {
    height: 3,
    width: 20,
  },
});
