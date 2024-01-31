import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MyText} from '../../../custom/MyText';
import {colors} from '../../../../../constants/Constants';

const RenderPill = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.pillStyles, {paddingRight: 30, marginRight: -15}]}>
        <MyText
          color={colors.white}
          fontWeight="600"
          fontSize={14}
          style={styles.pillText}>
          Compartir app
        </MyText>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../../assets/img/icon/user/home/pill.png')}
          style={styles.img}
        />
        <Image
          source={require('../../../../../assets/img/icon/user/home/pillshadow.png')}
          style={styles.shadowImg}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.pillStyles,
          {paddingLeft: 30, marginLeft: -15, marginBottom: 100},
        ]}>
        <MyText
          color={colors.white}
          fontWeight="600"
          fontSize={14}
          style={styles.pillText}>
          Invitar amigos
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

export default RenderPill;

const styles = StyleSheet.create({
  pillStyles: {
    backgroundColor: colors.tertiary,
    padding: 8,
    borderRadius: 25,
  },
  pillText: {},
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 76.84,
    height: 228.16,
    position: 'relative',
    zIndex: 4,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  shadowImg: {
    position: 'absolute',
    width: '100%',
    height: 225,
    borderRadius: 65,
    overflow: 'hidden',
  },
});
