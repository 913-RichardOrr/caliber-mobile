import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import LoginComponent from '../user/Login';
import {
  homeStack,
  LogoutStack,
  managementStack,
  reportStack,
} from './MainStackNavigator.component';
import BatchStackNavigator from './BatchStackNavigator.component';
import LogoutComponent from '../user/Logout';
import CategoryService from '../categoriesFeature/CategoryService';
import {
  GetActive,
  GetStale,
} from '../store/categoriesFeature/CategoryActions';
import { useDispatch } from 'react-redux';

enableScreens();

const Drawer = createDrawerNavigator();

const DrawerNavigatorComponent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={homeStack} />
      <Drawer.Screen name='QC Audit' component={BatchStackNavigator} />
      <Drawer.Screen name='Reports' component={reportStack} />
      <Drawer.Screen name='Management' component={managementStack} />
      <Drawer.Screen name='Logout' component={LogoutComponent} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorComponent;
