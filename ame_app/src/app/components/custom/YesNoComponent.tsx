import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../../constants/Constants';

type Props = {
  oneSleet?: (select: boolean) => void;
};

const YesNoComponent = ({oneSleet}: Props) => {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleSelect = (option: boolean) => {
    setSelectedOption(option);

    oneSleet && oneSleet(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, selectedOption && styles.selectedOption]}
          onPress={() => handleSelect(true)}>
          <Text style={styles.optionText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, !selectedOption && styles.selectedOption]}
          onPress={() => handleSelect(false)}>
          <Text style={styles.optionText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#333',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: colors.tertiary,
    borderColor: '#3498db',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default YesNoComponent;
