/* eslint-disable linebreak-style */
import React, { useReducer } from 'react';
import AppNavigator from './MainNavigation';
import {
  NavigationContext,
  navigationSateInit,
  navigationReducer,
} from '../store/context/navigator';
import {
  bookingReducer,
  bookingInitState,
  BookingContext,
} from '../components/Booking/Context';
import {
  SavedContext,
  savedReducer,
  savedStateInit,
} from '../components/Saved/Context';
import {
  MessagesContext,
  messagesReducer,
  messageStateInit,
} from '../components/Messages/Context';
import {
  PaymentBookingContext,
  PaymentBookingReducer,
  PaymentBookingStateInit,
} from '../store/context/PaymentBookingContext';

import ProviderNotifi from '../components/InAppNoti/ProviderNotifi';

const NavigatorView = props => {
  const [stateNavigation, dispatchNavigation] = useReducer(
    navigationReducer,
    navigationSateInit,
  );
  const [stateBooking, dispatchBooking] = useReducer(
    bookingReducer,
    bookingInitState,
  );
  const [stateSaved, dispatchSaved] = useReducer(savedReducer, savedStateInit);
  const [stateMessage, dispatchMessage] = useReducer(
    messagesReducer,
    messageStateInit,
  );
  const [statePaymentBooking, dispatchPaymentBooking] = useReducer(
    PaymentBookingReducer,
    PaymentBookingStateInit,
  );

  return (
    <ProviderNotifi topOffset={-2} backgroundColour="transparent">
      <NavigationContext.Provider
        value={{ stateNavigation, dispatchNavigation }}
      >
        <BookingContext.Provider value={{ stateBooking, dispatchBooking }}>
          <SavedContext.Provider value={{ stateSaved, dispatchSaved }}>
            <PaymentBookingContext.Provider
              value={{ statePaymentBooking, dispatchPaymentBooking }}
            >
              <MessagesContext.Provider
                value={{ stateMessage, dispatchMessage }}
              >
                <AppNavigator />
              </MessagesContext.Provider>
            </PaymentBookingContext.Provider>
          </SavedContext.Provider>
        </BookingContext.Provider>
      </NavigationContext.Provider>
    </ProviderNotifi>
  );
};

export default NavigatorView;
