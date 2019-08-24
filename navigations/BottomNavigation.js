/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';


import Loadable from 'react-loadable';
import TestScreenLogin from '../components/TestScreen/TestScreenLogin';
import { withInternet } from '../hocs/withInternet';
import { withAuth } from '../hocs/withAuth';
import { compose } from 'recompose';
import IconTabCustom from '../components/Shared/IconTabCustom';

const CORLORDEFAULT = '#41C9BC';

const HomeScreen = Loadable({
  loader: () => import('../screens/HomeScreen'),
  loading: () => null,
});

const AccountScreen = Loadable({
  loader: () => import('../screens/AccountScreen'),
  loading: () => null,
});

const SavedScreen = Loadable({
  loader: () => import('../screens/SavedScreen'),
  loading: () => null,
});

const BookingScreen = Loadable({
  loader: () => import('../screens/BookingScreen'),
  loading: () => null,
});

const MessagesScreen = Loadable({
  loader: () => import('../screens/MessagesScreen'),
  loading: () => null,
});

const Stack = (screen, nameScreen, nameIcon) => {
  const ScreenStack = createStackNavigator({
    [nameScreen]: {
      screen,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
  });

  ScreenStack.navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const checkColor = tintColor === '#8E8E93';

      return (
        <IconTabCustom
          name={nameIcon}
          color={checkColor ? tintColor : CORLORDEFAULT}
          navigation={navigation}
        />
      );
    },
    tabBarOptions: {
      showLabel: false,
    },
  });

  return ScreenStack;
};

export default createBottomTabNavigator(
  {
    // Test: {
    //   screen: TestScreenLogin,
    // },
    Home: {
      screen: Stack(withInternet(HomeScreen), 'Home', 'home'),
    },
    Saved: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(SavedScreen),
        'Saved',
        'hearto',
      ),
    },
    Booking: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(BookingScreen),
        'Booking',
        'shoppingcart',
      ),
    },
    Messages: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(MessagesScreen),
        'Messages',
        'message1',
      ),
    },
    Account: {
      screen: Stack(
        compose(
          withAuth,
          withInternet,
        )(AccountScreen),
        'Account',
        'user',
      ),
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);
