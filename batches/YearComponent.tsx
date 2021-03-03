import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { ReducerState } from '../store/store';
import { getBatches } from '../store/actions';
import batchService from './BatchService';
import { style } from '../global_styles';

/**
 * Renders Year list
 */
export default function YearComponent() {
	const nav = useNavigation();
	const dispatch = useDispatch();
	const user = useSelector((state: ReducerState) => state.userReducer.user);
	const keyExtractor = (item: object, index: number) => {
		return index.toString();
	};

	const [validYears, setValidYears] = useState<[]>([]);

	useEffect(() => {
		if (user.role.ROLE_QC == true || user.role.ROLE_VP) {
			batchService.getValidYears(user.token).then((yearResp) => {
				setValidYears(yearResp);
			});
		} else {
			batchService
				.getBatchesByTrainerEmail(user.token,
					/*user.email*/ 'mock1005.employee7c90a542-e70e-4db5-be8b-629e62f851c5@mock.com'
				)
				.then((batchesResp) => {
					dispatch(getBatches(batchesResp.batches));
					setValidYears(batchesResp.validYears);
				});
		}
	}, []);

	/**
	 * Sets the year and navigates to the quarter selector
	 * @param {number} year
	 */
	function handleYearSelect(year: number) {
		nav.navigate('Quarter', { year: year });
	}

	/**
	 * Displays a selectable year
	 * @param {*} params
	 * @returns {JSX}
	 */
	const yearCard = (params: any) => {
		return (
			<Pressable onPress={() => handleYearSelect(params.item)}>
				<Card>
					<Text>{params.item}</Text>
				</Card>
			</Pressable>
		);
	};
    
	// Displays a list of years to filter by
	return (
		<View>
			<View style={{height: 40, flexDirection: 'row', margin: 5}}>
				<Button
					color="#F26925" 
					title='Back' 
					onPress={()=>nav.goBack()}/>
			</View>
			<Text style={{ margin: 10 }}>Select Year:</Text>
			{validYears.length > 0 ? (
				<FlatList
					data={validYears}
					renderItem={yearCard}
					keyExtractor={keyExtractor}
				/>
			) : (
				<ActivityIndicator style={style.loading} />
			)}
		</View>
	);
}
