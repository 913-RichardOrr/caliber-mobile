import React from 'react';
import { View, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import style from '../global_styles';

/**
 * @typedef {Object} Nav
 * @property {*} navigation
 */
interface Nav {
	navigation: any;
}

/**
 * Renders Home screen
 * @param {Nav} navigation -navigation props
 * @returns {JSX}
 */
function BatchHome({ navigation }: Nav) {
	function toYearComponent() {
		navigation.dispatch(
			CommonActions.reset({
			  index: 1,
			  routes: [
				{ name: 'Year' }
			  ],
			})
		  );
		navigation.navigate('QC Audit');
	}

	//will setup to check user role in state to use the proper service in useEffect
	return (
		<View style={style.container}>
			<Text
				style={[
					style.caliber,
					{ textAlign: 'center', justifyContent: 'center' },
				]}
			>
				Welcome to Caliber Mobile
			</Text>
			<TouchableHighlight
				onPress={toYearComponent}
				style={{
					backgroundColor: '#F26925',
					height: 45,
					width: 200,
					borderRadius: 40,
					alignItems: 'center',
					marginBottom: 40,
				}}
			>
				<Text
					style={{
						alignItems: 'center',
						padding: 8,
						color: '#fff',
						fontSize: 18,
						fontWeight: 'bold',
					}}
				>
					SELECT BATCH {'>'}
				</Text>
			</TouchableHighlight>
		</View>
	);
}

export default BatchHome;
