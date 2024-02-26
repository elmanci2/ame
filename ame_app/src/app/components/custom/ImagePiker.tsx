import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {Fragment, memo, useState} from 'react';
import {colors} from '../../../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import BottomModal from './BottomModal';
import {MyText} from './MyText';
import {CloseBottom} from './CloseBottom';

interface Props {
  onChangeImage?: (uri: string) => void;
  resultDate?: (result: any) => void;
}

export const ImagePiker = memo(({onChangeImage, resultDate}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState<undefined | string>(undefined);

  const openFiles = async () => {
    setShowModal(false);
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result?.assets) {
      setPhoto(result?.assets[0]?.uri);
      onChangeImage && onChangeImage(result?.assets[0]?.uri ?? 'NOT');
      resultDate && resultDate(result);
    }
  };

  const opeCamera = async () => {
    setShowModal(false);
    const result = await launchCamera({
      mediaType: 'photo',
    });

    if (result?.assets) {
      setPhoto(result?.assets[0]?.uri);
      onChangeImage && onChangeImage(result?.assets[0]?.uri ?? 'NOT');
    }
  };

  return (
    <Fragment>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowModal(true)}>
        {photo ? (
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{uri: photo}}
          />
        ) : (
          <FontAwesome
            name="picture-o"
            size={200}
            color="rgba(126, 158, 173, 0.41)"
          />
        )}
      </TouchableOpacity>
      <BottomModal {...{showModal, setShowModal}}>
        <View style={styles.modalContainer}>
          <CloseBottom
            onPress={() => setShowModal(false)}
            style={styles.close}
          />
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.selectItem} onPress={opeCamera}>
              <Entypo name="camera" color={colors.tertiary} size={50} />
              <MyText fontWeight="700" fontSize={17} color={colors.texto_ling}>
                Cámara
              </MyText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectItem} onPress={openFiles}>
              <Entypo name="folder-images" color={colors.tertiary} size={50} />
              <MyText fontWeight="700" fontSize={17} color={colors.texto_ling}>
                Archivos
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModal>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 230,
    borderColor: colors.tertiary,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },

  selectItem: {
    alignItems: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
  },

  modalContainer: {
    paddingVertical: 15,
  },

  close: {
    marginRight: 20,
  },
});
