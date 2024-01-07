import React, {memo} from 'react';
import {MyText} from './MyText';
import {colors} from '../../../constants/Constants';
import {TextStyle} from 'react-native';

interface Props {
  title: string;
  styles?: TextStyle;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  color?: string;
}

export const Title = memo(
  ({title, styles, textAlign = 'center', color = colors.tertiary}: Props) => {
    return (
      <MyText
        style={styles}
        color={color}
        textAlign={textAlign}
        fontWeight="600"
        fontSize={25}>
        {title}
      </MyText>
    );
  },
);
