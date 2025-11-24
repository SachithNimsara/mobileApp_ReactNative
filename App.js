import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar style="auto" />
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
