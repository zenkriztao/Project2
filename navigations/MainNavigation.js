/* eslint-disable linebreak-style */
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import {
  Login,
  Register,
  ForgetPassword,
  PrivacyPolicy,
  TermsAndConditions,
} from '../components/Auth';
import BottomNavigation from './BottomNavigation';
import Loadable from 'react-loadable';
import {
  BookingDetail,
  CancelBooking,
  BookingReview,
} from '../components/Booking/View';
import {
  InfoMerchant,
  Profile,
  Settings,
  Notification,
  Currency,
  ChangePassword,
  Shared,
} from '../components/Account/View';
import { withAuth } from '../hocs/withAuth';
import { withInternet } from '../hocs/withInternet';
import { compose } from 'recompose';
import MessagesDetail from '../components/Messages/MessagesDetail';

const ConfirmInfoCustomer = Loadable({
  loader: () => import('../modules/DetailsView/ConfirmInfoCustomer'),
  loading: () => null,
});

const PaymentsBank = Loadable({
  loader: () => import('../modules/DetailsView/PaymentsBank'),
  loading: () => null,
});

const WebViewBaoKim = Loadable({
  loader: () => import('../modules/DetailsView/WebViewBaoKim'),
  loading: () => null,
});

const BackArrow = Loadable({
  loader: () => import('../components/CusTomHeaderNavigation/BackArrow'),
  loading: () => null,
});

const BackHeader = Loadable({
  loader: () => import('../components/CusTomHeaderNavigation/BackHeader'),
  loading: () => null,
});

const HeaderListRooms = Loadable({
  loader: () => import('../components/CusTomHeaderNavigation/HeaderListRooms'),
  loading: () => null,
});

const SearchInput = Loadable({
  loader: () =>
    import('../components/HomeScreen/Nav/SearchComponent/SearchInput'),
  loading: () => null,
});

const ChooseDate = Loadable({
  loader: () =>
    import(
      '../components/HomeScreen/Nav/SearchComponent/ChooseDate/ChooseDate'
    ),
  loading: () => null,
});

const ListRoomsScreen = Loadable({
  loader: () => import('../screens/ListRoomsScreen'),
  loading: () => null,
});

const MapScreen = Loadable({
  loader: () => import('../screens/MapScreen'),
  loading: () => null,
});

const DetailScreen = Loadable({
  loader: () => import('../modules/DetailsView/DetailsRoomScreen'),
  loading: () => null,
});

const FilterScreen = Loadable({
  loader: () => import('../screens/FilterScreen'),
  loading: () => null,
});
const InfoBooking = Loadable({
  loader: () => import('../modules/DetailsView/InfoBooking'),
  loading: () => null,
});

const ModalBoxBooking = Loadable({
  loader: () => import('../modules/DetailsView/ModalBoxBooking'),
  loading: () => null,
});

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: BottomNavigation,
    },
    Login: { screen: withInternet(Login) },
    Register: { screen: withInternet(Register) },
    ForgetPassword: { screen: withInternet(ForgetPassword) },
    TermsAndConditions: { screen: withInternet(TermsAndConditions) },
    PrivacyPolicy: { screen: withInternet(PrivacyPolicy) },
    InfoMerchant: { screen: withInternet(InfoMerchant) },
    MessagesDetail: {
      screen: compose(
        withAuth,
        withInternet,
      )(MessagesDetail),
      navigationOptions: { header: null },
    },
    Profile: {
      screen: compose(
        withAuth,
        withInternet,
      )(Profile),
    },
    SearchInput: {
      screen: withInternet(SearchInput),
      navigationOptions: { header: null },
    },
    Settings: {
      screen: withInternet(Settings),
      navigationOptions: { header: null },
    },
    Notification: {
      screen: withInternet(Notification),
      navigationOptions: { header: null },
    },
    Shared: {
      screen: withInternet(Shared),
      navigationOptions: { header: null },
    },
    ChangePassword: {
      screen: compose(
        withAuth,
        withInternet,
      )(ChangePassword),
      navigationOptions: { header: null },
    },
    Currency: {
      screen: withInternet(Currency),
      navigationOptions: { header: null },
    },
    ChooseDate: {
      screen: withInternet(ChooseDate),
      navigationOptions: { header: null },
    },
    BookingDetail: {
      screen: compose(
        withAuth,
        withInternet,
      )(BookingDetail),
      navigationOptions: { header: null },
    },
    CancelBooking: {
      screen: compose(
        withAuth,
        withInternet,
      )(CancelBooking),
      navigationOptions: { header: null },
    },
    BookingReview: {
      screen: compose(
        withAuth,
        withInternet,
      )(BookingReview),
      navigationOptions: { header: null },
    },
    Filter: {
      screen: withInternet(FilterScreen),
      navigationOptions: { header: null },
    },
    ListRooms: {
      screen: withInternet(ListRoomsScreen),
      navigationOptions: ({ navigation }) => ({
        header: () => <HeaderListRooms navigation={navigation} />,
      }),
    },
    Map: {
      screen: withInternet(MapScreen),
      navigationOptions: ({ navigation }) => ({
        header: () => <BackArrow navigation={navigation} />,
      }),
    },
    DetailScreen: {
      screen: withInternet(DetailScreen),
      navigationOptions: { header: null },
    },
    InfoBooking: {
      screen: withInternet(InfoBooking),
      navigationOptions: { header: null },
    },
    ModalBoxBooking: {
      screen: withInternet(ModalBoxBooking),
      navigationOptions: {
        header: null,
      },
    },
    ConfirmInfoCustomer: {
      screen: withInternet(ConfirmInfoCustomer),
      navigationOptions: {
        header: null,
      },
    },
    PaymentsBank: {
      screen: withInternet(PaymentsBank),
      navigationOptions: {
        header: null,
      },
    },
    WebViewBaoKim: {
      screen: withInternet(WebViewBaoKim),
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: () => <BackHeader navigation={navigation} />,
    }),
  },
);

export default createAppContainer(stackNavigator);
