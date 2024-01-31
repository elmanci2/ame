import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {MyText} from '../../custom/MyText';
import {colors} from '../../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

type Props = {
  img: ImageSourcePropType;
  title: string;
  description: string;
};

const RegisterTypeCard = ({img, title, description}: Props) => {
  const navigation = useNavigation<any>();
  const onPress = () => {
    navigation.navigate('home_register', {type: title});
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={img} />
        </View>
        <View style={styles.textContainer}>
          <MyText fontSize={16} fontWeight="500" color={colors.secundario}>
            {title}
          </MyText>
          <MyText fontSize={15} fontWeight="400" color={colors.texto_ling}>
            {description}
          </MyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RegisterTypeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imgContainer: {
    width: 150,
    height: 170,
  },
  textContainer: {
    gap: 5,
    flexGrow: 1,
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 10,
    width: 200,
  },
});
