import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import { style } from '../global_styles';
import { changeBatch } from '../store/actions';
import { ReducerState } from '../store/store';

/**
 * @typedef {Object} Props
 * @property {*} navigation
 * @property {*} route
 */
interface Props {
	navigation: any;
	route: any;
}

/**
 * @typedef {Object} VisibleBatch
 * @property {number} index
 * @property {string} info
 */
interface VisibleBatch {
  index: number;
  info: string;
}

/**
 * Renders the Batch List for the user
 * @param {*} param0
 * @returns {JSX}
 */
export default function BatchListComponent({ navigation, route }: Props) {
	const dispatch = useDispatch();
	const user = useSelector((state: ReducerState) => state.userReducer.user);
	const batches = useSelector((state: ReducerState) => state.batchReducer.batches);
	const [visibleBatches, setVisible] = useState<VisibleBatch[]>([]);
	const [reset, setReset] = useState(false);
	const [query, setQuery] = useState('');
	const keyExtractor = (item: object, index: number) => {
		return index.toString();
	};

	const year = route.params.year;
	const quarter = route.params.quarter;

	// Filters based on the year and quarter, then displays different data based on the user's role(s)
	useEffect(() => {
		const batchesInQuarter = batches.filter((batch) => {
			if (
				year == checkYear(batch.startDate) &&
				(quarter == 'All Quarters' || quarter == checkQuarter(batch.startDate))
			) {
				return batch;
			}
		});

		const visible = batchesInQuarter.map((batch, index) => {
			return {
				index,
				info:
					user.role.ROLE_QC === true || user.role.ROLE_VP === true
						? `${batch.trainerFirstName + ' ' + batch.trainerLastName}\n${
								batch.skill
						  }\n${batch.startDate}`
						: `${batch.skill}\n${batch.startDate}`,
			};
		});
		setVisible(visible);
		setReset(false);
	}, [batches, reset === true]);

	// Upon selection, updates the state with a chosen batch
	// The navigator's destination is to be replaced in code after determining the next component in line
	/**
	 * Selects batch and navigates to BatchDetail screen
	 * @param {string} index
	 */
	function handleBatchSelect(index: string) {
		dispatch(changeBatch(batches[Number(index)]));
		navigation.navigate('BatchDetail');
	}

	/**
	 * Transforms startDate into 4-digit year
	 * @param {string} date
	 */
	function checkYear(date: string) {
		return Number(date.slice(0, 4));
	}

	/**
	 * Checks a provided date to see which quarter it's in and returns a string representing the quarter
	 * @param {string} date
	 */
	function checkQuarter(date: string) {
		const month: number = Number(date.slice(5, 7));
		switch (month) {
			case 1:
			case 2:
			case 3:
				return 'Q1';
			case 4:
			case 5:
			case 6:
				return 'Q2';
			case 7:
			case 8:
			case 9:
				return 'Q3';
			case 10:
			case 11:
			case 12:
				return 'Q4';
		}
	}

	/**
	 * Display a selectable batch
	 * @param {*} params
	 * @returns {JSX}
	 */        
	const batchCard = (params: any) => {
		return (
			<Pressable onPress={() => handleBatchSelect(params.item.index)}>
				<Card>
					<Text>{params.item.info}</Text>
				</Card>
			</Pressable>
		);
	};

	/**
	 * Filter batch cards based on new text input; sets query and visible states;
	 * @param {string} text
	 */
	const handleSearch = (text: string) => {
		let visible: VisibleBatch[] = [];
		if (query.length > text.length) {
			visible = batches.map((batch, index) => {
				return {
					index,
					info:
						user.role.ROLE_QC === true || user.role.ROLE_VP === true
							? `${batch.name} ${batch.skill} ${batch.startDate} - ${
									batch.trainerFirstName + ' ' + batch.trainerLastName
							  }`
							: `${batch.name} ${batch.skill} ${batch.startDate}`,
				};
			});

			visible = visible.filter((batch) =>
				batch.info.toLowerCase().includes(text.toLowerCase())
			);
		} else {
			visible = visibleBatches.filter((batch) =>
				batch.info.toLowerCase().includes(text.toLowerCase())
			);
		}
		setQuery(text);
		setVisible(visible);
	};

	// Displays a list of batches based on filters
	return (
		<View>
			<View style={{height: 40, flexDirection: 'row', margin: 5}}>
				<Button
					color="#F26925" 
					title='Back' 
					onPress={()=>navigation.goBack()}/>
				<Text style={style.subheading}>
					{year + ' > ' + route.params.quarter}
				</Text>
			</View>
			<View style={style.searchContainer}>
				<TextInput
					style={style.searchInput}
					value={query}
					onChangeText={(text) => {
						handleSearch(text);
					}}
				/>
				<Button
					color="#F26925"
					title="Clear"
					onPress={() => {
						setQuery('');
						setReset(true);
					}}
				/>
			</View>
			<Text style={{ margin: 10 }}>Select Batch:</Text>
			{visibleBatches.length > 0 ? (
				<FlatList
					data={visibleBatches}
					renderItem={batchCard}
					keyExtractor={keyExtractor}
				/>
			) : <Text>No batches for the selected quarter</Text>}
		</View>
	);
}
