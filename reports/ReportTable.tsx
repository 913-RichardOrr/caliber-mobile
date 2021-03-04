import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { Table, Row, Rows } from '@deb-95/react-native-table-component';
import { useSelector } from 'react-redux';
import { ReducerState } from '../store/store';
import AssociateService, { Associate } from '../associate/AssociateService';
import batchWeekService from '../batchWeek/batchWeekService';
import BatchPageService from '../batchPage/BatchPageService';
import TechnicalStatus from '../associate/TechnicalStatus';
import style from '../global_styles';

interface Props {
	navigation: any;
}

export function ReportsTable({ navigation }: Props) {
	let batch = useSelector((state: ReducerState) => state.batchReducer.batch);
	const curentUser = useSelector(
		(state: ReducerState) => state.userReducer.user
	);
	const token = curentUser.token;

	const [associateWeekFeedback, setAssociateWeekFeedback]: any = useState([]);
	const [weeksHeader, setWeeksHeader] = useState(['Associate']);

	useEffect(() => {
		if (associateWeekFeedback.length === 0) {
			asyncThis();
		}
		async function asyncThis() {
			let mockResult;
			mockResult = await getAssociateFromMock();
			getQCNotes(mockResult);
		}
	}, []);

	/**
	 * Queries the mock API to retrieve all the associates for a given batch.
	 */
	async function getAssociateFromMock() {
		let newAssociateArray: Associate[] = [];
		let serviceResult;
		serviceResult = await BatchPageService.getAssociates(batch.batchId, token);
		serviceResult.forEach((asoc: any) => {
			let associate = new Associate();
			associate.firstName = asoc.firstName;
			associate.lastName = asoc.lastName;
			associate.associateId = asoc.email;
			newAssociateArray.push(associate);
		});

		return newAssociateArray;
	}

	/**
	 * Retrieves QC Notes from back end.
	 * Return an array of technical statuses for each [associate][week]
	 */
	async function getQCNotes(results: Associate[]) {
		let weeks = await batchWeekService.getBatchWeekNotes(token, batch.batchId);
		let nweeks = weeks.length;
		// let nweeks = 2;

		//make header array of
		for (let i = 0; i < nweeks; i++) {
			let temp = weeksHeader;
			temp.push(`Week ${i + 1}`);
			setWeeksHeader([...temp]);
		}

		results.forEach(async (associate: Associate, index: number) => {
			let feedback = [];
			feedback.push(`${associate.firstName} ${associate.lastName}`);
			for (let i = 1; i <= nweeks; i++) {
				let qcFeedback = await AssociateService.getAssociate(
					associate,
					batch.batchId,
					String(i),
					token
				);

				feedback[i] = <TechnicalStatus status={qcFeedback.technicalstatus} />;
			}
			let temp = associateWeekFeedback;
			temp.push(feedback);

			setAssociateWeekFeedback([...temp]);
		});
	}
	console.log('batch', batch);

	return (
		<>
			<View style={{ height: 40, flexDirection: 'row', margin: 5 }}>
				<Button
					color="#F26925"
					title="Back"
					onPress={() => navigation.goBack()}
				/>
				<Text style={style.subheading}>{`${batch.name} - ${batch.skill}`}</Text>
			</View>
			<ScrollView horizontal={true}>
				<View style={style.associatesViewComponent}>
					<Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
						<Row
							data={weeksHeader}
							widthArr={[140, 60, 60]}
							flexArr={[1, 1, 1]}
							style={{
								height: 40,
								width: '100%',
								backgroundColor: '#f1f8ff',
							}}
							textStyle={{ margin: 6 }}
						/>
						<Rows
							data={associateWeekFeedback}
							widthArr={[140, 60, 60]}
							flexArr={[1, 1, 1]}
							heightArr={[]}
							style={{}}
							textStyle={{ margin: 6 }}
						/>
					</Table>
				</View>
			</ScrollView>
		</>
	);
}
