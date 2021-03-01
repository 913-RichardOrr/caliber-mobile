import React from 'react';
import { Image } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import BatchesComponent from '../batches/batches.component';
import LoginComponent from '../user/Login';
import BatchPageComponent from '../batchPage/BatchPageComponent';
import LogoutComponent from '../user/Logout';
import Test from '../user/Test';

export type StackParams = {
	Login: undefined;
	Test: undefined;
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
};

const Stack = createStackNavigator();

export default function RouterComponent(props: any) {
    return (
        <Stack.Navigator initialRouteName='BatchPageComponent'>
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
                name='Batches'
                component={BatchesComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='BatchPageComponent'
                component={BatchPageComponent}
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
