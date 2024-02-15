import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {RoutListTypeProps} from '../../types/types';
import {useFetch} from '../../hook/http/useFetch';
import {RenderVitalsSingsList} from '../../components/screen/Visitor/RenderVitalsSingsList';

const PatientHistorySignes = ({route}: RoutListTypeProps) => {
  const {id} = route?.params ?? {};

  const {data, loading, error} = useFetch(
    `history-vita-signes?id=${id}`,
    `history-vita-signes?id=${id}`,
  );

  console.log(data);

  return (
    <CustomScreen>
      <FlatList
        contentContainerStyle={styles.conedFlatList}
        style={styles.FlatList}
        data={data?.reverse() ?? []}
        renderItem={({item}) => <RenderVitalsSingsList item={item} />}
      />
    </CustomScreen>
  );
};

export default PatientHistorySignes;

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
  },
  conedFlatList: {
    gap: 15,
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
