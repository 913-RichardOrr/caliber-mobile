import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import RouterComponent from './router/router.component';
import AuthWrapper from './user/AuthWrapper';

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <RouterComponent />
        </NavigationContainer>     
    </Provider>
  );
}
