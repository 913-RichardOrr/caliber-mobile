/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { useDispatch } from 'react-redux';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';

import WeekSelectionComponent from '../../batchWeek/WeekSelectionComponent';
import BatchWeekService from '../../batchWeek/batchWeekService';

describe('Batch Week Selection tests', ()=> {
    let wrapper: any;
    beforeAll(()=> {
        jest.mock('react-redux');
        wrapper = mount(<WeekSelectionComponent/>);
    })

    test('that the year picker callback updates the state', () => {
        // Find picker in component
        const yearPicker = wrapper.findWhere((node: any) => node.prop('testID') === 'yearPicker').first();
        expect(yearPicker).toExist();

        // Trigger picker change callback
        yearPicker.simulate('valueChange', {target: {value: 2001, index: 0}});
        expect(wrapper.state('year')).toEqual(2001);
    });

    test('that the quarter picker callback updates the state', () => {
        // Find picker in component
        const quarterPicker = wrapper.findWhere((node: any) => node.prop('testID') === 'quarterPicker').first();
        expect(quarterPicker).toExist();

        // Trigger picker change callback
        quarterPicker.simulate('valueChange', {target: {value: 'Q2', index: 1}});
        expect(wrapper.state('quarter')).toEqual(2);
    });

    test('that the batch picker callback updates the redux store', () => {
        // Find picker in component
        const batchPicker = wrapper.findWhere((node: any) => node.prop('testID') === 'batchPicker').first();
        expect(batchPicker).toExist();

        // Trigger picker change callback
        batchPicker.simulate('valueChange', {target: {value: 'BatchName', index: 0}});
        expect(useDispatch).toBeCalledTimes(1);
    });

    test('that the week select callback updates the redux store with the batch-week info', () => {
        // Mock the service function
        BatchWeekService.getBatchWeekNote = jest.fn();

        // Find week tab(button?) in component
        const weekSelect1 = wrapper.findWhere((node: any) => node.prop('testID') === 'weekSelect1').first();
        expect(weekSelect1).toExist();

        // Trigger onPress callback
        weekSelect1.simulate('press');
        expect(BatchWeekService.getBatchWeekNote).toBeCalledTimes(1);
        expect(useDispatch).toBeCalledTimes(1);
    });

    test('that the refresh button callback updates the redux store with the batch-week info', () => {
        // Mock the service function
        BatchWeekService.getBatchWeekNote = jest.fn();

        // Find refresh button in component
        const refresh = wrapper.findWhere((node: any) => node.prop('testID') === 'refresh').first();
        expect(refresh).toExist();

        // Trigger onPress callback
        refresh.simulate('press');
        expect(BatchWeekService.getBatchWeekNote).toBeCalledTimes(1);
        expect(useDispatch).toBeCalledTimes(1);
    });
});