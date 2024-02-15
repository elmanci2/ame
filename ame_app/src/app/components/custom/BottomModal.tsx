import {Modal, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {colors} from '../../../constants/Constants';
import {MotiView} from 'moti';

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
    <Modal
      transparent
      visible={showModal}
      statusBarTranslucent
      onRequestClose={() => {
        closeModal();
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.touch}
        onPress={closeModal}
      />
      <MotiView
        from={{
          translateY: 300,
        }}
        animate={{
          translateY: showModal ? 0 : 300,
        }}
        transition={{
          type: 'timing',
          duration: 370,
        }}
        style={[styles.modalContainer]}>
        {children}
      </MotiView>
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
