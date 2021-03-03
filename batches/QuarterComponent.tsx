import React, { useEffect } from 'react';
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
 * Renders Quarter list
 * @param {*} param0
 * @returns {JSX}
 */
export default function QuarterComponent({ route }: any) {
	const nav = useNavigation();
	const dispatch = useDispatch();
	const user = useSelector((state: ReducerState) => state.userReducer.user);
	const batches = useSelector((state: ReducerState) => state.batchReducer.batches);
	const keyExtractor = (item: object, index: number) => {
		return index.toString();
	};

	const year: number = route.params.year;

	const quarters: any = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];

	useEffect(() => {
		if (user.role.ROLE_QC == true || user.role.ROLE_VP == true) {
			batchService.getAllBatches(user.token, year).then((batchesResp) => {
				dispatch(getBatches(batchesResp));
			});
		}
	}, [year]);

	/**
	 * Sets the quarter and navigates to the batch list
	 * @param {number} index
	 */
	function handleQuarterSelect(index: number) {
		const quarter = quarters[index];
		nav.navigate('Batches', { year: year, quarter: quarter });
	}

	/**
	 * Displays a selectable quarter
	 * @param {*} params
	 * @returns {JSX}
	 */
	const quarterCard = (params: any) => {
		return (
			<Pressable onPress={() => handleQuarterSelect(params.index)}>
				<Card>
					<Text>{params.item}</Text>
				</Card>
			</Pressable>
		);
	};

	// Displays a list of quarters to filter by
	return (
		<View>
			<View style={{height: 40, flexDirection: 'row', margin: 5}}>
				<Button
					color="#F26925" 
					title='Back' 
					onPress={()=>nav.goBack()}/>
				<Text style={style.subheading}>
					{year}
				</Text>
			</View>
			<Text style={{ margin: 10 }}>Select Quarter:</Text>
			{batches.length > 0 ? (
				<FlatList
					data={quarters}
					renderItem={quarterCard}
					keyExtractor={keyExtractor}
				/>
			) : (
				<ActivityIndicator style={style.loading} />
			)}
		</View>
	);
}
