import React from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import {
  HomeStack,
  LogoutStack,
  ManagementStack,
  QCAuditStack,
  ReportStack,
} from './MainStackNavigator.component';
import { ReducerState } from '../store/store';

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
  const user = useSelector((state: ReducerState) => state.userReducer.user);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeStack} />
      <Drawer.Screen name='QC Audit' component={QCAuditStack} />
      <Drawer.Screen name='Reports' component={ReportStack} />
      {!user.role.ROLE_QC && (
        <Drawer.Screen name='Management' component={ManagementStack} />
      )}
      <Drawer.Screen name='Logout' component={LogoutStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigatorComponent;
