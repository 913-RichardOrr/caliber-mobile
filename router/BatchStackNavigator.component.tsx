import React from 'react';
import { Image } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import BatchListComponent from '../batches/BatchListComponent';
import QuarterComponent from '../batches/QuarterComponent';
import YearComponent from '../batches/YearComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutComponent from '../user/Logout';
import BatchPageComponent from '../batchPage/BatchPageComponent';

const Stack = createStackNavigator();

export type StackParams = {
  Home: undefined;
  Batches: undefined;
  Quarter: [];
  BatchDetail: undefined;
};

const headerOptions: StackHeaderOptions = {
  headerTitle: () => (
    <Image
      style={{ width: 165, height: 50, margin: 30 }}
      source={require('./rev-logo.png')}
    />
  ),
  headerRight: () => <LogoutComponent />,
  headerLeft: () => <Icon.Button name='ios-menu' size={25}></Icon.Button>,
};

export default function BatchStackNavigator(props: any) {
  return (
    <Stack.Navigator initialRouteName='Year'>
      <Stack.Screen
        name='Year'
        component={YearComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='Quarter'
        component={QuarterComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='Batches'
        component={BatchListComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='BatchDetail'
        component={BatchPageComponent}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}
