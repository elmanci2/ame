import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import MyInput from '../../components/custom/MyInput';
import {MyText} from '../../components/custom/MyText';
import {colors} from '../../../constants/Constants';
import {useFetch} from '../../hook/http/useFetch';
import {RenderUserLIst} from '../../components/custom/RenderUserLIst';
import {RenderLottie} from '../../components/custom/RenderLottie';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const SearchUsers = () => {
  const [search, setSearch] = useState('');

  const {data, error, loading} = useFetch(
    `search-users?term=${search}`,
    `search-users?term=${search}`,
  );

  if (error) {
    Toast.show({
      type: 'error',
      //@ts-ignore
      text2: error?.message,
    });
  }

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.body}>
        <MyInput
          placeholder="Nombre del paciente."
          onChangeText={setSearch}
          style={styles.input}
          {...{
            textInputProps: {
              autoFocus: true,
            },
          }}
        />

        <View style={styles.resultadosContainer}>
          {data && data.length > 0 && (
            <MyText fontSize={20} fontWeight="500" color={colors.secundario}>
              Resultados
            </MyText>
          )}

          <View>
            {search !== '' && loading ? (
              <ActivityIndicator
                size={60}
                color={colors.tertiary}
                style={{flex: 1, justifyContent: 'center', marginTop: 50}}
              />
            ) : data && data.length < 1 ? (
              <RenderLottie
                {...{
                  animate: require('../../animation/lottie/search2'),
                  center: true,
                }}
              />
            ) : (
              <RenderUserLIst {...{data}} />
            )}
          </View>
        </View>
      </View>
    </CustomScreen>
  );
};

export default SearchUsers;

const styles = StyleSheet.create({
  body: {
    marginTop: 30,
  },
  input: {
    width: '95%',
    borderWidth: 0.4,
    borderRadius: 10,
  },

  resultadosContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    gap: 30,
  },
});
