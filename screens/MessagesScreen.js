import React from 'react';
import { View } from 'react-native';
import Messages from '../components/Messages';

const MessagesScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Messages />
    </View>
  );
};

export default MessagesScreen;
