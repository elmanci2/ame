import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {Title} from '../../components/custom/Title';
import {RoutListTypeProps} from '../../types/types';

const UserProfile = ({route}: RoutListTypeProps) => {
  const {title} = route.params;

  return (
    <CustomScreen>
      <DowIndicator />
      <DowIndicator />
      <View style={{marginTop: 20, paddingHorizontal: 5}}>
        <Title {...{title}} />
      </View>
    </CustomScreen>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
