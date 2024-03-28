import {Alert, Share} from 'react-native';

export const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'Comparte Ame App con tus familiares y amigos para que mejoren su salud',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
