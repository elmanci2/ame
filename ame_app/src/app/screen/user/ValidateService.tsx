/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import {Image, View} from 'moti';
import {colors, default_image} from '../../../constants/Constants';
import {Title} from '../../components/custom/Title';
import {MyText} from '../../components/custom/MyText';
import {StarRating} from '../../components/custom/StarRating';
import ActionBottom from '../../components/custom/ActionBottom';
import {usePost} from '../../hook/http/usePost';
import LoadScreen from '../LoadScreen';
import {useNavigation} from '@react-navigation/native';

const ValidateService = (props: any) => {
  const [rating, setRating] = useState(1);
  const [observation, setObservation] = useState('');
  const navigation = useNavigation<any>();

  const {postRequest, loading} = usePost('confirme-Service', {
    start: rating,
    observation,
    id: props?.id,
  });

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <CustomScreen>
      <DowIndicator />

      <View style={styles.body}>
        <View>
          <Title {...{title: 'Confirma servicio', styles: styles.title}} />
        </View>
        <View style={{gap: 20}}>
          <View style={styles.header}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={{uri: props?.gte_phone ?? default_image}}
              />
            </View>
            <MyText {...styles.text}>{props?.get_name ?? ''}</MyText>
          </View>

          <View>
            <StarRating onChange={handleRatingChange} />
          </View>

          <View>
            <TextInput
              style={styles.TextArea}
              numberOfLines={10}
              multiline={true}
              textAlignVertical="top"
              placeholder="Observación"
              onChangeText={text => setObservation(text)}
              placeholderTextColor={colors.texto_ling}
            />
          </View>

          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
            <ActionBottom
              noStyles
              containerStyles={[
                styles.btnContainer,
                {backgroundColor: colors.secundario},
              ]}
              noStylesText
              textStyles={styles.btnText}
              text="reportar"
              action={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <ActionBottom
              noStyles
              textStyles={styles.btnText}
              containerStyles={[
                styles.btnContainer,
                {
                  backgroundColor: colors.tertiary,
                },
              ]}
              noStylesText
              text="Confirmar"
              action={async function (): Promise<void> {
                await postRequest();
                navigation.navigate('home');
              }}
            />
          </View>
        </View>
      </View>
    </CustomScreen>
  );
};

export default ValidateService;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginTop: 20,
    alignItems: 'center',
  },

  imgContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  title: {
    marginTop: 20,
  },
  body: {
    paddingHorizontal: 13,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },

  TextArea: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.texto_ling,
    padding: 6,
    color: colors.texto_ling,
  },
  btnContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 19,
    color: colors.white,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
