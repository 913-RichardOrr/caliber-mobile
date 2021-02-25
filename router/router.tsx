import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ManageCategories from '../categories/manageCategories'
import LoginComponent from '../user/Login';
  
export type StackParam = {
  ManageCategories: undefined;
};

const Stack = createStackNavigator();

export function Router() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginComponent} />
    {/*       <Stack.Screen name='Home' component={} />
          <Stack.Screen name='Manage Batch' component={} />
          <Stack.Screen name='Assess Batch' component={} />
          <Stack.Screen name='Manage Categories' component={ManageCategories} />
          <Stack.Screen name='Quality Audit' component={} />
          <Stack.Screen name='Reports' component={} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default Router;