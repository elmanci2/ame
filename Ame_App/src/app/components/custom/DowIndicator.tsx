import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo} from 'react';

interface Props {
  style?: ViewStyle;
}

export const DowIndicator = memo(({style}: Props) => {
  return (
    <View>
      <View style={[style, styles.dowIndicator]} />
    </View>
  );
});

const styles = StyleSheet.create({
  dowIndicator: {
    alignSelf: 'center',
    backgroundColor: 'rgba(80, 80, 80, 0.43)',
    width: 100,
    height: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
