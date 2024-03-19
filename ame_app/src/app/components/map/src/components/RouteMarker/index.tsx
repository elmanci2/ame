import React from 'react';
import { Text } from 'react-native';
import { Marker } from 'react-native-maps';
import connectTheme from '../../themes';
import Styles from './styles';

interface Props {
    coordinate: { latitude: number; longitude: number };
    type: string;
    theme: any; // Ajusta el tipo según la estructura real de tu tema
}

const RouterMarker: React.FC<Props> = ({ coordinate, type, theme }) => {
    const styles = Styles(connectTheme(theme).Markers[type]);

    return (
        <Marker coordinate={coordinate}>
            <Text style={styles.markerText}>{theme.icon}</Text>
        </Marker>
    );
};

export default RouterMarker;
