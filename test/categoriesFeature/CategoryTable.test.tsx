/**
 * @jest-environment jsdom
 */
import Enzyme, {mount, shallow} from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CategoryTable from '../../categoriesFeature/CategoryTable';

const mockedNav = jest.fn();
jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: ()=> ({navigate: mockedNav})
    }
});
const mockedTabs = jest.fn();
jest.mock('@react-navigation/material-top-tabs', () => {
    return {
        useNavigation: () => ({navigate: mockedTabs})
    }
});
const mockedSearch = jest.fn();
jest.mock('react-native-elements', () => {
    return {
        mockedSearch
    }
})
const mockedFilter = jest.fn();
jest.mock('react-native-search-filter', () => {
    return {
        createFilter: () => mockedFilter
    }
})
const mockedAlphabet = jest.fn();
jest.mock('react-native-section-alphabet-list', () => {
    return {
        mockedAlphabet
    }
})


describe('CategoryTable component', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = Enzyme.mount(
            <Provider store={store}><CategoryTable status={true}></CategoryTable></Provider>
        )
    });

    test('that it has toggle instructions', () => {
        const toggle = wrapper.findWhere((node: any) => node.prop('testID') === 'Toggle');
        expect(toggle.length).toBe(1);
    });
})