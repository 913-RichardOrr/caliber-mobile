import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import LoginComponent from '../user/Login';
import {
  loginStackNavigator,
  LogoutStack,
  managementStack,
  reportStack,
} from './MainStackNavigator.component';
import BatchStackNavigator from './BatchStackNavigator.component';

enableScreens();

const Drawer = createDrawerNavigator();

const DrawerNavigatorComponent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={loginStackNavigator} />
      <Drawer.Screen name='QC Audit' component={BatchStackNavigator} />
      <Drawer.Screen name='Reports' component={reportStack} />
      <Drawer.Screen name='Management' component={managementStack} />
      <Drawer.Screen name='Logout' component={LogoutStack} />
      <Drawer.Screen name='---' component={LoginComponent} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorComponent;
