import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryService from '../categoriesFeature/CategoryService';
import { CategoryState } from '../store/store';
import ManageCategories from '../categoriesFeature/ManageCategories';
import LoginComponent from '../user/Login';
import { GetActive, GetStale } from '../store/categoriesFeature/CategoryActions';
import { Category } from '../categoriesFeature/Category';

export type StackParam = {
  ManageCategories: Category[];
};

const Stack = createStackNavigator();

export function Router() {
  // get category state from store
  const dispatch = useDispatch();
  console.log('router');

  // useEffect(() => {
  //     async function getCategoryFunc() {
  //         const categories = await CategoryService.getCategories();
  //         console.log(categories);
  //         dispatch(GetActive(categories));
  //     }
  //     getCategoryFunc();
  // }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {/* <Stack.Screen name='Login' component={LoginComponent} /> */}
        {/* <Stack.Screen name='Home' component={} />
          <Stack.Screen name='Manage Batch' component={} />
          <Stack.Screen name='Assess Batch' component={} /> */}
        <Stack.Screen name='Manage Categories' component={ManageCategories}/>
        {/* <Stack.Screen name='Quality Audit' component={} />
          <Stack.Screen name='Reports' component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;