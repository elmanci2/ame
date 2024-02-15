import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import ImageView from 'react-native-image-viewing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../constants/Constants';
import RNFetchBlob from 'rn-fetch-blob';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const ImagePreviewContainer = ({photo}: any) => {
  const [visible, setIsVisible] = React.useState(false);
  const [image] = useState([
    {
      uri: photo,
    },
  ]);

  const openPhoto = () => {
    if (visible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          //@ts-ignore
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          Toast.show({
            type:"error",
            text2:"Sin permiso al almacenamiento. "
          })
       
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let ext: any = getExtention(photo);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          '.jpg',
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', photo)
      .then((res: any) => {
        console.log('res -> ', JSON.stringify(res));
        Toast.show({
          type: 'success',
          text2: 'Imagen Descargada',
        });
      });
  };

  const getExtention = (filename: string) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : ".jpg";
  };

  return (
    <View style={{marginTop: 40}}>
      <TouchableOpacity
        onPress={openPhoto}
        style={styles.imgContend}
        activeOpacity={0.5}>
        <Image source={{uri: photo}} style={{width: '100%', height: '100%'}} />
        <TouchableOpacity style={styles.downloadBtn} onPress={checkPermission}>
          <AntDesign name="clouddownloado" size={30} color={colors.icon} />
        </TouchableOpacity>
      </TouchableOpacity>

      <ImageView
        presentationStyle="fullScreen"
        images={image}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default ImagePreviewContainer;

const styles = StyleSheet.create({
  imgContend: {
    position: 'relative',
    height: 400,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  downloadBtn: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
  },
});
