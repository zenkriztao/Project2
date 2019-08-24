import React from 'react';
import { View } from 'react-native';
import MapNew from '../components/MapNew';

const MapScreen = props => {
  return (
    <View style={{ flex: 1 }}>
      <MapNew />
    </View>
  );
};

export default MapScreen;
