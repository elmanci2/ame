import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import OptionGroupBox from 'react-native-optiongroup';
import {
  DEFAULT_MODES,
  MODE_MAPPING,
  DRIVING,
} from '../../constants/TravelModes';
import {NavigationIconsFont} from '../../constants/NavigationIcons';

interface TravelModeBoxProps {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  contentPadding?: number;
  inverseTextColor?: string;
  modes?: string[];
  selected?: any;
  defaultValue?: any;
  style?: any;
  onChange?: (value: any) => void;
  theme?: string;
  invertKeyLabel?: boolean;
  fontFamily?: string;
  fontSize?: number;
  useIcons?: boolean;
}

const TravelModeBox: React.FC<TravelModeBoxProps> = ({
  backgroundColor = 'transparent',
  borderColor = '#FFFFFF',
  borderWidth = 1,
  borderRadius = 3,
  contentPadding = 10,
  inverseTextColor = '#FFFFFF',
  defaultValue = DRIVING,
  selected,
  style = {},
  onChange,
  theme,
  invertKeyLabel = false,
  fontSize = 25,
  fontFamily,
  useIcons = true,
  modes = DEFAULT_MODES,
}) => {
  const options = modes
    .filter(mode => MODE_MAPPING[mode])
    .map(mode => MODE_MAPPING[mode]);

  return (
    <OptionGroupBox
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      contentPadding={contentPadding}
      inverseTextColor={inverseTextColor}
      defaultValue={defaultValue}
      selected={selected}
      style={style}
      onChange={onChange}
      theme={theme}
      invertKeyLabel={invertKeyLabel}
      fontFamily={useIcons ? NavigationIconsFont.fontFamily : fontFamily}
      fontSize={fontSize}
      useIcons={useIcons}
      options={options}
      useKeyValue={'mode'}
      useLabelValue={'icon'}
    />
  );
};

TravelModeBox.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  contentPadding: PropTypes.number,
  inverseTextColor: PropTypes.string,
  modes: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.any,
  defaultValue: PropTypes.any,
  style: PropTypes.any,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  invertKeyLabel: PropTypes.bool,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  useIcons: PropTypes.bool,
};

export default TravelModeBox;
