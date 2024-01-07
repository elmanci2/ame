import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {ImagePiker} from '../../components/custom/ImagePiker';
import {MyText} from '../../components/custom/MyText';
import {View} from 'moti';
import {colors} from '../../../constants/Constants';
import DropDownPicker from 'react-native-dropdown-picker';

const MedicationCollection = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <CustomScreen>
      <View style={styles.container}>
        <MyText fontSize={17} fontWeight="600" color={colors.texto_ling}>
          Adjuntar formula médica
        </MyText>
        <ImagePiker onChangeImage={uri => console.log(uri)} />
        <MyText
          fontSize={17}
          fontWeight="600"
          color={colors.texto_ling}
          {...{
            style: {
              marginTop: 20,
            },
          }}>
          eps
        </MyText>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
    </CustomScreen>
  );
};

export default MedicationCollection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
