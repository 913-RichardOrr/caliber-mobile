import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BatchListComponent from '../batches/BatchListComponent';
import QuarterComponent from '../batches/QuarterComponent';
import YearComponent from '../batches/YearComponent';
import BatchPageComponent from '../batchPage/BatchPageComponent';

const Stack = createStackNavigator();

export type StackParams = {
  Home: undefined;
  Batches: undefined;
  Quarter: [];
  BatchDetail: undefined;
};

export default function BatchStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Year'>
      <Stack.Screen name='Year' component={YearComponent} />
      <Stack.Screen name='Quarter' component={QuarterComponent} />
      <Stack.Screen name='Batches' component={BatchListComponent} />
      <Stack.Screen name='BatchDetail' component={BatchPageComponent} />
    </Stack.Navigator>
  );
}
