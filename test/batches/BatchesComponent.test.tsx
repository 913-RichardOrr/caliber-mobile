<<<<<<< HEAD
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import axios from 'axios';
import BatchHome from '../../batches/BatchHome';
import YearComponent from '../../batches/YearComponent';
import QuarterComponent from '../../batches/QuarterComponent';
import BatchListComponent from '../../batches/BatchListComponent';
import batchService from '../../batches/BatchService';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

let obj = {
	data: [
		{
			id: 65,
			batchId: 'TR-1131',
			name: 'Mock Batch 65',
			startDate: '2021-04-09',
			endDate: '2021-06-18',
			skill: 'Java React',
			location: 'New York',
			type: 'Revature',
			trainerEmail: 'sample@mock.com',
			trainerFirstName: 'Richard',
			trainerLastName: 'Orr',
		},
		{
			id: 98,
			batchId: 'TR-1196',
			name: 'Mock Batch 98',
			startDate: '2021-11-19',
			endDate: '2022-01-28',
			skill: 'SalesForce',
			location: 'Tampa',
			type: 'ROCP',
			trainerEmail: 'sample@mock.com',
			trainerFirstName: 'Richard',
			trainerLastName: 'Orr',
		},
		{
			id: 67,
			batchId: 'TR-1135',
			name: 'Mock Batch 67',
			startDate: '2021-04-23',
			endDate: '2021-07-02',
			skill: 'Java Devops',
			location: 'West Virginia',
			type: 'Corporate',
			trainerEmail: 'sample@mock.com',
			trainerFirstName: 'Richard',
			trainerLastName: 'Orr',
		},
		{
			id: 71,
			batchId: 'TR-1143',
			name: 'Mock Batch 71',
			startDate: '2021-05-21',
			endDate: '2021-07-30',
			skill: 'SalesForce',
			location: 'New York',
			type: 'ROCP',
			trainerEmail: 'sample@mock.com',
			trainerFirstName: 'Richard',
			trainerLastName: 'Orr',
		},
		{
			id: 72,
			batchId: 'TR-1145',
			name: 'Mock Batch 72',
			startDate: '2021-05-28',
			endDate: '2021-08-06',
			skill: 'PEGA',
			location: 'Tampa',
			type: 'Corporate',
			trainerEmail: 'sample@mock.com',
			trainerFirstName: 'Richard',
			trainerLastName: 'Orr',
		},
	],
};

describe('Batch Service Test', () => {
	/**
	 * @type {string}
	 */
	let trainerEmail: string =
		'mock1027.employee74df14df-5842-4811-a57c-be9836537a40@mock.com';
	/**
	 * @type {string}
	 */
	let gatewayURI: string =
		'https://aosczl5fvf.execute-api.us-west-2.amazonaws.com/default/';

	it('GET Batches from API Gateway', async () => {
		//test goes here

		let returnValues;
=======
import React, { Component } from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import axios from 'axios';
import Enzyme, { shallow } from 'enzyme';

import BatchesComponent from '../../batches/batches.component';
import batchService from '../../batches/BatchService';
import store from '../../store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

describe('BatchesComponent Test(s)', () => {
  let trainerEmail: string =
    'mock1027.employee74df14df-5842-4811-a57c-be9836537a40@mock.com';
  let gatewayURI: string =
    'https://aosczl5fvf.execute-api.us-west-2.amazonaws.com/default/';

  test('GET Batches from API Gateway', async () => {
    //test goes here

    let returnValues;
    let obj = {
      data: [
        {
          id: 65,
          batchId: 'TR-1131',
          name: 'Mock Batch 65',
          startDate: '2021-04-09',
          endDate: '2021-06-18',
          skill: 'Java React',
          location: 'New York',
          type: 'Revature',
        },
        {
          id: 98,
          batchId: 'TR-1196',
          name: 'Mock Batch 98',
          startDate: '2021-11-19',
          endDate: '2022-01-28',
          skill: 'SalesForce',
          location: 'Tampa',
          type: 'ROCP',
        },
        {
          id: 67,
          batchId: 'TR-1135',
          name: 'Mock Batch 67',
          startDate: '2021-04-23',
          endDate: '2021-07-02',
          skill: 'Java Devops',
          location: 'West Virginia',
          type: 'Corporate',
        },
        {
          id: 71,
          batchId: 'TR-1143',
          name: 'Mock Batch 71',
          startDate: '2021-05-21',
          endDate: '2021-07-30',
          skill: 'SalesForce',
          location: 'New York',
          type: 'ROCP',
        },
        {
          id: 72,
          batchId: 'TR-1145',
          name: 'Mock Batch 72',
          startDate: '2021-05-28',
          endDate: '2021-08-06',
          skill: 'PEGA',
          location: 'Tampa',
          type: 'Corporate',
        },
      ],
    };
>>>>>>> batchesNavigationSetup

		axios.get = jest.fn().mockResolvedValue(obj);

		// or you could use the following depending on your use case:
		// axios.get.mockImplementation(() => Promise.resolve(resp))
		// we want to test the api gateway that calls the lambda. the lambda will create multiple axios requests. we are mocking the front end request to the api gateway.

		await batchService
			.getBatchesByTrainerEmail(trainerEmail)
			.then((data: any) => (returnValues = data));
		//we will make one axios request in the front end to the API Gateway
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(returnValues).toBe(obj.data);
		expect(axios.get).toHaveBeenCalledWith(`${gatewayURI}batch2`, {
			params: { trainerEmail: trainerEmail },
		});
	});
});

describe('Batch Component Tests', () => {
	it('BatchHome component did mount', () => {
		const navigation = jest.fn();
		expect(
			shallow(
				<Provider store={store}>
					<NavigationContainer>
						<BatchHome navigation={navigation} />
					</NavigationContainer>
				</Provider>
			)
		).toMatchSnapshot();
	});

	it('YearComponent did mount', () => {
		expect(
			shallow(
				<Provider store={store}>
					<NavigationContainer>
						<YearComponent />
					</NavigationContainer>
				</Provider>
			)
		).toMatchSnapshot();
	});

	it('QuarterComponent did mount', () => {
		expect(
			shallow(
				<Provider store={store}>
					<NavigationContainer>
						<QuarterComponent />
					</NavigationContainer>
				</Provider>
			)
		).toMatchSnapshot();
	});

	it('BatchListComponent did mount', () => {
		expect(
			shallow(
				<Provider store={store}>
					<NavigationContainer>
						<BatchListComponent />
					</NavigationContainer>
				</Provider>
			)
		).toMatchSnapshot();
	});

<<<<<<< HEAD
	it('BatchListComponent renders with route params', () => {
		expect(
			shallow(
				<Provider store={store}>
					<NavigationContainer>
						<BatchListComponent
							route={{ params: { year: 2021, quarter: 'All Quarters' } }}
						/>
					</NavigationContainer>
				</Provider>
			)
		).toMatchSnapshot();
	});
=======
  test('the component did mount', () => {
    expect(
      shallow(
        <Provider store={store}>
          <NavigationContainer>
            <BatchesComponent />
          </NavigationContainer>
        </Provider>
      )
    ).toMatchSnapshot();
  });
>>>>>>> batchesNavigationSetup
});
