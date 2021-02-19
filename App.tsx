import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import store from './store/store';
import Router from './router/router';

import RouterComponent from './router/router.component';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RouterComponent />
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
