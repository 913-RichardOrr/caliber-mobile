import React from 'react';
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

enableScreens();

const Stack = createStackNavigator();

interface MenuProp {
  navigation: any;
}

const loginOptions = {
  headerTitle: () => (
    <Image
      style={{ width: 165, height: 50, margin: 30 }}
      source={require('./rev-logo.png')}
    />
  ),
};

function generalHeaderOptions(navigation: any) {
  return {
    headerTitle: () => (
      <Image
        style={{ width: 165, height: 50, margin: 30 }}
        source={require('./rev-logo.png')}
      />
    ),
    headerRight: () => (
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
        options={loginOptions}
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
