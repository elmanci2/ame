import React, {memo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface StarRatingProps {
  onChange: (value: number) => void;
}

export const StarRating = memo(({onChange}: StarRatingProps) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    onChange(value);
  };

  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt: GestureResponderEvent, gestureState) => {
      const x = gestureState.moveX;
      const ratingValue = Math.ceil(x / 40);
      if (ratingValue >= 0 && ratingValue <= 5) {
        setRating(ratingValue);
        onChange(ratingValue);
      }
    },
  });

  const starColors = [1, 2, 3, 4, 5].map(index => {
    return index <= rating ? '#FFD700' : '#808080'; // Amarillo para seleccionado, gris para no seleccionado
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {[1, 2, 3, 4, 5].map(index => (
        <TouchableOpacity
          key={index}
          onPress={() => handleRating(index)}
          style={styles.star}>
          <AntDesign
            name={'star'}
            size={32}
            color={starColors[index - 1]} // El índice del array comienza desde 0, pero el índice de las estrellas comienza desde 1
          />
        </TouchableOpacity>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    margin: 5,
  },
});
