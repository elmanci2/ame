import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, Modal, View} from 'react-native';
import {colors} from '../../../constants/Constants';
import {FlatList} from 'react-native-gesture-handler';
import {MyText} from './MyText';

interface UnidadDeMedida {
  label: string;
  value: string;
}

interface Props {
  showLabel?: boolean;
  label?: string;
  onValue?: (value: string) => void;
  onClose?: () => void;
  onOpen?: () => void;
  data: UnidadDeMedida[] | any;
  title?: string;
  blocked?: boolean;
}

const ItemSelectPiker = ({
  showLabel = false,
  label = 'Seleccionar Unidad',
  title = 'Seleccionar Unidad',
  onValue,
  onClose,
  onOpen,
  data,
  blocked = false,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState(data[0].value);
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    if (onOpen) {
      onOpen();
    }
  };

  const hideModal = () => {
    setModalVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleUnitSelect = (unit: UnidadDeMedida) => {
    setSelectedValue(unit.value);
    hideModal();
    if (onValue) {
      onValue(unit.value);
    }
  };

  const blockedStyles = !blocked
    ? {backgroundColor: colors.white}
    : {backgroundColor: 'rgba(255, 255, 255, 0.43)'};

  return (
    <View>
      {showLabel && (
        <MyText fontSize={15} fontWeight="600" color={colors.texto_bold}>
          {label}
        </MyText>
      )}

      <TouchableOpacity
        style={[styles.container, blockedStyles]}
        onPress={!blocked ? showModal : () => null}>
        <Text style={{color: colors.texto_bold}}>{selectedValue}</Text>

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={hideModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{title}</Text>
              <FlatList
                data={data}
                renderItem={({item}: {item: UnidadDeMedida}) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => handleUnitSelect(item)}>
                    <Text style={styles.unitItem}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity onPress={hideModal}>
                <Text style={styles.closeButton}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default ItemSelectPiker;

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(225, 242, 253, 0.46)',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    shadowColor: 'rgba(202, 223, 255, 0.53)',
    paddingHorizontal: 15,
    color: colors.icon,
    fontWeight: '600',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.texto_bold,
  },
  unitItem: {
    fontSize: 18,
    paddingVertical: 10,
    color: colors.texto_bold,
  },
  closeButton: {
    color: colors.tertiary,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: 10,
  },
});
