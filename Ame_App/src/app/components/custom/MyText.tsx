import {TextProps, Text} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {TextStyle} from 'react-native';

interface Props extends TextProps {
  fontSize?: number;
  color?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined; // Add textAlign prop
  children: ReactNode;
  style?: TextStyle | [TextStyle];
}

export const MyText = memo(
  ({
    children,
    color = 'black',
    fontWeight = 'normal',
    fontSize = 10,
    textAlign = 'left', // Default textAlign is 'left'
    style,
    ...rest
  }: Props) => {
    return (
      <Text style={[style, {color, fontWeight, fontSize, textAlign}]} {...rest}>
        {children}
      </Text>
    );
  },
);
