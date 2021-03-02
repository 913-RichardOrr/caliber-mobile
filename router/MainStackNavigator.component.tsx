import React, { useEffect }  from 'react';
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
import CategoryService from '../categoriesFeature/CategoryService';
import { useDispatch } from 'react-redux';
import {
  GetActive,
  GetStale,
} from '../store/categoriesFeature/CategoryActions';
import BatchListComponent from '../batches/BatchListComponent';
import QuarterComponent from '../batches/QuarterComponent';
import YearComponent from '../batches/YearComponent';
import BatchPageComponent from '../batchPage/BatchPageComponent';

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

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginComponent}
        options={loginHeaderOptions}
      />

      <Stack.Screen
        name="'ForgotPassword'"
        component={ForgotPassword}
        options={loginHeaderOptions}
      />
    </Stack.Navigator>
  );
};



const homeStack = ({ navigation }: MenuProp) => {
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

const BatchStack = ({ navigation }: MenuProp) => {
  return (
    <Stack.Navigator initialRouteName='Year'>
      <Stack.Screen
        name='Year'
        component={YearComponent}
        options={generalHeaderOptions}
      />
      <Stack.Screen
        name='Quarter'
        component={QuarterComponent}
        options={generalHeaderOptions}
      />
      <Stack.Screen
        name='Batches'
        component={BatchListComponent}
        options={generalHeaderOptions}
      />
      <Stack.Screen
        name='BatchDetail'
        component={BatchPageComponent}
        options={generalHeaderOptions}
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

export {
  LoginStackNavigator,
  reportStack,
  BatchStack,
  managementStack,
  LogoutStack,
};
