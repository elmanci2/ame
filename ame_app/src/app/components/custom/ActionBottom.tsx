import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../../../constants/Constants';

interface Props {
  containerStyles?: ViewStyle | ViewStyle[];
  textStyles?: TextStyle;
  icon?: JSX.Element;
  text: string;
  action: () => void;
  noStyles?: boolean;
  noStylesText?: boolean;
}

const ActionBottom = memo(
  ({
    action,
    containerStyles,
    icon,
    text,
    textStyles,
    noStylesText = false,
    noStyles = false,
  }: Props) => {
    return (
      <TouchableOpacity
        style={[containerStyles, !noStyles && styles.bottom]}
        onPress={() => action && action()}>
        {icon && icon}
        <Text style={[textStyles, !noStylesText && styles.text]}>{text}</Text>
      </TouchableOpacity>
    );
  },
);

export default ActionBottom;

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    padding: 7,
    flexDirection: 'row',
    gap: 6,
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.white,
  },
});
