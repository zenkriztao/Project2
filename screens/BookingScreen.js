import React from 'react';
import { View } from 'react-native';
import Booking from '../components/Booking';

const BookingScreen = props => {
  return (
    <View style={{ flex: 1 }}>
      <Booking />
    </View>
  );
};

export default BookingScreen;
