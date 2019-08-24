import React from 'react';
import { View } from 'react-native';
import { withCollapsible } from 'react-navigation-collapsible';
import ListRooms from '../components/ListRooms';
import collapsibleParams from '../components/ListRooms/CollapHeader';

const ListRoomsScreen = props => {
  const { paddingHeight, animatedY, onScroll } = props.collapsible;

  return (
    <View style={{ flex: 1 }}>
      <ListRooms
        paddingHeight={paddingHeight}
        animatedY={animatedY}
        onScroll={onScroll}
      />
    </View>
  );
};

export default withCollapsible(ListRoomsScreen, collapsibleParams);
