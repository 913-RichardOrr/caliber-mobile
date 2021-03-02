import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import store from './store/store';
import RouterComponent from './router/router.component';
import style from './global_styles';
import TempPartReport from './TempPartReport';

export default function App() {
  return (
      <Provider store={store}>
        <TempPartReport />
      </Provider>
  );
}