import React from 'react';
import { Image } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import YearComponent from '../batches/YearComponent';
import QuarterComponent from '../batches/QuarterComponent';
import BatchListComponent from '../batches/BatchListComponent';
import BatchDetailComponent from '../batches/BatchDetailComponent';
import LoginComponent from '../user/Login';
import Test from '../user/Test';
import LogoutComponent from '../user/Logout';

export type StackParams = {
    Login: undefined;
    Test: undefined;
    Home: undefined;
    Batches: undefined;
    Quarter: [];
    BatchDetail: undefined;
};

const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Image style={{width:165, height:50, margin:30}}source={require('./rev-logo.png')} />,
    headerRight: () => <LogoutComponent/>,
};

const Stack = createStackNavigator();

export default function RouterComponent(props: any) {
    return (
        <Stack.Navigator initialRouteName='Caliber'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Test'
                component={Test}
                options={headerOptions}
            />
            <Stack.Screen
                name='Year'
                component={YearComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Quarter'
                component={QuarterComponent}
            />
            <Stack.Screen
                name='Batches'
                component={BatchListComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='BatchDetail'
                component={BatchDetailComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Logout'
                component={LogoutComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
    )
}