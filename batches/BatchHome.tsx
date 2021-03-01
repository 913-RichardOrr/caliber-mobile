import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import style from '../global_styles';

interface Nav {
	navigation: any;
}

function BatchHome({ navigation }: Nav) {
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
				onPress={navigation.navigate('Year')}
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
