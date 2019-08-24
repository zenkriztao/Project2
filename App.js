import React, { useReducer, useEffect, Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import AppView from "./src/modules/AppViewContainer";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  AuthContext,
  authReducer,
  authInit,
  SET_TOKEN,
  SET_LANGUAGE_STATUS
} from "./src/store/context/auth";
import storage from "./src/utils/Storage";
import { TOKEN } from "./src/utils/axios";
import { COLOR_BUTTON_DEFAULT } from "./src/utils/responsive.style";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/translations";
import { setCustomText } from "react-native-global-props";
import { useNetInfo } from "@react-native-community/netinfo";
import { ThemeProvider } from "react-native-elements";

const customTextProps = {
  style: {
    fontFamily: "Montserrat-Regular"
  }
};

const theme = {
  Button: {
    titleStyle: {
      ...customTextProps.style
    }
  },
  Text: {
    style: {
      ...customTextProps.style
    }
  },
  SearchBar: {
    inputStyle: {
      ...customTextProps.style
    }
  },
  Input: {
    inputStyle: {
      ...customTextProps.style
    }
  }
};

setCustomText(customTextProps);

const App = () => {
  const { isConnected } = useNetInfo();
  const [state, dispatch] = useReducer(authReducer, authInit);

  const getStorage = async () => {
    storage
      .load({ autoSync: true, key: TOKEN })
      .then(data => dispatch({ type: SET_TOKEN, payload: `Bearer ${data}` }))
      .catch(err => dispatch({ type: SET_TOKEN, payload: null }));

    storage
      .load({ autoSync: true, key: "initLanguage" })
      .then(data => dispatch({ type: SET_LANGUAGE_STATUS, payload: data }))
      .catch(err => {});
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <Suspense
      fallback={
        <View style={styles.container}>
          <ActivityIndicator color={COLOR_BUTTON_DEFAULT} />
        </View>
      }
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate
            loading={
              <View style={styles.container}>
                <ActivityIndicator color={COLOR_BUTTON_DEFAULT} />
              </View>
            }
            persistor={persistor}
          >
            <AuthContext.Provider value={{ state, dispatch, isConnected }}>
              <I18nextProvider i18n={i18n}>
                <AppView />
              </I18nextProvider>
            </AuthContext.Provider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default App;

// import React, { Component } from "react";
// import { View, Text, Button, Alert } from "react-native";
// import firebase from "react-native-firebase";

// export default class App extends Component {
//   async componentDidMount() {
//     this.checkPermission();
//     this.notificationOpenedListener = firebase
//       .notifications()
//       .onNotificationOpened(notificationOpen => {
//         console.log(notificationOpen);

//         // Get the action triggered by the notification being opened
//         const action = notificationOpen.action;
//         // Get information about the notification that was opened
//         const notification = notificationOpen.notification;

//         console.log(notification);
//       });

//     const notificationOpen = await firebase
//       .notifications()
//       .getInitialNotification();
//     if (notificationOpen) {

//       console.log(notificationOpen);
//       // App was opened by a notification
//       // Get the action triggered by the notification being opened
//       const action = notificationOpen.action;
//       // Get information about the notification that was opened
//       const notification = notificationOpen.notification;
//       console.log(notification);
//     }
//   }

//   componentWillUnmount() {
//     this.notificationOpenedListener();
//   }

//   // async componentDidMount() {
//   //   this.checkPermission();
//   //   const notificationOpen = await firebase
//   //     .notifications()
//   //     .getInitialNotification();

//   //   console.log(notificationOpen);

//   //   // this.createNotificationListeners();
//   // }

//   // async componentWillUnmount() {
//   //   // this.notificationListener();
//   //   // this.notificationOpenedListener();
//   //   // this.notificationDisplayedListener();
//   // }

//   async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//       this.getToken();
//     } else {
//       this.requestPermission();
//     }
//   }

//   async getToken() {
//     const fcmToken = await firebase.messaging().getToken();
//     console.log(fcmToken);
//   }

//   async requestPermission() {
//     try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//     } catch (error) {
//       // User has rejected permissions
//       console.log("permission rejected");
//     }
//   }

//   createNotificationListeners = async () => {
//     this.notificationListener = firebase
//       .notifications()
//       .onNotification(notification => {
//         console.log(notification);

//         // const noti = new firebase.notifications.Notification({
//         //   show_in_foreground: true,
//         // })
//         //   .setNotificationId('notificationId')
//         //   .setTitle('My notification title')
//         //   .setBody('My notification body')
//         //   .setData({
//         //     key1: 'value1',
//         //     key2: 'value2',
//         //   })
//         //   .android.setAutoCancel(true)
//         //   .android.setChannelId('test-channel');

//         // firebase.notifications().displayNotification(noti);
//       });

//     const channel = new firebase.notifications.Android.Channel(
//       "test-channel",
//       "Test Channel",
//       firebase.notifications.Android.Importance.Max
//     ).setDescription("My apps test channel");

//     firebase.notifications().android.createChannel(channel);

//     this.notificationOpenedListener = firebase
//       .notifications()
//       .onNotificationOpened(notificationOpen => {
//         // const { title, body } = notificationOpen.notification;
//         // console.log('onNotificationOpened:');
//         // Alert.alert(title, body);
//         console.log(notificationOpen);
//       });

//     const notificationOpen = await firebase
//       .notifications()
//       .getInitialNotification();

//     if (notificationOpen) {
//       // const { title, body } = notificationOpen.notification;
//       // console.log('getInitialNotification:');
//       // Alert.alert(title, body);
//       console.log(notificationOpen);
//     }

//     this.messageListener = firebase.messaging().onMessage(message => {
//       //process data message
//       console.log("JSON.stringify:", JSON.stringify(message));
//     });

//     this.notificationDisplayedListener = firebase
//       .notifications()
//       .onNotificationDisplayed(notification => {
//         console.log(notification);
//         // Process your notification as required
//         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//       });
//   };

//   render() {
//     return <View style={{}} />;
//   }
// }
