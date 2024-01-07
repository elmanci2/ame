import React from 'react';
import HederComponent from '../../components/custom/HederComponent';
import CustomScreen from '../../components/custom/CustomScreen';
import GridMenu from '../../components/custom/global/GridMenu';
import {UserHomeGridArray as items} from './config/grid/gridArrays';
import RenderPill from '../../components/screen/users/home/RenderPill';
import {View, ViewStyle} from 'react-native';

const UserHomeScreen = (props: any) => {
  const styles: ViewStyle = {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 50,
    marginBottom: -40,
  };

  return (
    <CustomScreen>
      <HederComponent {...props} />
      <View style={styles}>
        <GridMenu {...{items}} />
        <RenderPill />
      </View>
    </CustomScreen>
  );
};

export default UserHomeScreen;
