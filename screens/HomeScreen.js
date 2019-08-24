import React, { useState, useRef, useContext, useMemo, memo } from 'react';
import { StatusBar, Animated, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Home from '../components/HomeScreen';
import SearchComponent from '../components/HomeScreen/Nav/SearchComponent/SearchComponent';
import SearchHomeAnimated from '../components/HomeScreen/Nav/SearchComponent/SearchInput/SearchHomeAnimated';
import ActionButtonHome from '../components/HomeScreen/ActionButton';
import { AuthContext } from '../store/context/auth';
import { MessagesContext } from '../components/Messages/Context';
import CheckNoti from '../components/HomeScreen/Context/CheckNoti';
import { ContextNotifi } from '../components/InAppNoti/ContextNotifi';

const HomeScreen = prosp => {
  const [animation] = useState(new Animated.Value(0));
  const { state } = useContext(AuthContext);
  const { showNotification } = useContext(ContextNotifi);
  const { stateMessage, dispatchMessage } = useContext(MessagesContext);
  const { token, profile } = state;
  const { inMessage } = stateMessage;

  const ref = useRef(null);

  const onScroll = ({ nativeEvent }) => {
    animation.setValue(nativeEvent.contentOffset.y);
  };

  const scrollToTop = () => {
    ref.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <Animatable.View animation="fadeInUp" style={{ flex: 1 }} useNativeDriver>
      {useMemo(
        () => (
          <CheckNoti
            profile={profile}
            token={token}
            dispatchMessage={dispatchMessage}
            inMessage={inMessage}
            showNotification={showNotification}
          />
        ),
        [profile, inMessage],
      )}

      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor="transparent"
        animated={true}
      />

      {useMemo(
        () => (
          <SearchHomeAnimated animation={animation} onPress={scrollToTop} />
        ),
        [animation],
      )}

      {useMemo(
        () => (
          <ScrollView
            ref={ref}
            style={{ flex: 1 }}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
          >
            <SearchComponent />
            <Home />
          </ScrollView>
        ),
        [],
      )}

      {useMemo(
        () => (
          <ActionButtonHome />
        ),
        [],
      )}
    </Animatable.View>
  );
};

export default memo(HomeScreen);
