import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {colors} from '../../../constants/Constants';
import {MyText} from '../../components/custom/MyText';
import ActionBottom from '../../components/custom/ActionBottom';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlatList} from 'react-native';
import useRemainingDaysInMonth from '../../hook/useRemainingDaysInMonth';
import ReminderList from '../../components/screen/users/reminder/ReminderList';
import {GlobalStyle} from '../../styles/styles';
import useRemainingMonths from '../../hook/useRemainingMonths';

const currentDate = new Date();
const month = currentDate.toLocaleString('default', {month: 'long'});
const dayNumber = currentDate.getDate();

const UserRemindersScreen = ({navigation}: any) => {
  const [selectMonth, setSelectMonth] = useState({
    num: 1,
    month: month,
  });
  const [selectDay, setSelectDay] = useState<number>(dayNumber);
  const remainingDays = useRemainingDaysInMonth(selectMonth.num);

  const months = useRemainingMonths();

  return (
    <CustomScreen>
      <View style={styles.header}>
        <StatusBar backgroundColor={colors.white} />
        <View style={styles.menu}>
          <MyText fontWeight="800" fontSize={17} color={colors.texto_bold}>
            Mis medicamentos
          </MyText>
          <ActionBottom
            action={() => navigation.navigate('addReminder')}
            text="Agregar"
            icon={<Entypo name="plus" color={colors.white} size={24} />}
          />
        </View>

        <View style={styles.month}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={GlobalStyle.gap}
            horizontal
            data={months}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setSelectMonth(item)}>
                <MyText
                  style={
                    [
                      selectMonth.month === item.month && styles.activeMonth,
                      styles.monthText,
                    ] as any
                  }
                  fontWeight="400"
                  fontSize={17}
                  color={
                    selectMonth === item ? colors.secundario : colors.texto_bold
                  }>
                  {item.month}
                </MyText>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.day}>
          {/*    <MyText fontSize={20} fontWeight="500" color={colors.secundario}>
            Dia
          </MyText> */}
          <FlatList
            data={remainingDays}
            contentContainerStyle={{gap: GlobalStyle.gap.gap + 7}}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dayAnNum}
                onPress={() => setSelectDay(item.num)}>
                <MyText
                  fontSize={14}
                  fontWeight="700"
                  color={
                    selectDay === item.num
                      ? colors.secundario
                      : colors.texto_bold
                  }>
                  {item.num}
                </MyText>
                <MyText
                  style={styles.dayName}
                  fontSize={14}
                  color={
                    selectDay === item.num
                      ? colors.secundario
                      : colors.texto_bold
                  }>
                  {item.day}
                </MyText>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View style={styles.reminderContainer}>
        <ReminderList day={selectDay} month={selectMonth.num} />
      </View>
    </CustomScreen>
  );
};

export default UserRemindersScreen;

const styles = StyleSheet.create({
  reminderContainer: {
    marginTop: 20,
    flex: 1,
    marginBottom: 20,
  },
  header: {
    backgroundColor: colors.white,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    shadowColor: 'rgba(80, 80, 80, 0.29)',
    paddingHorizontal: 10,
    gap: 20,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  month: {
    gap: 5,
  },

  monthText: {
    textTransform: 'capitalize',
    padding: 3,
  },

  activeMonth: {
    backgroundColor: colors.primary,
    borderRadius: 5,
  },

  dayAnNum: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  day: {
    gap: 10,
  },

  dayName: {
    textTransform: 'capitalize',
  },
});
