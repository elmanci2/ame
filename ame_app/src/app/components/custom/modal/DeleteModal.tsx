import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CloseBottom} from '../CloseBottom';
import {colors} from '../../../../constants/Constants';
import {MyText} from '../MyText';
import {GlobalStyle} from '../../../styles/styles';

type Props = {
  title: string;
  message: string;
  remove: () => Promise<void>;
  cancel: () => void;
  loading: boolean;
};

const DeleteModal = ({message, remove, title, cancel, loading}: Props) => {
  if (loading) {
    <View style={styles.load}>
      <ActivityIndicator size={30} color={colors.tertiary} />
    </View>;
  }

  return (
    <View style={[GlobalStyle.gap]}>
      <View style={styles.modalHeader}>
        <CloseBottom onPress={() => cancel && cancel()} />
      </View>

      <View style={styles.modalBody}>
        <MaterialIcons
          name="error-outline"
          size={40}
          color="red"
          style={styles.iconModal}
        />
        <View style={[GlobalStyle.gap]}>
          <MyText style={styles.modalTextTitle} fontSize={20} fontWeight="600">
            {title}
          </MyText>
          <Text style={styles.modalTextMassage}>{message}</Text>
        </View>
      </View>

      <View style={styles.modalFooter}>
        <TouchableOpacity
          onPress={cancel}
          style={[styles.btnModal, styles.btnCancel]}>
          <Text style={styles.btnTextModal}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={remove}
          style={[styles.btnModal, styles.betAcepa]}>
          <Text style={[styles.btnTextModal, styles.removeTextColorBtn]}>
            Remover
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  // modal
  modalFooter: {
    backgroundColor: colors.primary,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },

  btnModal: {
    borderWidth: 1,
    borderColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },

  btnCancel: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },

  betAcepa: {
    backgroundColor: colors.secundario,
    borderColor: colors.white,
    borderWidth: 1,
  },
  btnTextModal: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.icon,
  },
  removeTextColorBtn: {
    color: colors.white,
  },

  modalHeader: {
    paddingRight: 10,
    paddingTop: 10,
  },
  modalBody: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingHorizontal: 10,
    gap: 10,
    paddingBottom: 20,
  },
  modalTextTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.texto_bold,
  },
  modalTextMassage: {
    color: colors.texto_ling,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  iconModal: {
    backgroundColor: '#ee9098be',
    borderRadius: 50,
    padding: 4,
  },

  load: {flex: 1},
});
