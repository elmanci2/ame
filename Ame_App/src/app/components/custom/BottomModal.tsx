import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/Constants';

const blur_color = 'rgba(0, 0, 0, 0.22)';

interface Props {
  children: JSX.Element | JSX.Element[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

export default function BottomModal({
  children,
  setShowModal,
  showModal = false,
}: Props) {
  const closeModal = () => {
    setShowModal && setShowModal(false);
  };

  return (
    <Modal transparent visible={showModal}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.touch}
        onPress={closeModal}
      />
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  touch: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    backgroundColor: blur_color,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
