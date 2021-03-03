import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BatchListComponent from '../batches/BatchListComponent';
import QuarterComponent from '../batches/QuarterComponent';
import YearComponent from '../batches/YearComponent';
import BatchPageComponent from '../batchPage/BatchPageComponent';
import { generalHeaderOptions, MenuProp } from './MainStackNavigator.component';

const Stack = createStackNavigator();

export type StackParams = {
  Home: undefined;
  Batches: undefined;
  Quarter: [];
  BatchDetail: undefined;
};

/**
 * This has the StackNavigator for the batches component. The screens are:
 * valid years -> quarters -> batches -> associates from chosen batch
 *
 * @param navigation - the navigation prop to allow the drawer button in the header
 * to open the DrawerNavigator
 */
export default function BatchStackNavigator({ navigation }: MenuProp) {
  return (
    <Stack.Navigator initialRouteName='Year'>
      <Stack.Screen
        name='Year'
        component={YearComponent}
        options={generalHeaderOptions(navigation)}
      />
      <Stack.Screen
        name='Quarter'
        component={QuarterComponent}
        options={generalHeaderOptions(navigation)}
      />
      <Stack.Screen
        name='Batches'
        component={BatchListComponent}
        options={generalHeaderOptions(navigation)}
      />
      <Stack.Screen
        name='BatchDetail'
        component={BatchPageComponent}
        options={generalHeaderOptions(navigation)}
      />
    </Stack.Navigator>
  );
}
