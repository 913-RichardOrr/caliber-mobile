import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import LoginComponent from '../user/Login';
import {
  LoginStackNavigator,
  LogoutStack,
  ManagementStack,
  ReportStack,
} from './MainStackNavigator.component';
import BatchStackNavigator from './BatchStackNavigator.component';

enableScreens();

const Drawer = createDrawerNavigator();

/**
 * This has the DrawerNavigator screen. The available options are
 * Home - goes to a Under Development Screen
 * QC Audit - goes to the BatchesStackNavigator
 * Reports - goes to underdevelopment at the moment. Has a Report Stack
 *           available for us to use once this functionality is complete
 *           TODO: Reports component
 * Management - goes to the Manage Categories/Skills where the VP users can
 *              add skills and make active or inactive
 * Logout - sends the user to a screen to ensure that the user meant to log out
 */
function DrawerNavigatorComponent() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={LoginStackNavigator} />
      <Drawer.Screen name='QC Audit' component={BatchStackNavigator} />
      <Drawer.Screen name='Reports' component={ReportStack} />
      <Drawer.Screen name='Management' component={ManagementStack} />
      <Drawer.Screen name='Logout' component={LogoutStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigatorComponent;
