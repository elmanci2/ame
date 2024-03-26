import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps} from '../../types/types';
import {RenderVitalsSingsList} from '../../components/screen/Visitor/RenderVitalsSingsList';
import {useFetch} from '../../hook/http/useFetch';

const HistorySignes = ({route}: RoutListTypeProps) => {
  const {title} = route.params;
  const {data} = useFetch(
    'history-vital-signes-user',
    'history-vital-signes-user',
  );

  //  console.log(data);

  return (
    <CustomScreen>
      <DowIndicator />
      <Title {...{title, styles: {marginTop: 10}}} />
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={styles.conedFlatList}
          style={styles.FlatList}
          data={data}
          renderItem={({item}) => <RenderVitalsSingsList item={item} />}
        />
      </View>
    </CustomScreen>
  );
};

export default HistorySignes;

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
