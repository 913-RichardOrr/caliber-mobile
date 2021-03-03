import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/Login';
import { enableScreens } from 'react-native-screens';
import ForgotPassword from '../user/ForgotPassword';
import UnderDevelopmentComponent from '../UnderDevelopmentComponent';
import ManageCategories from '../categoriesFeature/ManageCategories';
import LogoutComponent from '../user/Logout';
import CategoryService from '../categoriesFeature/CategoryService';
import { useDispatch } from 'react-redux';
import Home from '../user/Home';
import {
  GetActive,
  GetStale,
} from '../store/categoriesFeature/CategoryActions';
import style from  '../global_styles'

enableScreens();

const Stack = createStackNavigator();

export interface MenuProp {
  navigation: any;
}
/**
 * Shows only the Revature logo for the header
 */
export const loginHeaderOptions = {
  headerTitle: () => (
    <Image
      style={style.logoLogin}
      source={require('./rev-logo.png')}
    />
  ),
};

/**
 * Shows the Revature logo and the DrawerNavigator button
 * in the header
 * @param navigation - navigation prop to open the drawer
 */
export function generalHeaderOptions(navigation: any) {
  return {
    headerTitle: () => (
      <Image
        style={style.logo}
        source={require('./rev-logo.png')}
      />
    ),
    headerLeft: () => (
      <Icon.Button
        name='ios-menu'
        size={25}
        color='#72A4C2'
        backgroundColor='#fff'
        onPress={() => navigation.openDrawer()}></Icon.Button>
    ),
  };
}

/**
 * Login Stack Screens:
 * Login - just a login screen with the login header
 * Home - has a temporary home component which is just the
 *        under development. TODO: add a better home screen.
 * Forgot Password - allows the user to reset their password.
 */
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginComponent}
        options={loginHeaderOptions}
      />

      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={loginHeaderOptions}
      />
    </Stack.Navigator>
  );
};

const HomeStack = ({ navigation }: MenuProp) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={generalHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

/**
 * TODO: get the report stack added
 * @param navigation - navigation prop to open the drawer
 */
const ReportStack = ({ navigation }: MenuProp) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Reports'
        component={UnderDevelopmentComponent}
        options={generalHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

/**
 * ManagementStack displays the management tools for the VP users.
 * They can see the active and inactive categories, add categories, change
 * status of a category.
 * @param navigation - navigation prop to open the drawer
 */
const ManagementStack = ({ navigation }: MenuProp) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategoryFunc() {
      const active = await CategoryService.getCategories(true);
      const stale = await CategoryService.getCategories(false);
      dispatch(GetActive(active));
      dispatch(GetStale(stale));
    }
    getCategoryFunc();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Management'
        component={ManageCategories}
        options={generalHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

/**
 * LogoutStack shows the logout screen with a button that
 * allows them to logout
 * @param navigation - navigation prop to open the drawer
 */
const LogoutStack = ({ navigation }: MenuProp) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Logout'
        component={LogoutComponent}
        options={generalHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

export {
  LoginStackNavigator,
  HomeStack,
  ReportStack,
  ManagementStack,
  LogoutStack,
};
