import React, {useState, FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../constants/Constants';

interface StepperProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onValueChange?: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const iconSize = 24;
const iconColor = colors.white;

export const Stepper: FC<StepperProps> = ({
  initialValue = 1,
  minValue = 1,
  maxValue = 999,
  onValueChange,
  containerStyle,
}) => {
  const [counter, setCounter] = useState(initialValue);

  const incrementCounter = () => {
    if (counter < maxValue) {
      setCounter(prev => prev + 1);
      onValueChange && onValueChange(counter + 1);
    }
  };

  const decrementCounter = () => {
    if (counter > minValue) {
      setCounter(prev => prev - 1);
      onValueChange && onValueChange(counter - 1);
    }
  };

  const resetCounter = () => {
    setCounter(initialValue);
    onValueChange && onValueChange(initialValue);
  };

  const setCounterValue = (value: number) => {
    if (value >= minValue && value <= maxValue) {
      setCounter(value);
      onValueChange && onValueChange(value);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={decrementCounter}>
        <Entypo name="minus" size={iconSize} color={iconColor} />
      </TouchableOpacity>
      <View style={styles.counter}>
        <Text style={[styles.text]}>{counter}</Text>
      </View>
      <TouchableOpacity onPress={incrementCounter}>
        <Entypo name="plus" size={iconSize} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={resetCounter}>
        <Text style={styles.resetButton}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCounterValue(5)}>
        <Text style={styles.setButton}>Set to 5</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.secundario,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },

  counter: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
    color: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.texto_bold,
    fontWeight: '700',
  },
  resetButton: {
    color: 'red',
    marginLeft: 10,
  },
  setButton: {
    color: 'green',
    marginLeft: 10,
  },
});
