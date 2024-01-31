import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {Reminder} from '../../../../types/types';
import {MyText} from '../../../custom/MyText';
import {colors} from '../../../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {GlobalStyle} from '../../../../styles/styles';

interface Props {
  item: Reminder;
  setSelectReminder: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const text_size_2 = 13;
const text_color_2 = colors.icon;
const width = '90%';

const RenderReminder = ({item, setSelectReminder, setShowModal}: Props) => {
  const updateState = () => {
    setSelectReminder(item.id);
    setShowModal(prev => !prev);
  };

  return (
    <View style={[styles.container, {borderLeftColor: item.color}]}>
      <View style={[{gap: GlobalStyle.gap.gap + 10, width}]}>
        <View style={[{gap: GlobalStyle.gap.gap - 3}]}>
          <MyText fontSize={16} fontWeight="500">
            {item.medicamento}
          </MyText>
          <MyText fontSize={13} fontWeight="400" color={colors.icon}>
            {item.mensaje}
          </MyText>
        </View>
        <View style={[GlobalStyle.row]}>
          <View style={styles.timeItem}>
            <AntDesign name="clockcircleo" size={12} color={item.color} />
            <MyText fontSize={text_size_2} color={text_color_2}>
              {item.time}
            </MyText>
          </View>

          <View>
            <MyText fontSize={text_size_2} color={text_color_2}>
              {item.type}
            </MyText>
          </View>

          <View style={[styles.row]}>
            <MyText fontSize={text_size_2} color={text_color_2}>
              {item.dosis}
            </MyText>
            <MyText fontSize={text_size_2} color={text_color_2}>
              {item.unidad}
            </MyText>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={updateState} style={styles.centerIcon}>
        <SimpleLineIcons
          style={styles.moreOptions}
          name="options-vertical"
          color={colors.icon}
          size={17}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(RenderReminder);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 3,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    width: '94%',
    alignSelf: 'center',
    gap: 16,
  },

  timeItem: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  moreOptions: {
    alignSelf: 'center',
  },

  centerIcon: {justifyContent: 'center', flexGrow: 1},
});
