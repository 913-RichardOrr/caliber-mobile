/**
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import ManageCategories from '../../categoriesFeature/ManageCategories';

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
        mockedFilter
    }
})

const mockedAlphabet = jest.fn();

jest.mock('react-native-section-alphabet-list', () => {
    return {
        mockedAlphabet
    }
})

describe('ManageCategories component', () => {
    let wrapper: any;
    beforeAll(() => {
        wrapper = Enzyme.mount(
            <ManageCategories></ManageCategories>
        )
    });

    test('that it has an Add Assessment Category button that calls openModal()', () => {
        const openModal = jest.fn();
        const button = wrapper.findWhere((node: any) => node.prop('testID') === 'openModalButton');
        button.simulate('click');
        expect(openModal).toBeCalled();;
    });

    test('that it tabs for active table and it takes in active status prop', () => {
        const activeTab = wrapper.findWhere((node: any) => node.prop('testID') === 'activeTab');
        const isActive = 'active';
        activeTab.simulate('click');
        expect(mockedNav).toHaveBeenCalledTimes(1);
        expect(mockedNav).toHaveBeenCalledWith('CategoryTable', isActive);
    });

    test('that it tabs for inactive table and it takes in inactive status prop', () => {
        const inactiveTab = wrapper.findWhere((node: any) => node.prop('testID') === 'inactiveTab');
        const isActive = 'inactive';
        inactiveTab.simulate('click');
        expect(mockedNav).toHaveBeenCalledTimes(1);
        expect(mockedNav).toHaveBeenCalledWith('CategoryTable', isActive);
    });
});
