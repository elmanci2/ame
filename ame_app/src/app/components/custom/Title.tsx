import React, {memo} from 'react';
import {MyText, MyTextProps} from './MyText';
import {colors} from '../../../constants/Constants';
import {TextStyle} from 'react-native';

interface Props {
  title: string;
  styles?: TextStyle;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  color?: string;
  myTextProps?: MyTextProps | {};
}

export const Title = memo(
  ({
    title,
    styles,
    textAlign = 'center',
    color = colors.tertiary,
    myTextProps = {fontSize: 25},
  }: Props) => {
    return (
      <MyText
        {...myTextProps}
        style={styles}
        color={color}
        textAlign={textAlign}
        fontWeight="600">
        {title}
      </MyText>
    );
  },
);
