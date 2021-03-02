import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/Login';
import { enableScreens } from 'react-native-screens';
import Home from '../user/Home';
import ForgotPassword from '../user/ForgotPassword';
import UnderDevelopmentComponent from '../UnderDevelopmentComponent';
import ManageCategories from '../categoriesFeature/ManageCategories';
import LogoutComponent from '../user/Logout';
import { useDispatch, useSelector } from 'react-redux';
import CategoryService from '../categoriesFeature/CategoryService';
import { GetActive, GetStale } from '../store/categoriesFeature/CategoryActions';
import { ReducerState } from '../store/store';

enableScreens();

const Stack = createStackNavigator();

interface MenuProp {
  navigation: any;
}

export const loginHeaderOptions = {
  headerTitle: () => (
    <Image
      style={{ width: 165, height: 50, margin: 30 }}
      source={require('./rev-logo.png')}
    />
  ),
};

export function generalHeaderOptions(navigation: any) {
  return {
    headerTitle: () => (
      <Image
        style={{ width: 165, height: 50, margin: 30 }}
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

const loginStackNavigator = ({ navigation }: MenuProp) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginComponent}
        options={loginHeaderOptions}
      />

      <Stack.Screen
        name='Home'
        component={Home}
        options={generalHeaderOptions(navigation)}
      />

      <Stack.Screen
        name="'ForgotPassword'"
        component={ForgotPassword}
        options={generalHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
};

const reportStack = ({ navigation }: MenuProp) => {
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

const managementStack = ({ navigation }: MenuProp) => {
  const dispatch = useDispatch();
  // authorizer state
  const currentUser = useSelector((state: ReducerState) => state.userReducer.user);
  const token = currentUser.token;
  const [rend, setRend] = useState(false);
  // get manage category table data
  useEffect(() => {
    async function getCategoryFunc() {
        const active = await CategoryService.getCategories(token, true);
        const stale = await CategoryService.getCategories(token, false);
        dispatch(GetActive(active));
        dispatch(GetStale(stale));
    }
    setRend(true);
    getCategoryFunc();
}, [])


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

export { loginStackNavigator, reportStack, managementStack, LogoutStack };
