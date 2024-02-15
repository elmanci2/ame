import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomScreen from '../components/custom/CustomScreen';
import MyInput from '../components/custom/MyInput';
import {GlobalStyle} from '../styles/styles';
import {FlatList} from 'react-native-gesture-handler';
import {RenderMedicine} from '../components/screen/MedicationsLists/RenderMedicine';
import {useFetch} from '../hook/http/useFetch';
import LoadScreen from './LoadScreen';

const apiUrl = 'https://www.datos.gov.co/resource/i7cb-raxc.json';
const itemsPerPage = 20;

export const MedicationsLists = () => {
  const offset = (1 - 1) * itemsPerPage;
  const url = `${apiUrl}?$query=SELECT * ORDER BY :id ASC LIMIT ${itemsPerPage} OFFSET ${offset}`;

  const {data, loading} = useFetch(url, 'medicineList', false);

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <View style={styles.inputContainer}>
        <MyInput
          style={styles.width}
          showLabel
          showAutoComplete
          placeholder="¿Nombre del medicamento?"
          textInputProps={{
            autoFocus: true,
          }}
        />
      </View>
      <View style={styles.renderContainer}>
        <FlatList
          contentContainerStyle={[
            GlobalStyle.gap,
            {paddingBottom: GlobalStyle.gap.gap + 10},
          ]}
          data={data}
          renderItem={({item}) => <RenderMedicine {...{item}} />}
          keyExtractor={() => Math.random().toString(36).substring(7)}
        />
      </View>
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  width: {
    width: '100%',
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginTop: 6,
  },
  renderContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
