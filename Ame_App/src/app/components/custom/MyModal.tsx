import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {colors} from '../../../constants/Constants';

interface Props {
  hideModal?: () => void;
  visible?: boolean;
  children: JSX.Element | JSX.Element[];
}

export default function MyModal({hideModal, visible, children}: Props) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={hideModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {children}
          <TouchableOpacity onPress={hideModal}>
            <Text style={styles.closeButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the alpha value for darkness level
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },

  closeButton: {
    color: colors.tertiary,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: 10,
  },
});
