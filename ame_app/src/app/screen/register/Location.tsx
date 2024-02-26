import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../../components/custom/Logo';
import {ScrollView} from 'react-native-gesture-handler';
import DropDownElement from '../../components/custom/DropDown/DropDownElement';
import NextBottomRegister from './components/NextBottomRegister';
import {RoutListTypeProps} from '../../types/types';
import MyInput from '../../components/custom/MyInput';
import {useFetch} from '../../hook/http/useFetch';
import {useDispatch} from 'react-redux';
import {addInfo} from '../../redux/RegisterSlider';
import BottomSheet from '@gorhom/bottom-sheet';

const Location = ({route, navigation}: RoutListTypeProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const [showSheet, setShowSheet] = useState(false);

  // variables
  const snapPoints = React.useMemo(() => ['1%', '90%'], []);

  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {select} = route?.params ?? {};
  const Dispatch = useDispatch();
  const [countries, setCountries] = useState<any>({});
  const [departmentData, setDepartmentData] = useState<any>({});
  const [cities, setCities] = useState<any>({});

  const [info, setInfo] = useState({
    country: countries?.value,
    city: cities?.value,
    state: departmentData?.value,
    barrio: null,
    address: null,
  });

  const validateNext =
    (info.address && info.state !== null) ||
    undefined ||
    ('' && info.country !== null) ||
    undefined ||
    ('' && info.city !== null) ||
    undefined ||
    ('' && info.barrio !== null) ||
    undefined ||
    '';

  const {data: countriesData, loading: countriesLoading} = useFetch(
    'get-countries',
    'get-countries',
  );

  const {data: StateData, loading: StateLoading} = useFetch(
    `get-state/${countries?.value ?? 82}`,
    `get-state/${countries?.value ?? 82}`,
  );

  const {data: citiesData, loading: citiesLoading} = useFetch(
    `get-cities/${departmentData?.value ?? 1699}`,
    `get-cities/${departmentData?.value ?? 1699}`,
  );

  useEffect(() => {
    if (select?.code) {
      setCountries({
        ...select,
      });
    }

    if (select?.st === null) {
      setDepartmentData({
        ...select,
      });
    }

    if (select?.cit === null) {
      setCities({
        ...select,
      });
    }
  }, [select]);

  const next = () => {
    Dispatch(
      addInfo({
        ...info,
        country: countries?.value,
        city: cities?.value,
        state: departmentData?.value,
      }),
    );
    navigation.navigate('Document');
  };

  console.log(info);

  return (
    <CustomScreen>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Logo style={{alignSelf: 'center', marginVertical: 10}} />
            <MyText
              style={{alignSelf: 'center'}}
              fontSize={30}
              fontWeight="700"
              color={colors.icon}>
              Ubicación
            </MyText>
          </View>

          <View style={{width: '90%', alignSelf: 'center', gap: 20}}>
            <DropDownElement
              placeholder="País"
              select={'Countries'}
              value={countries?.label ?? ''}
              screen="register_location"
              data={countriesData?.countries}
              label="País"
              styles={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.icon,
              }}
            />
            <DropDownElement
              placeholder="Departamento / estado"
              blocked={
                !Boolean(
                  countries !== '' &&
                    countries !== null &&
                    countries !== undefined &&
                    Object.keys(countries).length !== 0,
                )
              }
              select={'Departamento'}
              screen="register_location"
              data={StateData?.state ?? []}
              value={departmentData?.label ?? ''}
              label="Departamento / estado"
              styles={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.icon,
              }}
            />
            <DropDownElement
              blocked={
                !Boolean(
                  departmentData !== '' &&
                    departmentData !== null &&
                    departmentData !== undefined &&
                    Object.keys(departmentData).length !== 0,
                )
              }
              placeholder="Ciudad"
              select="City"
              data={citiesData?.cities ?? []}
              value={cities?.label}
              screen="register_location"
              label="Ciudad"
              styles={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.icon,
              }}
            />
            <MyInput
              placeholder="Barrio / comuna"
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Barrio / comuna"
              onChangeText={e => setInfo({...info, barrio: e})}
              showLabel
              {...{
                textInputProps: {
                  keyboardType: 'default',
                },
              }}
            />

            <MyInput
              placeholder="Domicilio"
              inputStyles={styles.input}
              style={styles.inputStyle}
              label="Domicilio"
              onChangeText={e => setInfo({...info, address: e})}
              showLabel
              {...{
                textInputProps: {
                  keyboardType: 'default',
                },
              }}
            />
          </View>
          <NextBottomRegister
            {...{
              active: Boolean(validateNext),
              action: next,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </CustomScreen>
  );
};

export default Location;

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.texto_ling,
  },
  inputStyle: {
    width: '100%',
    gap: 5,
  },
});
