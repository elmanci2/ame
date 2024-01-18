import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomScreen from '../../components/custom/CustomScreen';
import {DowIndicator} from '../../components/custom/DowIndicator';
import Mapa from '../../components/custom/Mapa';
import {colors} from '../../../constants/Constants';
import ActionBottom from '../../components/custom/ActionBottom';
import {Title} from '../../components/custom/Title';
import useServices from '../../hook/services/useServices';
import {RoutListTypeProps} from '../../types/types';

const MapaCollection = ({navigation}: RoutListTypeProps) => {
  const [location, setLocation] = useState(null);
  const {add} = useServices();
  const fechaHoraActual = new Date();

  return (
    <CustomScreen>
      <DowIndicator />
      <View style={styles.container}>
        <Mapa
          {...{
            onCurrenLocation(e) {
              setLocation(e);
            },
          }}
        />
        <View style={styles.footer}>
          <Title {...{title: 'Recolección \n de medicamentos'}} />
          <ActionBottom
            {...{
              action() {
                add({
                  id: JSON.stringify(Math.floor(Math.random() * 1000)),
                  location: JSON.stringify(location),
                  serviceId: '1',
                  type: 1,
                  date: {
                    fecha: fechaHoraActual.toISOString().split('T')[0], // Obtener solo la parte de la fecha en formato ISO
                    hora: fechaHoraActual.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }), // Obtener la hora en formato 24 horas con minutos y segundos
                  },
                });

                return navigation.replace('home');
              },
              text: 'Listo',
              containerStyles: {
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
              },
            }}
          />
        </View>
      </View>
    </CustomScreen>
  );
};

export default MapaCollection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },

  footer: {
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: 'black',
    elevation: 29,
    justifyContent: 'space-evenly',
  },
});
